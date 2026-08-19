import type { ReactNode } from "react";

type SectionProps = {
	title: string;
	children: ReactNode;
};
export default function Section({ title, children }: SectionProps) {
	return (
		<section className="grid gap-2">
			<h2 className="text-xl">{title}</h2>
			<div className=" grid gap-2 text-justify indent-4">{children}</div>
		</section>
	);
}
