import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import Script from "next/script";
import Section from "../section";
import ContactForm from "./contact-form";

const ContactSection = () => {
	return (
		<>
			{RECAPTCHA_SITE_KEY && (
				<Script
					src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
					strategy="lazyOnload"
				/>
			)}
			<Section title="Contact">
				<ContactForm />
			</Section>
		</>
	);
};

export default ContactSection;
