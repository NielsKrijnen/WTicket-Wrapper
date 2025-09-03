import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const unid = await locals.wticket.auth.getUserUNID()

  if (Number.isNaN(unid)) {
    if (url.pathname !== "/login") redirect(302, "/login")
  } else {
    if (url.pathname === "/login") redirect(302, "/")
  }
}