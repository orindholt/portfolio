"use client";

import { sendVerifiedContactEmail } from "@/app/actions";
import { generateRecaptchaToken } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
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

const ContactForm = () => {
	const methods = useForm<ContactSchema>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	async function onSubmit(data: ContactSchema) {
		console.log(data);
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
		return;
		const action = "submit";
		const token = await generateRecaptchaToken(action);
		const info = await sendVerifiedContactEmail({ token, action, data });
		console.log(info);
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-4 bg-gradient-to-br from-gray-950 to-gray-900 p-4 rounded-md border border-gray-800"
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
				<Button className="col-span-full" type="submit">
					Send
				</Button>
			</form>
		</FormProvider>
	);
};

export default ContactForm;
