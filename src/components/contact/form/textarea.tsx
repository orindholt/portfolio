import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Error from "./error";
import Label from "./label";

export interface TextareaProps
	extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "value"> {
	label?: React.ReactNode;
	name: string;
}

const Textarea = ({ name, label, className, ...props }: TextareaProps) => {
	const { register } = useFormContext();

	const { onBlur, onChange, ...methods } = register(name);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		onChange(e);
		props.onChange?.(e);
	}

	function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
		onBlur(e);
		props.onBlur?.(e);
	}

	return (
		<div className={cn("space-y-1 text-left", className)}>
			{label && <Label htmlFor={name}>{label}</Label>}
			<textarea
				className="block bg-transparent border border-white/10 rounded-md h-32 px-3.5 py-2 placeholder:text-muted focus-visible:border-primary-500 !outline-none font-normal transition-colors w-full resize-none"
				onBlur={handleBlur}
				onChange={handleChange}
				{...methods}
				{...props}
			/>
			<Error name={name} />
		</div>
	);
};

export default Textarea;
