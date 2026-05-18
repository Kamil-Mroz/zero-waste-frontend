type ItemImageProps = {
	src?: string;
	alt: string;
};
export function ItemImage({ src, alt }: ItemImageProps) {
	return (
		<div className="mx-auto w-full h-56 overflow-hidden bg-muted flex items-center justify-center ">
			{src ? (
				<img
					src={src}
					alt={alt}
					className="h-full w-full object-cover transition duration-300 hover:scale-105"
				/>
			) : (
				<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
					No image
				</div>
			)}
		</div>
	);
}
