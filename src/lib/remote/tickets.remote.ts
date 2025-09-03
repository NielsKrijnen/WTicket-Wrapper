import { getRequestEvent, query } from "$app/server";

export const listTickets = query(async () => {
  const { locals } = getRequestEvent()

  return locals.wticket.ticket.list()
})