import { Button } from "@/features/shared/components/ui/button";
import { Field, FieldLabel } from "@/features/shared/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/features/shared/components/ui/select";
import { useFilters } from "@/features/shared/hooks/use-filters";
import { notificationTypeItems } from "../constants";

function NotificationToolbar() {
	const { setFilters, filters, clearFilters } = useFilters(
		"/_authenticated/notifications/",
	);
	return (
		<div className="mb-2">
			<Field orientation="horizontal" className="w-fit items-center">
				<FieldLabel>Type</FieldLabel>
				<Select
					value={filters.notificationType ?? ""}
					onValueChange={(value) => setFilters({ notificationType: value })}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{notificationTypeItems.map((type) => (
								<SelectItem key={type.value} value={type.value}>
									{type.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{filters.notificationType && (
					<Button
						variant="outline"
						onClick={() => clearFilters(["notificationType"])}
					>
						Clear
					</Button>
				)}
			</Field>
		</div>
	);
}
export default NotificationToolbar;
