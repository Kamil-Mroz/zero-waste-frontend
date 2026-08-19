import { Link } from "@tanstack/react-router";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-muted">
			<div className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
				<p className="m-0">&copy; {year} Kamil Mróz. All rights reserved.</p>

				<nav aria-label="Legal">
					<ul className="m-0 flex list-none gap-4 p-0">
						<li>
							<Link
								to="/terms"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Terms &amp; Conditions
							</Link>
						</li>

						<li>
							<Link
								to="/privacy"
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								Privacy Policy
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}
