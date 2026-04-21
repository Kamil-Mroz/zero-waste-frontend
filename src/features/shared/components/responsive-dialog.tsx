import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "./ui/drawer";

type ResponsiveDialogProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	description?: string;
} & PropsWithChildren;

export default function ResponsiveDialog({
	children,
	isOpen,
	setIsOpen,
	title,
	description,
}: ResponsiveDialogProps) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className="">
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
						{description && (
							<DrawerDescription>{description}</DrawerDescription>
						)}
					</DrawerHeader>
					<div className="mx-auto w-full max-w-md max-h-[50vh] overflow-y-auto">
						<div className="px-4">{children}</div>
						<DrawerFooter className="pt-2">
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
}
