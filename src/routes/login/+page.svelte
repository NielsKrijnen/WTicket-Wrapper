<script lang="ts">
  import { login } from "$lib/remote/auth.remote";
  import { Button, Label, Input } from "$lib/components/ui";
</script>

<form {...login}>
  <Label for="username">Username</Label>
  <Input type="text" id="username" name="username"/>

  <Label for="password">Password</Label>
  <Input type="password" id="password" name="password"/>

  <Button type="submit">Login</Button>
</form>