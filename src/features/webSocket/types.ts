import type { Client } from "@stomp/stompjs";

export type SocketState = {
	client: Client | null;
	connected: boolean;
};
