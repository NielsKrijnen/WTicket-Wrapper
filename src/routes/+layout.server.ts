import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const user = await locals.wticket.auth.getUser().catch(() => undefined)

  if (user) {
    if (url.pathname === "/login") redirect(302, "/")
  } else {
    if (url.pathname !== "/login") redirect(302, "/login")
  }

  return {
    user
  }
}