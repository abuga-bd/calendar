<template>
    <div>
        <div class="flex justify-center items-center text-gray-500 font-medium text-lg">
            <img @click="leftArrow" class="h-6 cursor-pointer" src="/arrow-to-left.png" alt="arrow-pointing-to-right">
            <div class="mx-12">
                {{ calendar.getMonth() }} {{ calendar.year }}
            </div>
            <img @click="rightArrow" class="h-6 cursor-pointer" src="/arrow-to-right.png" alt="arrow-pointing-to-left">
        </div>
        <div class="grid grid-cols-7 grid-rows-6 gap-4 mt-12">
            <div class="text-gray-700" v-for="day in calendar.days" :key="day">
                <span class="flex justify-center items-center w-10 h-10">
                    {{ day }}
                </span>
            </div>
            <div v-for="(day, i) in calendar.getDaysOfMonth()" :key="i">
                <span class="flex justify-center items-center w-10 h-10 font-medium"
                    :class="{ 'text-gray-400': !day.currentMonth, 'rounded-full bg-gray-200': day.currentDay }">
                    {{ day.date }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "@nuxtjs/composition-api";
import Calendar from "~/classes/Calendar";

let calendar:Calendar = reactive(new Calendar());


const leftArrow = () => {
    calendar.substractMonth();
    // console.log(calendar === calendar.substractMonth())
};

const rightArrow = () => {
    calendar.addMonth();
    // console.log("right")
}
</script>
