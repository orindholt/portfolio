"server only";

import { ContactSchema } from "@/components/contact/contact-form";
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
