import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "./ui/item";

type ToastAction =
	| {
			label: string;
			onClick: () => void;
	  }
	| {
			label: string;
			href: string;
	  };

type ToastOptions = {
	title?: string;
	description?: string;
	action?: ToastAction;
};

const baseStyle = "border rounded-xl shadow-lg backdrop-blur-md px-4 py-3";

const toastConfig = {
	success: {
		icon: CheckCircle2,
		container:
			"bg-green-50 border-green-200 text-green-900 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-100",
		iconColor: "text-green-600 dark:text-green-400",
		description: "text-green-700 dark:text-green-200/90",
	},
	error: {
		icon: XCircle,
		container:
			"bg-red-50 border-red-200 text-red-900 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-100",
		iconColor: "text-red-600 dark:text-red-400",
		description: "text-red-700 dark:text-red-200/90",
	},
	warning: {
		icon: AlertTriangle,
		container:
			"bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-100",
		iconColor: "text-yellow-600 dark:text-yellow-400",
		description: "text-yellow-700 dark:text-yellow-200/90",
	},
	info: {
		icon: Info,
		container:
			"bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-100",
		iconColor: "text-blue-600 dark:text-blue-400",
		description: "text-blue-700 dark:text-blue-200/90",
	},
} as const;

function createToast(type: keyof typeof toastConfig) {
	return ({ title, description, action }: ToastOptions) => {
		const config = toastConfig[type];
		const Icon = config.icon;

		return toast.custom(() => (
			<Item className={`${baseStyle} ${config.container}`}>
				<ItemMedia variant="icon">
					<Icon className={`size-5 mt-0.5 ${config.iconColor}`} />
				</ItemMedia>

				<ItemContent>
					{title && (
						<ItemTitle className="font-semibold text-sm">{title}</ItemTitle>
					)}

					{description && (
						<ItemDescription className={`text-sm ${config.description}`}>
							{description}
						</ItemDescription>
					)}
				</ItemContent>

				{action && (
					<ItemActions>
						{"href" in action ? (
							<Button size="sm" asChild className="mt-2">
								<Link to={action.href}>{action.label}</Link>
							</Button>
						) : (
							<Button size="sm" onClick={action.onClick} className="mt-2">
								{action.label}
							</Button>
						)}
					</ItemActions>
				)}
			</Item>
		));
	};
}
export const appToast = {
	success: createToast("success"),
	error: createToast("error"),
	warning: createToast("warning"),
	info: createToast("info"),
};
