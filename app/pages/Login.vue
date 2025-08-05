<script setup lang="ts">
const token = useCookie('token');
token.value = '123'

</script>

<template>
    
    <h1>Login</h1>
    <p>Login page</p>

    <form action="">
        <input type="text" placeholder="Email">
        <input type="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
        <NuxtLink to="/">Sobre</NuxtLink>
</template>