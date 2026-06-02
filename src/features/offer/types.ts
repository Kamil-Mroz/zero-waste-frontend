import type { z } from "zod/v4";
import type { ItemWithOwnerType } from "../item/types";
import type { Page } from "../shared/types";
import type { User } from "../users/types";
import type { offerStatusSchema } from "./schemas/offer.schema";

export type OfferStatus = z.infer<typeof offerStatusSchema>;
export type Offer = {
	id: string;
	status: OfferStatus;
	item: ItemWithOwnerType;
	buyer: User;
};

export type offerResponse = Page<Offer>;

export type OfferDialogProps = { onDone: () => void; offerId: string };
