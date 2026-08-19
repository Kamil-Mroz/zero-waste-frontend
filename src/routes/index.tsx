import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title: "Home",
			},
		],
	}),
	component: App,
});

function App() {
	return (
		<section className="max-w-prose mx-auto leading-7 h-full grid place-content-center space-y-4">
			<h1 className="text-3xl">Zero Waste</h1>
			<p className=" indent-4">
				Zero Waste is a demonstration eco-marketplace designed to make giving
				unwanted items a simple and more sustainable experience. Users can
				create listings, upload up to five photos, describe their items, choose
				a category and condition, and specify the city where the item can be
				collected.
			</p>
			<p className=" indent-4">
				Users can browse available items, view other people's profiles, and
				express their interest in receiving a listed item. The owner can then
				accept or reject an offer. Once an offer is accepted, the item is marked
				as given, all other offers for that item are automatically rejected, and
				the accepted user receives a notification with an option to leave a
				review.
			</p>
			<p className=" indent-4">
				After a successful exchange, users can leave a star rating and written
				review, helping others learn more about the people they interact with.
				Profiles provide an overview of a user's activity, including their
				reviews, rating distribution, number of listed, available, and
				given-away items, as well as their three latest listings.
			</p>

			<p className=" indent-4">
				The application also includes an Eco Hub where users with the Writer
				role can create, edit, and delete their own sustainability-related blog
				posts. Administrators have access to management tools for user accounts
				and item categories.
			</p>

			<p className=" indent-4">
				To make getting started easier, users can create an account or sign in
				using Google or GitHub.
			</p>

			<p className=" border-l-4 border-muted-foreground px-2 py-1 bg-muted">
				Zero Waste is a demonstration project created to explore how a
				community-driven platform can encourage reuse and reduce unnecessary
				waste.
			</p>
		</section>
	);
}
