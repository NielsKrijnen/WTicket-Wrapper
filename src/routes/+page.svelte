<script lang="ts">
  import { logout } from "$lib/remote/auth.remote";
  import { invalidateAll } from "$app/navigation";
  import { Button } from "$lib/components/ui";
</script>

<Button onclick={async () => {
  await logout()
  await invalidateAll()
}}>Logout</Button>