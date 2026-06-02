export const OFFER_QUERY_KEYS = {
	all: ["offers"],
	own: () => [...OFFER_QUERY_KEYS.all, "own"],
	received: () => [...OFFER_QUERY_KEYS.all, "received"],
	byId: (id: string) => [...OFFER_QUERY_KEYS.all, "detail",id],
} as const;

export const offersDialogConfig = {
	accept: {
		title: "Accept Offer",
		description:
			"Accept this offer and mark the item as given. All other pending offers will be automatically rejected.",
	},

	reject: {
		title: "Reject Offer",
		description:
			"Reject this offer. The buyer will be notified that their request was declined.",
	},

	cancel: {
		title: "Cancel Offer",
		description:
			"Cancel your interest request for this item. The owner will be notified.",
	},

	empty: {
		title: "",
		description: "",
	},
} as const;
