"server only";

import { ContactSchema } from "@/components/contact/contact-form";
import { Resend } from "resend";
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
	const secretKey = process.env.TURNSTILE_SECRET_KEY;

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
			},
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
	const apiKey = process.env.RESEND_API_KEY;
	const fromEmail = process.env.RESEND_FROM_EMAIL;

	if (!apiKey || !fromEmail) {
		console.error("Resend API key or sender email not configured");
		return false;
	}

	const resend = new Resend(apiKey);

	const { error } = await resend.emails.send({
		from: `${name} <${fromEmail}>`,
		to: CONTACT_EMAIL,
		replyTo: email,
		subject: `New message from ${email}`,
		text: message,
	});

	if (error) {
		console.error(`${error.name}: ${error.message}`);
		return false;
	}

	return true;
}
