import type { MultiSelectOption } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type MultiselectMenuProps<T extends string> = {
	title: string;
	options: MultiSelectOption<T>[];
	value: T[];
	onChange: (value: T[]) => void;
	clearLabel?: string;
};

export default function MultiSelectMenu<T extends string>({
	title,
	options,
	value,
	onChange,
	clearLabel = "Clear",
}: MultiselectMenuProps<T>) {
	const toggleOption = (option: T) => {
		const isSelected = value.includes(option);

		onChange(
			isSelected ? value.filter((v) => v !== option) : [...value, option],
		);
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="lg:self-stretch">
					<Button variant="outline" className="h-full">
						{title}

						{value.length > 0 && (
							<Badge variant="outline" className="px-1 h-4">
								{value.length}
							</Badge>
						)}
					</Button>
				</div>
			</PopoverTrigger>

			<PopoverContent align="start" className="p-0 max-w-">
				<Command>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup>
							{options.map((option) => {
								const isSelected = value.includes(option.value);

								return (
									<CommandItem
										key={option.value}
										data-checked={isSelected}
										onSelect={() => toggleOption(option.value)}
									>
										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>

						{value.length > 0 && (
							<>
								<CommandSeparator />

								<CommandGroup>
									<CommandItem
										data-no-check-icon
										onSelect={() => onChange([])}
										className="flex items-center justify-center"
									>
										{clearLabel}
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
