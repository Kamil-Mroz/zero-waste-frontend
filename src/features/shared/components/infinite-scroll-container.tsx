import type { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollContainerProps = {
	onBottomReached?: () => void;
	onTopReached?: () => void;
	className?: string;
} & PropsWithChildren;
function InfiniteScrollContainer({
	children,
	className,
	onBottomReached,
	onTopReached,
}: InfiniteScrollContainerProps) {
	const { ref: bottomRef } = useInView({
		rootMargin: "50px",
		onChange(inView) {
			if (inView) {
				onBottomReached?.();
			}
		},
	});
	const { ref: topRef } = useInView({
		rootMargin: "-50px",
		onChange(inView) {
			if (inView) {
				onTopReached?.();
			}
		},
	});
	return (
		<div className={className}>
			<div ref={topRef} />
			{children}
			<div ref={bottomRef} />
		</div>
	);
}
export default InfiniteScrollContainer;
