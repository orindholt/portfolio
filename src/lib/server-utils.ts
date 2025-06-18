"server only";

import { ContactSchema } from "@/components/contact/contact-form";
import { CONTACT_EMAIL } from "./constants";

interface TurnstileVerificationParams {
	token: string;
}

interface TurnstileVerificationResponse {
	success: boolean;
	"error-codes"?: string[];
	challenge_ts?: string;
	hostname?: string;
}

export async function verifyTurnstileToken({
	token,
}: TurnstileVerificationParams): Promise<boolean> {
	const secretKey = process.env.TURNSTILE_SECRET_KEY!;

	if (!secretKey) {
		console.error("Turnstile secret key not configured");
		return false;
	}

	const formData = new FormData();
	formData.append("secret", secretKey);
	formData.append("response", token);

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			console.error("Turnstile verification request failed:", response.status);
			return false;
		}

		const data = (await response.json()) as TurnstileVerificationResponse;

		if (!data.success) {
			console.error("Turnstile verification failed:", data["error-codes"]);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error verifying Turnstile token:", error);
		return false;
	}
}

export async function sendContactEmail({
	email,
	name,
	message,
}: ContactSchema) {
	const apiKey = process.env.MAILGUN_API_KEY!;
	const domainName = process.env.MAILGUN_DOMAIN_NAME!;

	const formData = new FormData();

	formData.append("from", `${name} <mailgun@${domainName}>`);
	formData.append("to", CONTACT_EMAIL);
	formData.append("subject", `New message from ${email}`);
	formData.append("text", message);

	const userPass = `api:${apiKey}`;
	const authBuffer = Buffer.from(userPass).toString("base64");

	const url = new URL(`https://api.eu.mailgun.net/v3/${domainName}/messages`);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Basic ${authBuffer}`,
		},
		body: formData,
	});

	if (!response.ok) {
		console.error(`${response.status}: ${response.statusText}`);
		return false;
	}

	return true;
}
