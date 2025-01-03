import { SOCIALS } from "@/lib/constants";
import CountUp from "../animation/count-up";

type APIResponse =
	| { data: Data; errors?: never }
	| { data?: never; errors: Error[] };

interface Data {
	user: User;
}

interface User {
	contributionsCollection: ContributionsCollection;
	email: string;
	status: Status;
}

interface ContributionsCollection {
	contributionCalendar: ContributionCalendar;
}

interface ContributionCalendar {
	totalContributions: number;
	weeks: Week[];
}

interface Week {
	contributionDays: ContributionDay[];
}

interface ContributionDay {
	contributionCount: number;
	date: string;
}

interface Status {
	emoji: string;
	message: string;
}

const Contributions = async () => {
	const firstDayThisYear = new Date(
		new Date().getFullYear(),
		0,
		1
	).toISOString();
	const lastDayThisYear = new Date(
		new Date().getFullYear(),
		11,
		31
	).toISOString();

	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			cache: "force-cache",
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `query ($userName: String!, $from: DateTime!, $to: DateTime!) {
					user(login: $userName) {
						contributionsCollection(to: $to, from: $from) {
							contributionCalendar {
								totalContributions
								weeks {
									contributionDays {
										contributionCount
										date
									}
								}
							}
						}
						email
						status {
							emoji
							message
						}
					}
				}`,
				variables: {
					userName: "orindholt",
					from: firstDayThisYear,
					to: lastDayThisYear,
				},
			}),
		});

		const { data, errors }: APIResponse = await response.json();

		if ((errors && errors.length > 0) || !data) {
			throw new Error(errors[0].message);
		}

		const { totalContributions, weeks } =
			data.user.contributionsCollection.contributionCalendar;

		const days = weeks
			.flatMap(week => week.contributionDays)
			.filter(({ date }) => new Date(date) < new Date());

		if (!days || days.length === 0) {
			throw new Error("No data found");
		}

		return (
			<section className="relative space-y-4">
				<h2 className="text-3xl flex flex-col">
					<span className="font-bold leading-none">
						<CountUp end={totalContributions} />
					</span>
					<span className="text-gray-300 text-sm">
						<a
							href={SOCIALS.GITHUB}
							target="_blank"
							className="lg:hover:underline"
						>
							Github
						</a>{" "}
						Contributions
					</span>
				</h2>
				<div className="max-w-[min(calc((theme(size.4)+theme(spacing.1))*36-theme(spacing.1)),_calc(100lvw-theme(spacing.4)*2))] overflow-x-auto pb-4 w-full flex flex-row-reverse scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary-500">
					<div
						className="grid grid-rows-7 grid-flow-col gap-1"
						style={{
							direction: "ltr",
						}}
					>
						{days.map(({ contributionCount: count }, index) => {
							const level = getContributionLevel(count);
							return (
								<div
									key={index}
									className="size-4 sm:rounded-sm"
									data-count={count}
									data-level={level}
								/>
							);
						})}
					</div>
				</div>
			</section>
		);
	} catch (err) {
		const error = err as Error;
		console.error("Failed to fetch data from GitHub API", error.message);
		return null;
	}
};

function getContributionLevel(count: number) {
	if (count >= 20) return 4;
	if (count >= 14) return 3;
	if (count >= 7) return 2;
	if (count > 0) return 1;
	return 0;
}

export default Contributions;
