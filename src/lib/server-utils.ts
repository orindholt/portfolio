"server only";

import { ContactSchema } from "@/components/contact/contact-form";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL, RECAPTCHA_SITE_KEY } from "./constants";

interface CreateAssesmentParams {
	token: string;
	action: string;
}

interface CreateAssesmentError {
	code: number;
	message: string;
	status: string;
	details?: Array<{
		"@type": string;
		reason: string;
		domain: string;
		metadata: {
			service: string;
			consumer: string;
		};
	}>;
}

interface CreateAssesmentSuccess {
	name: string;
	event: {
		token: string;
		siteKey: string;
		userAgent: string;
		userIpAddress: string;
		expectedAction: string;
		hashedAccountId: string;
		express: boolean;
		requestedUri: string;
		wafTokenAssessment: boolean;
		ja3: string;
		headers: Array<unknown>;
		firewallPolicyEvaluation: boolean;
		fraudPrevention: string;
	};
	riskAnalysis: {
		score: number;
		reasons: Array<unknown>;
		extendedVerdictReasons: Array<unknown>;
		challenge: string;
	};
	tokenProperties: {
		valid: boolean;
		invalidReason: string;
		hostname: string;
		androidPackageName: string;
		iosBundleId: string;
		action: string;
		createTime: string;
	};
}

type CreateAssesmentResponse = CreateAssesmentError | CreateAssesmentSuccess;

export async function createAndVerifyAssesment({
	token,
	action,
}: CreateAssesmentParams): Promise<boolean> {
	const projectId = process.env.RECAPTCHA_PROJECT_ID!;
	const apiKey = process.env.RECAPTCHA_API_KEY!;

	const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			event: {
				token,
				expectedAction: action,
				siteKey: RECAPTCHA_SITE_KEY,
			},
		}),
	});

	const data = (await response.json()) as CreateAssesmentResponse;

	if ("code" in data) {
		console.error(data);
		return false;
	}

	if (data.riskAnalysis.score <= 0.5 || !data.tokenProperties.valid) {
		return false;
	}

	return true;
}

export async function sendContactEmail(data: ContactSchema) {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		auth: {
			user: process.env.ETHEREAL_EMAIL_USER,
			pass: process.env.ETHEREAL_EMAIL_PASS,
		},
	});

	return transporter.sendMail({
		from: `Website Contact Form <${process.env.ETHEREAL_EMAIL_USER}>`,
		to: CONTACT_EMAIL,
		subject: `New message from ${data.name} (${data.email})`,
		text: data.message,
	});
}
