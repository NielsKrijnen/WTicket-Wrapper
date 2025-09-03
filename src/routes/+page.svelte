<script lang="ts">
  import { logout } from "$lib/remote/auth.remote";
  import { invalidateAll } from "$app/navigation";
</script>

<button onclick={async () => {
  await logout()
  await invalidateAll()
}}>Logout</button>