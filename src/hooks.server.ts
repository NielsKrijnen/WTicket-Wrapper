import type { Handle, ServerInit } from "@sveltejs/kit";
import { WTicketBot } from "wticket-bot";
import { env as ENV } from "$env/dynamic/public"
import { z } from "zod";

export const init: ServerInit = async () => {
  const host = z.string().parse(ENV.PUBLIC_WTICKET_HOST)
  // TODO: Check if host is WTicket site
  // const bot = new WTicketBot({ host })
}

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.wticket = new WTicketBot({
    host: ENV.PUBLIC_WTICKET_HOST,
  })

  return resolve(event)
}