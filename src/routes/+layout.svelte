<script lang="ts">
  // noinspection ES6UnusedImports
  import { Separator, Sidebar, DropdownMenu, Avatar } from "$lib/components/ui";
  import "../app.css"
  import { env } from "$env/dynamic/public"
  import { EllipsisVertical, LogOut, Search, CirclePlus } from "@lucide/svelte"
  import { logout } from "$lib/remote/auth.remote";
  import { invalidateAll } from "$app/navigation";
  import type { Component } from "svelte";
  import { getStatus } from "$lib/remote/wticket.remote";
  import { VERSION } from "$lib/constants";

  type NavItem = {
    title: string
    href: string
    icon: Component
  }

  const secondaryNavItems: NavItem[] = [
    {
      title: "Search",
      href: "/search",
      icon: Search
    }
  ]

	let { data, children } = $props();

  const sidebar = Sidebar.useSidebar()
</script>

<svelte:head>
  <link rel="icon" href="https://{env.PUBLIC_WTICKET_HOST}/login/wf/favicon.png">
</svelte:head>

{#snippet user()}
  <Avatar.Root class="size-8 rounded-lg">
    <Avatar.Fallback class="rounded-lg">{data.user?.preferences[0].user[0]}</Avatar.Fallback>
  </Avatar.Root>
  <div class="grid flex-1 text-left text-sm leading-tight">
    <span class="truncate font-medium">{data.user?.preferences[0].user}</span>
<!--      <span class="text-muted-foreground truncate text-xs">-->
<!--        {user.email}-->
<!--      </span>-->
  </div>
{/snippet}

<svelte:boundary>
  {#snippet pending()}
    Loading...
  {/snippet}

  <Sidebar.Provider>
    {#if data.user}
      <Sidebar.Root collapsible="offcanvas" variant="inset">
        <Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5 h-fit">
                {#snippet child({ props })}
                  <a href="/" {...props}>
                    <img src="https://{env.PUBLIC_WTICKET_HOST}/login/wf/favicon.png" alt="WTicket Logo" class="size-8">
                    <div class="flex flex-col gap-0">
                      <span class="text-base font-semibold">WTicket</span>
                      {#await getStatus() then status}
                        <span>{status.version}-{VERSION}</span>
                      {/await}
                    </div>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  class="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  tooltipContent="Create Ticket"
                >
                  <CirclePlus/>
                  <span>Create Ticket</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Views</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/tickets" {...props}>
                      <span>My Tickets</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/tickets" {...props}>
                      <span>Current Tickets</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/tickets" {...props}>
                      <span>New Tickets</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/tickets" {...props}>
                      <span>All Tickets</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/messages" {...props}>
                      <span>Messages</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/users" {...props}>
                      <span>Users</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/relations" {...props}>
                      <span>Relations</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/staff" {...props}>
                      <span>Staff</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Management</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  {#snippet child({ props })}
                    <a href="/relations" {...props}>
                      <span>Relations</span>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group class="mt-auto">
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {#each secondaryNavItems as item}
                  {@const Icon = item.icon}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      {#snippet child({ props })}
                        <a href={item.href} {...props}>
                          <Icon/>
                          <span>{item.title}</span>
                        </a>
                      {/snippet}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  {#snippet child({ props })}
                    <Sidebar.MenuButton
                      {...props}
                      size="lg"
                      class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      {@render user()}
                      <EllipsisVertical class="ml-auto size-4"/>
                    </Sidebar.MenuButton>
                  {/snippet}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
                  side={sidebar?.isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenu.Label>
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      {@render user()}
                    </div>
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator/>
                  <DropdownMenu.Item onclick={async () => {
                    await logout()
                    await invalidateAll()
                  }}>
                    <LogOut class="text-destructive"/>
                    <span class="text-destructive">Log out</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Root>
    {/if}
    <Sidebar.Inset class="overflow-hidden">
      {#if data.user}
        <header class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width, height] ease-linear">
          <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <Sidebar.Trigger class="-ml-1"/>
            <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4"/>
            <h1 class="text-base font-medium">WTicket</h1>
          </div>
        </header>
      {/if}
      <div class="p-4 h-full overflow-auto">
        {@render children?.()}
      </div>
    </Sidebar.Inset>
  </Sidebar.Provider>
</svelte:boundary>