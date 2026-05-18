import { Client, type IMessage } from "@stomp/stompjs";
import { useCallback, useEffect, useReducer, useRef } from "react";
import SockJS from "sockjs-client";
import { useAuth } from "@/features/auth/hooks/useAuth";

type SubscriptionCallback = (message: any) => void;

type State = {
	client: Client | null;
	subscriptions: Map<string, any>;
};

type Action =
	| {
			type: "SET_CLIENT";
			payload: Client;
	  }
	| {
			type: "ADD_SUBSCRIPTION";
			payload: {
				destination: string;
				subscription: any;
			};
	  }
	| {
			type: "REMOVE_SUBSCRIPTION";
			payload: string;
	  }
	| {
			type: "CLEAR_CLIENT";
	  };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_CLIENT":
			return {
				...state,
				client: action.payload,
			};

		case "ADD_SUBSCRIPTION":
			return {
				...state,
				subscriptions: new Map(state.subscriptions).set(
					action.payload.destination,
					action.payload.subscription,
				),
			};

		case "REMOVE_SUBSCRIPTION": {
			const updatedSubscriptions = new Map(state.subscriptions);

			updatedSubscriptions.delete(action.payload);

			return {
				...state,
				subscriptions: updatedSubscriptions,
			};
		}

		case "CLEAR_CLIENT":
			return {
				client: null,
				subscriptions: new Map(),
			};

		default:
			return state;
	}
};
export const useWebSocketService = (webSocketUrl: string) => {
	const { token, user } = useAuth();
	const [state, dispatch] = useReducer(reducer, {
		client: null,
		subscriptions: new Map(),
	});

	const clientRef = useRef<Client | null>(null);
	const isConnected = useRef(false);

	useEffect(() => {
		clientRef.current = state.client;
	}, [state.client]);

	useEffect(() => {
		if (!token || !user) {
			if (clientRef.current) {
				clientRef.current.deactivate();
			}

			dispatch({ type: "CLEAR_CLIENT" });

			isConnected.current = false;
			return;
		}
		if (clientRef.current || isConnected.current) {
			return;
		}

		const client = new Client({
			webSocketFactory: () => new SockJS(webSocketUrl),

			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},
			debug: (str) => console.log("[WS]", str),

			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			onConnect: () => {
				console.log("Websocket connected");
				isConnected.current = true;
			},
			onStompError: (frame) => {
				console.error("WEbsocket error:", frame.headers.message);
			},
		});

		client.activate();
		dispatch({
			type: "SET_CLIENT",
			payload: client,
		});

		return () => {
			client.deactivate();
			isConnected.current = false;
			dispatch({ type: "CLEAR_CLIENT" });
		};
	}, [token, user, webSocketUrl]);
	const subscribe = useCallback(
		(destination: string, callback: SubscriptionCallback) => {
			const client = clientRef.current;
			if (!client || !isConnected.current) return;

			if (state.subscriptions.has(destination)) return;

			const subscription = client.subscribe(
				destination,
				(message: IMessage) => {
					if (message.body) {
						callback(JSON.parse(message.body));
					}
				},
			);
			dispatch({
				type: "ADD_SUBSCRIPTION",
				payload: {
					subscription,
					destination,
				},
			});
		},
		[state.subscriptions],
	);
	const unsubscribe = useCallback(
		(destination: string) => {
			const subscription = state.subscriptions.get(destination);
			if (subscription) {
				subscription.unsubscribe();
				dispatch({ type: "REMOVE_SUBSCRIPTION", payload: destination });
			}
		},
		[state.subscriptions],
	);

	const send = useCallback(
		(destination: string, body: Record<string, any> = {}) => {
			const client = clientRef.current;
			if (!client || !isConnected.current) return;
			client.publish({ destination, body: JSON.stringify(body) });
		},
		[],
	);

	return {
		client: state.client,
		isConnected: isConnected.current,
		subscribe,
		unsubscribe,
		send,
	};
};
