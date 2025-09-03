import { getRequestEvent, query } from "$app/server";

export const getStatus = query(async () => {
  const { locals } = getRequestEvent()
  return locals.wticket.auth.status()
})