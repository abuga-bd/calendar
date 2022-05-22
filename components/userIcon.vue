<template>
    <div class="relative">
        <div v-if="loggedIn && open.value" @click="toggleOpen" class="fixed inset-0"></div>
        <img @click="handleImgClick" class="z-50 relative w-12 h-12 cursor-pointer rounded-full"
            :src="[loggedIn ? user.picture : '/user.svg']" alt="login-icon">
        <div v-if="loggedIn && open.value"
            class="z-50 absolute right-0 px-4 py-2 mt-2 rounded-xl shadow-lg border-2 flex flex-col justify-center items-center bg-white">
            <img class="w-20 h-20 cursor-pointer rounded-full" :src="user.picture" alt="login-icon">
            <h4 class="mt-5 font-medium">{{ user.name }}</h4>
            <p class="text-gray-500">{{ user.email }}</p>
            <div @click="logOut" class="px-4 py-2 mt-4 font-medium border-2 rounded-md hover:bg-gray-50 cursor-pointer">
                Log out
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, useRouter, useStore } from "@nuxtjs/composition-api"

const router = useRouter();

const open = reactive({ value: false });

const store = useStore();
const { loggedIn, user } = store.$auth;

const logIn = () => {
    store.$auth.loginWith('auth0')
};

const logOut = () => {
    store.$auth.logout()
}

const toggleOpen = () => {
    open.value = !open.value;
}

const handleImgClick = () => {
    if (loggedIn)
        toggleOpen();
    else
        logIn();
}
</script>
