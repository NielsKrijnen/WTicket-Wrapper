import { command, form, getRequestEvent } from "$app/server";
import { z } from "zod";

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
})

export const logout = command(async () => {
  const { locals, cookies } = getRequestEvent()

  await locals.wticket.auth.logout()
  cookies.delete("session", { path: '/' })
})