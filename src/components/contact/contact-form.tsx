"use client";

import { sendVerifiedContactEmail } from "@/app/actions";
import { TURNSTILE_SITE_KEY } from "@/lib/constants";
import { randomInRange } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import confetti from "canvas-confetti";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../button";
import Input from "./form/input";
import Textarea from "./form/textarea";

const contactSchema = z.object({
	name: z.string().min(1, {
		message: "Your name is required",
	}),
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	message: z.string().min(1, {
		message: "Please enter a message",
	}),
});

export type ContactSchema = z.infer<typeof contactSchema>;

const defaultValues: ContactSchema = {
	name: "",
	email: "",
	message: "",
};

const isDevelopment = process.env.NODE_ENV === "development";

const ContactForm = () => {
	const [loading, setLoading] = useState(false);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const turnstileRef = useRef<TurnstileInstance>(null);

	const methods = useForm<ContactSchema>({
		resolver: zodResolver(contactSchema),
		defaultValues,
	});

	async function onSubmit(data: ContactSchema) {
		try {
			setLoading(true);

			if (!turnstileToken) {
				console.error("Turnstile token not available");
				return;
			}

			const info = await sendVerifiedContactEmail({
				token: turnstileToken,
				data,
			});

			if (!info) return;

			const duration = 5 * 1000;
			const animationEnd = Date.now() + duration;
			const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

			const interval = setInterval(function () {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					return clearInterval(interval);
				}

				const particleCount = 50 * (timeLeft / duration);
				// since particles fall down, start a bit higher than random
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				});
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				});
			}, 250);

			methods.reset(defaultValues);
			// Reset Turnstile
			turnstileRef.current?.reset();
			setTurnstileToken(null);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="grid max-md:grid-flow-row md:grid-cols-2 gap-x-4 gap-y-6 bg-gradient-to-br from-gray-950 to-gray-900 p-4 border border-gray-800 rounded-md"
			>
				<Input name="name" label="Name" placeholder="Your superb name" />
				<Input
					name="email"
					label="Email"
					placeholder="Whatever e-mail you use"
				/>
				<Textarea
					className="col-span-full"
					name="message"
					label="Message"
					placeholder="What do you want me to know?"
				/>
				<Button
					className="col-span-full"
					loading={loading}
					type="submit"
					disabled={!turnstileToken}
				>
					<span>Send</span>
				</Button>
				{!isDevelopment && (
					<Turnstile
						className="sr-only"
						ref={turnstileRef}
						siteKey={TURNSTILE_SITE_KEY}
						onSuccess={setTurnstileToken}
						onError={() => setTurnstileToken(null)}
						onExpire={() => setTurnstileToken(null)}
					/>
				)}
			</form>
		</FormProvider>
	);
};

export default ContactForm;
