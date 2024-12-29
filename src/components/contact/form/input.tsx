import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Error from "./error";
import Label from "./label";

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
	label?: React.ReactNode;
	name: string;
}

const Input = ({ name, label, className, ...props }: InputProps) => {
	const { register } = useFormContext();

	const { onBlur, onChange, ...methods } = register(name);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange(e);
		props.onChange?.(e);
	}

	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		onBlur(e);
		props.onBlur?.(e);
	}

	return (
		<div className={cn("space-y-1 text-left", className)}>
			{label && <Label htmlFor={name}>{label}</Label>}
			<input
				className="block bg-transparent border border-white/10 rounded-md px-3.5 py-2 placeholder:text-muted focus-visible:border-primary-500 !outline-none font-normal transition-colors w-full"
				onBlur={handleBlur}
				onChange={handleChange}
				{...methods}
				{...props}
			/>
			<Error name={name} />
		</div>
	);
};

export default Input;
