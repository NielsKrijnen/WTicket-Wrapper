<script lang="ts">
  // noinspection ES6UnusedImports
  import { Table } from "$lib/components/ui";
  import { listStaff } from "$lib/remote/staff.remote";
  import { goto } from "$app/navigation";
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Staff Code</Table.Head>
      <Table.Head>Name</Table.Head>
      <Table.Head>Tasks</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each (await listStaff()).staff as staff}
      <Table.Row class="cursor-pointer" onclick={() => goto(`/staff/${staff.id}`)}>
        <Table.Cell>{staff.staffCode}</Table.Cell>
        <Table.Cell>{staff.name}</Table.Cell>
        <Table.Cell>{staff.tasks}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colspan={2}/>
      <Table.Cell>{(await listStaff()).totalTasks}</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>