"use server";

import { ContactSchema } from "@/components/contact/contact-form";
import { sendContactEmail, verifyTurnstileToken } from "@/lib/server-utils";

interface SendContactEmailParams {
	token: string;
	data: ContactSchema;
}

export async function sendVerifiedContactEmail({
	token,
	data,
}: SendContactEmailParams) {
	const verification = await verifyTurnstileToken({ token });

	if (!verification && process.env.NODE_ENV !== "development") return null;

	return sendContactEmail(data);
}
