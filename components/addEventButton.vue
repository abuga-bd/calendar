<template>
    <div class="relative">
        <div v-if="open.value" @click="toggleOpen" class="fixed inset-0"></div>
        <div @click="handleAddEvent"
            class="z-50 relative bg-indigo-500 rounded-full w-14 h-14 flex justify-center items-center cursor-pointer">
            <div class="relative w-6 h-6">
                <span class="absolute bg-white w-full h-0.5 inset-y-1/2 -translate-y-1/2"></span>
                <span class="absolute bg-white w-full h-0.5 inset-y-1/2 -translate-y-1/2 rotate-90"></span>
            </div>
        </div>
        <div v-if="open.value"
            class="z-50 absolute right-20 bottom-0 px-4 py-4 w-80 rounded-lg shadow-lg border-2 bg-white">
            <form @submit.prevent="formSubmit">
                <div class="flex justify-between items-center">
                    <label for="title">Title</label>
                    <input required class="border rounded-lg" type="text" name="title" v-model="event.title">
                </div>

                <div class="mt-4 flex justify-between items-center">
                    <label for="description">Description</label>
                    <input required class="border rounded-lg" type="text" name="description"
                        v-model="event.description">
                </div>

                <div class="mt-4 flex justify-between items-center">
                    <p>Starts From</p>
                    <input required class="border rounded-lg" style="width:185px" type="datetime-local"
                        :max="event.endDate" v-model="event.startDate">
                </div>

                <div class="mt-4 flex justify-between items-center">
                    <p>Ends On</p>
                    <input required class="border rounded-lg" type="datetime-local" :min="event.startDate"
                        v-model="event.endDate">
                </div>

                <div class="mt-6 flex justify-end items-center">
                    <input
                        class="px-4 py-2 font-medium border-2 rounded-md hover:bg-indigo-800 cursor-pointer bg-indigo-700 text-white"
                        type="submit" value="Save">
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@nuxtjs/composition-api"
import { reactive } from "@vue/composition-api"
import { defineEmits } from '@vue/runtime-dom';
import axios from "axios";

const emit = defineEmits(['updateEvents']);
const date = new Date().toISOString().split(".")[0];
const store = useStore()
const event = reactive({ title: '', description: '', startDate: date.substring(0, date.length - 3), endDate: date.substring(0, date.length - 3) })
const open = reactive({ value: false })

const toggleOpen = () => {
    open.value = !open.value
}

const handleAddEvent = () => {
    if (!store.$auth.loggedIn)
        store.$auth.loginWith('auth0')
    else
        toggleOpen()
}

const formSubmit = () => {
    emit("updateEvents", event);
    axios.post("/api/v1/CalendarItemsMoldels", event)
    toggleOpen()
}

</script>