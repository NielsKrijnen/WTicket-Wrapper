<script lang="ts">
  import { login } from "$lib/remote/auth.remote";
</script>

<form {...login}>
  <label for="username">Username</label>
  <input type="text" id="username" name="username">

  <label for="password">Password</label>
  <input type="password" id="password" name="password">

  <button type="submit">Login</button>
</form>