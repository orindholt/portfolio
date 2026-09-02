import { SOCIALS } from "@/lib/constants";
import { GithubIcon, LinkedinIcon } from "lucide-react";

type Social = keyof typeof SOCIALS;

interface SocialListProps extends React.HTMLAttributes<HTMLUListElement> {
	socials?: Array<Social>;
}

const defaultSocials = Object.keys(SOCIALS) as Array<Social>;

const SocialList = ({ socials = defaultSocials }: SocialListProps) => {
	return (
		<ul className="flex gap-4" aria-label="Social links">
			{socials.map(social => (
				<li key={social}>
					<a
						aria-label={`Link to my ${social} profile`}
						target="_blank"
						href={SOCIALS[social]}
						className="text-white lg:hover:text-primary-500"
					>
						<SocialIcon social={social} />
					</a>
				</li>
			))}
		</ul>
	);
};

interface SocialIconProps extends React.HTMLAttributes<SVGSVGElement> {
	social: Social;
}

const SocialIcon = ({ social, ...props }: SocialIconProps) => {
	switch (social) {
		case "GITHUB":
			return <GithubIcon {...props} />;
		case "LINKEDIN":
			return <LinkedinIcon {...props} />;
		default:
			return null;
	}
};

export default SocialList;
