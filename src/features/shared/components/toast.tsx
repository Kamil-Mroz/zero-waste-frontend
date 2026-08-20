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

export const appToast = {
	success: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<Item
				className={`${baseStyle} bg-green-500/10 border-green-500/20 text-green-100`}
			>
				<ItemMedia variant={"icon"}>
					<CheckCircle2 className="size-5 text-green-400 mt-0.5" />
				</ItemMedia>

				<ItemContent>
					{title && (
						<ItemTitle className="font-semibold text-sm">{title}</ItemTitle>
					)}

					{description && (
						<ItemDescription className="text-sm text-green-200/90">
							{description}
						</ItemDescription>
					)}
				</ItemContent>
				<ItemActions>
					{action &&
						("href" in action ? (
							<Button size="sm" asChild className="mt-2">
								<Link to={action.href}>{action.label}</Link>
							</Button>
						) : (
							<Button size="sm" onClick={action.onClick} className="mt-2">
								{action.label}
							</Button>
						))}
				</ItemActions>
			</Item>
		)),

	error: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<Item
				className={`${baseStyle} bg-red-500/10 border-red-500/20 text-red-100`}
			>
				<ItemMedia variant={"icon"}>
					<XCircle className="size-5 text-red-400 mt-0.5" />
				</ItemMedia>
				<ItemContent>
					{title && (
						<ItemTitle className="font-semibold text-sm">{title}</ItemTitle>
					)}

					{description && (
						<ItemDescription className="text-sm text-red-200/90">
							{description}
						</ItemDescription>
					)}
				</ItemContent>
				<ItemActions>
					{action &&
						("href" in action ? (
							<Button size="sm" asChild className="mt-2">
								<Link to={action.href}>{action.label}</Link>
							</Button>
						) : (
							<Button size="sm" onClick={action.onClick} className="mt-2">
								{action.label}
							</Button>
						))}
				</ItemActions>
			</Item>
		)),

	warning: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<Item
				className={`${baseStyle} bg-yellow-500/10 border-yellow-500/20 text-yellow-100`}
			>
				<ItemMedia variant="icon">
					<AlertTriangle className="size-5 text-yellow-400 mt-0.5" />
				</ItemMedia>

				<ItemContent>
					{title && (
						<ItemTitle className="font-semibold text-sm">{title}</ItemTitle>
					)}

					{description && (
						<ItemDescription className="text-sm text-yellow-200/90">
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
		)),

	info: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<ItemActions
				className={`${baseStyle} bg-blue-500/10 border-blue-500/20 text-blue-100`}
			>
				<ItemMedia variant={"icon"}>
					<Info className="size-5 text-blue-400 mt-0.5" />
				</ItemMedia>

				<ItemContent>
					{title && (
						<ItemTitle className="font-semibold text-sm">{title}</ItemTitle>
					)}

					{description && (
						<ItemDescription className="text-sm text-blue-200/90">
							{description}
						</ItemDescription>
					)}
				</ItemContent>
				<ItemActions>
					{action &&
						("href" in action ? (
							<Button size="sm" asChild className="mt-2">
								<Link to={action.href}>{action.label}</Link>
							</Button>
						) : (
							<Button size="sm" onClick={action.onClick} className="mt-2">
								{action.label}
							</Button>
						))}
				</ItemActions>
			</ItemActions>
		)),
};
