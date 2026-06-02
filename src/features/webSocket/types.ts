import type { Client, StompSubscription } from "@stomp/stompjs";

export type SocketState = {
	client: Client | null;
	connected: boolean;
};

export type SubscriptionCallback = (message: any) => void;

export type State = {
	client: Client | null;
	subscriptions: Map<string, StompSubscription>;
};

export type Action =
	| {
			type: "SET_CLIENT";
			payload: Client;
	  }
	| {
			type: "ADD_SUBSCRIPTION";
			payload: {
				id: string;
				subscription: StompSubscription;
			};
	  }
	| {
			type: "REMOVE_SUBSCRIPTION";
			payload: string;
	  }
	| {
			type: "CLEAR_CLIENT";
	  };

export type WebsocketContextType = {
	client: Client | null;
	isConnected: boolean;
	subscribe: (destination: string, callback: SubscriptionCallback) => string;

	unsubscribe: (subscriptionId: string) => void;
	send: (destination: string, body?: Record<string, any>) => void;
};
