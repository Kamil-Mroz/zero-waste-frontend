import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { toast } from "sonner";
import { Button } from "./ui/button";

type ToastAction = {
	label: string;
	onClick?: () => void;
	href?: string;
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
			<div
				className={`${baseStyle} bg-green-500/10 border-green-500/20 text-green-100`}
			>
				<div className="flex items-start gap-3">
					<CheckCircle2 className="size-5 text-green-400 mt-0.5" />

					<div>
						{title && <p className="font-semibold text-sm">{title}</p>}

						{description && (
							<p className="text-sm text-green-200/90">{description}</p>
						)}
						{action && (
							<Button
								onClick={action.onClick}
								variant={"secondary"}
								size="sm"
								className="mt-2"
							>
								{action.label}
							</Button>
						)}
					</div>
				</div>
			</div>
		)),

	error: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<div
				className={`${baseStyle} bg-red-500/10 border-red-500/20 text-red-100`}
			>
				<div className="flex items-start gap-3">
					<XCircle className="size-5 text-red-400 mt-0.5" />

					<div>
						{title && <p className="font-semibold text-sm">{title}</p>}

						{description && (
							<p className="text-sm text-red-200/90">{description}</p>
						)}
						{action && (
							<Button
								onClick={action.onClick}
								variant={"secondary"}
								size="sm"
								className="mt-2"
							>
								{action.label}
							</Button>
						)}
					</div>
				</div>
			</div>
		)),

	warning: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<div
				className={`${baseStyle} bg-yellow-500/10 border-yellow-500/20 text-yellow-100`}
			>
				<div className="flex items-start gap-3">
					<AlertTriangle className="size-5 text-yellow-400 mt-0.5" />

					<div>
						{title && <p className="font-semibold text-sm">{title}</p>}

						{description && (
							<p className="text-sm text-yellow-200/90">{description}</p>
						)}
						{action && (
							<Button
								onClick={action.onClick}
								variant={"secondary"}
								size="sm"
								className="mt-2"
							>
								{action.label}
							</Button>
						)}
					</div>
				</div>
			</div>
		)),

	info: ({ title, description, action }: ToastOptions) =>
		toast.custom(() => (
			<div
				className={`${baseStyle} bg-blue-500/10 border-blue-500/20 text-blue-100`}
			>
				<div className="flex items-start gap-3">
					<Info className="size-5 text-blue-400 mt-0.5" />

					<div>
						{title && <p className="font-semibold text-sm">{title}</p>}

						{description && (
							<p className="text-sm text-blue-200/90">{description}</p>
						)}
						{action && (
							<Button
								onClick={action.onClick}
								variant={"secondary"}
								size="sm"
								className="mt-2"
							>
								{action.label}
							</Button>
						)}
					</div>
				</div>
			</div>
		)),
};
