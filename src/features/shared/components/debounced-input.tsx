import { type InputHTMLAttributes, useEffect, useState } from "react";
import { Input } from "./ui/input";

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 200,
	className,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	className?: string;
	debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState<string | number>(initialValue);

	useEffect(() => {
		setValue((current) => {
			return current !== initialValue ? initialValue : current;
		});
	}, [initialValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: only update on value change
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (value !== initialValue) onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<Input
			{...props}
			className={className}
			value={value ?? ""}
			onChange={(e) => {
				if (e.target.value === "") return setValue("");
				if (props.type === "number") {
					setValue(e.target.valueAsNumber);
				} else {
					setValue(e.target.value);
				}
			}}
		/>
	);
}
