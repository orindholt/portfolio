import { CONTACT_EMAIL } from "@/lib/constants";
import SocialList from "./social-list";

const Footer = () => {
	return (
		<footer className="py-8 flex flex-wrap gap-4 justify-between items-center">
			<SocialList />
			<a
				className="lg:hover:underline lg:hover:text-primary-500"
				href={`mailto:${CONTACT_EMAIL}`}
			>
				{CONTACT_EMAIL}
			</a>
		</footer>
	);
};

export default Footer;
