<template>
    <div>
        <div class="bg-rose-600 bg-green-600 bg-cyan-600 bg-indigo-600"></div>
        <div class="flex justify-center items-center text-gray-500 font-medium text-lg">
            <img @click="leftArrow" class="h-6 cursor-pointer" src="/arrow-to-left.png" alt="arrow-pointing-to-right">
            <div class="mx-12">
                {{ calendar.getMonth() }} {{ calendar.year }}
            </div>
            <img @click="rightArrow" class="h-6 cursor-pointer" src="/arrow-to-right.png" alt="arrow-pointing-to-left">
        </div>
        <div class="grid grid-cols-7 grid-rows-6 gap-y-4 mt-12">
            <div class="text-gray-700" v-for="day in calendar.days" :key="day">
                <span class="flex justify-center items-center w-10 h-10">
                    {{ day }}
                </span>
            </div>
            <div v-for="(day, i) in calendar.getDaysOfMonth()" :key="i" :class="getStyle(day, 'div')">
                <span class="flex justify-center items-center w-10 h-10 font-medium" :class="getStyle(day, 'span')">
                    <!-- :class="{ 'text-gray-400': !day.currentMonth, 'rounded-full bg-gray-200': day.currentDay }"> -->
                    {{ day.date }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "@nuxtjs/composition-api";
import Calendar from "~/classes/Calendar";
import DayEvents from "~/models/DayEvents";
import Event from "~/models/Event";
import { defineProps, defineEmits } from '@vue/runtime-dom';
import colors from "~/classes/Colors";
import Reactive from "~/classes/Reactive";
import { Temporal } from "@js-temporal/polyfill";

const props = defineProps<{
    dayEvents: Reactive<Array<DayEvents>>
}>();



const { dayEvents } = props

console.log(props, props.dayEvents, props.dayEvents.value)

const calendar: Calendar = reactive(new Calendar());

const emit = defineEmits(['update']);

const leftArrow = () => {
    calendar.substractMonth();
    const days = calendar.getDaysOfMonth();
    const firstDayMonth = days[0];
    const lastDayMonth = days[days.length - 1];

    emit("update", {
        startDate: new Date(firstDayMonth.year, firstDayMonth.month - 1, firstDayMonth.date).toISOString(),
        endDate: new Date(lastDayMonth.year, lastDayMonth.month - 1, lastDayMonth.date).toISOString()
    });
};

const rightArrow = () => {
    calendar.addMonth();
    const days = calendar.getDaysOfMonth();
    const firstDayMonth = days[0];
    const lastDayMonth = days[days.length - 1];

    emit("update", {
        startDate: new Date(firstDayMonth.year, firstDayMonth.month - 1, firstDayMonth.date).toISOString(),
        endDate: new Date(lastDayMonth.year, lastDayMonth.month - 1, lastDayMonth.date).toISOString()
    });
}

const getStyle = (day: any, cellType: 'div' | 'span'): string => {

    const currentDay = dayEvents.value.find(dayEvent => {
        const date = new Date(dayEvent.date);

        return date.getFullYear() === day.year &&
            date.getMonth() + 1 === day.month &&
            date.getDate() === day.date
    });

    if (!currentDay && cellType === 'span') return `${!day.currentMonth && 'text-gray-400'} ${day.currentDay && 'rounded-full bg-gray-200'}`;
    if (!currentDay) return '';

    const event: Event = currentDay?.events[0];

    let style: string = "";
    const _startDate = new Date(event.startDate);
    const _endDate = new Date(event.endDate);
    const _date = new Date(currentDay?.date);

    const startDate = Temporal.ZonedDateTime.from({
        timeZone: Temporal.Now.timeZone(),
        year: _startDate.getFullYear(),
        month: _startDate.getMonth() + 1,
        day: _startDate.getDate(),
    })

    const endDate = Temporal.ZonedDateTime.from({
        timeZone: Temporal.Now.timeZone(),
        year: _endDate.getFullYear(),
        month: _endDate.getMonth() + 1,
        day: _endDate.getDate(),
    })

    const date = Temporal.ZonedDateTime.from({
        timeZone: Temporal.Now.timeZone(),
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
    })

    const hasNext = event.hasNext;
    const hasBefore = date.since(startDate).hours >= 24;

    switch (cellType) {
        case 'div':
            if (day.day.toLowerCase() !== 'sun' && event.hasNext) {
                style = colors[event.colorIndex];
                style += " rounded-l-xl"
            }
            break;
        case 'span':
            style = colors[event.colorIndex];
            style += " text-white"

            if (!hasBefore && hasNext)
                style += " rounded-l-xl"
            else if (hasBefore && !hasNext)
                style += " rounded-r-xl"
            else if (!hasBefore && !hasNext && endDate.since(startDate).hours < 24)
                style += " rounded-full"

            break;
    }


    return style;
}

</script>
