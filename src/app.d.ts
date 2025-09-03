import type { WTicketBot } from "wticket-bot";

declare global {
	namespace App {
		interface Locals {
			wticket: WTicketBot
		}
	}
}