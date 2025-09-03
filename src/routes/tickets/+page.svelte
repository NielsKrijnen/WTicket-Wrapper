<script lang="ts">
  import { listTickets } from "$lib/remote/tickets.remote";
</script>

{#each await listTickets() as ticket}
  {ticket.id}
{/each}