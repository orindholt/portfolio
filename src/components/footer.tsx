import { CONTACT_EMAIL } from "@/lib/constants";
import SocialList from "./social-list";

const Footer = () => {
	return (
		<footer className="py-8 flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-between items-center border-t border-gray-800">
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
