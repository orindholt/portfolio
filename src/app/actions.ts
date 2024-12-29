"use server";

import { ContactSchema } from "@/components/contact/contact-form";
import { createAndVerifyAssesment, sendContactEmail } from "@/lib/server-utils";

interface SendContactEmailParams {
	token: string;
	action: string;
	data: ContactSchema;
}

export async function sendVerifiedContactEmail({
	token,
	action,
	data,
}: SendContactEmailParams) {
	const verification = await createAndVerifyAssesment({ token, action });

	if (!verification && process.env.NODE_ENV !== "development") return null;

	return sendContactEmail(data);
}
