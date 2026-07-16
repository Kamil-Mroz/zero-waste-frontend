import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
// import SockJS from "sockjs-client/dist/sockjs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { SubscriptionCallback } from "../types";

// export const useWebSocketService = (webSocketUrl: string) => {
//   const { token, user } = useAuth();
//   const subscriptionsRef = useRef(new Map<string, StompSubscription>());

//   const clientRef = useRef<Client | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//    // biome-ignore lint/correctness/useExhaustiveDependencies: should not rerun on isConnected
//   useEffect(() => {
//     if (!token || !user) {
//       clientRef.current?.deactivate();

//       subscriptionsRef.current.clear();
//       clientRef.current = null;

//       setIsConnected(false);
//       return;
//     }
//     if (clientRef.current || isConnected) {
//       return;
//     }

//     const client = new Client({
//       webSocketFactory: () => new WebSocket(webSocketUrl),

//       connectHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//       debug: (str) => console.log("[WS]", str),

//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//       forceBinaryWSFrames: true,
//       appendMissingNULLonIncoming: true,
//       onConnect: () => {
//         console.log("Websocket connected");
//         setIsConnected(true);
//       },
//       onStompError: (frame) => {
//         console.error("Websocket error:", frame.headers.message);
//       },
//     });

//     client.activate();

//     clientRef.current = client;

//     return () => {
//       subscriptionsRef.current.forEach((sub) => {
//         sub.unsubscribe();
//       });
//       subscriptionsRef.current.clear();
//       client.deactivate();
//       clientRef.current = null;

//       setIsConnected(false);

//     };
//   }, [token, user, webSocketUrl]);
//   const subscribe = useCallback(
//     (destination: string, callback: SubscriptionCallback) => {
//       const client = clientRef.current;
//       if (!client || !isConnected) return null;

//       const subscription = client.subscribe(
//         destination,
//         (message: IMessage) => {
//           if (message.body) {
//             callback(JSON.parse(message.body));
//           }
//         },
//       );
//       const subscriptionId = subscription.id;
//       subscriptionsRef.current.set(subscriptionId, subscription);

//       return subscriptionId;
//     },
//     [isConnected],
//   );
//   const unsubscribe = useCallback(
//     (subscriptionId: string) => {

//       const subscription = subscriptionsRef.current.get(subscriptionId);
//       if (!subscription) return;

//       subscription.unsubscribe();

//       subscriptionsRef.current.delete(subscriptionId);
//     },
//     [],
//   );

//   const send = useCallback(
//     (destination: string, body: Record<string, any> = {}) => {
//       const client = clientRef.current;
//       if (!client || !isConnected) return;
//       client.publish({ destination, body: JSON.stringify(body) });
//     },
//     [isConnected],
//   );

//   return {
//     client: clientRef.current,
//     isConnected: isConnected,
//     subscribe,
//     unsubscribe,
//     send,
//   };
// };

// export type WebsocketContextType = {
//   client: Client | null;
//   isConnected: boolean;
//   subscribe: (destination: string, callback: SubscriptionCallback) => void;

//   unsubscribe: (destination: string) => void;
//   send: (destination: string, body?: Record<string, any>) => void;
// };

// export const WebSocketContext = createContext<WebsocketContextType | undefined>(
//   undefined,
// );

// export const useWebSocket = () => {
//   const context = useContext(WebSocketContext);
//   if (!context) {
//     throw new Error("useWebSocket must be used withing WebSocketProvider");
//   }
//   return context;
// };
