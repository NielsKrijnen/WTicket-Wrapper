import { command, form, getRequestEvent, query } from "$app/server";
import { z } from "zod";
import { redirect } from "@sveltejs/kit";

export const login = form(async data => {
  const { locals, cookies } = getRequestEvent()
  const form = z.object({
    username: z.string(),
    password: z.string()
  }).parse(Object.fromEntries(data.entries()))

  const token = await locals.wticket.auth.login({
    username: form.username,
    password: form.password
  })

  cookies.set("session", token, { path: '/' })
  redirect(302, "/")
})

export const logout = command(async () => {
  const { locals, cookies } = getRequestEvent()

  await locals.wticket.auth.logout()
  cookies.delete("session", { path: '/' })
})

export const getUser = query(async () => {
  const { locals } = getRequestEvent()

  return locals.wticket.auth.getUser()
})