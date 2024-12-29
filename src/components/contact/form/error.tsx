import { cn } from "@/lib/utils";
import get from "lodash/get";
import { FieldError, useFormContext } from "react-hook-form";

interface ErrorProps
	extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "children"> {
	name: string;
}

const Error = ({ name, className, ...props }: ErrorProps) => {
	const {
		formState: { errors },
	} = useFormContext();

	const error = get(errors, name) as FieldError | undefined;

	if (!error) return null;

	return (
		<span
			className={cn("text-error text-sm font-normal", className)}
			{...props}
		>
			{error.message as string}
		</span>
	);
};

export default Error;
