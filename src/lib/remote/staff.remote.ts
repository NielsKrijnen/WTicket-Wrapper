import { getRequestEvent, query } from "$app/server";

export const listStaff = query(async () => {
  const { locals } = getRequestEvent()
  return locals.wticket.staff.list()
})