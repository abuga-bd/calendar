<template>
    <div class="bg-cyan-600 py-4 px-6 rounded-md text-gray-50">
        <div class="flex justify-between">
            <div>
                {{ props.dayName }} - {{ props.day }} {{ props.monthName }}
            </div>
            <div>
                {{ props.time }}
            </div>
        </div>
        <div class="mt-4 text-white font-medium">
            {{ props.title }}
        </div>
        <div class="text-gray-200">
            {{ props.description }}
        </div>
    </div>
</template>

<script setup lang="ts">
import Event from "~/models/Event";
import { defineProps } from '@vue/runtime-dom';

const props = defineProps<{
    dayName: string,
    day: number,
    monthName: string,
    time: string,
    title: string,
    description: string,
    event?: Event
}>();
</script>