<template>
    <div :class="getStyle()">
        <div class="flex justify-between">
            <div v-if="cardEvent.dayStart === cardEvent.dayEnd && cardEvent.monthNameStart === cardEvent.monthNameEnd">
                {{ cardEvent.dayNameStart }} - {{ cardEvent.dayStart }} {{ cardEvent.monthNameStart }} 
            </div>
            <div v-else>
                {{ cardEvent.dayNameStart }} - {{ cardEvent.dayStart }} {{ cardEvent.monthNameStart }} to {{ cardEvent.dayEnd }} {{ cardEvent.monthNameEnd }}
            </div>
            <div>
                {{ cardEvent.time }}
            </div>
        </div>
        <div class="mt-4 text-white font-medium">
            {{ cardEvent.title }}
        </div>
        <div class="text-gray-200">
            {{ cardEvent.description }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import { defineProps } from '@vue/runtime-dom';
import Event from "~/models/Event";
import CardEvent from "~/models/CardEvent";
import colors from "~/classes/Colors";

let cardEvent: CardEvent;
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const props = defineProps<{
    dayName?: string,
    day?: number,
    monthName?: string,
    time?: string,
    title?: string,
    description?: string,
    event: Event
}>();

const computeTime = (date: any) => {
    
    let hours = date.hour;
    let amOrPm = "AM";
    const minutes = ("0" + date.minute).slice(-2);

    if (date.hour > 12) {
        hours = date.hour - 12;
        amOrPm = "PM";
    } 

    hours = ("0" + hours).slice(-2);

    return `${hours}:${minutes} ${amOrPm}`;
};

const _startDate = new Date(props.event.startDate);
const _endDate = new Date(props.event.endDate);

const startDate = Temporal.ZonedDateTime.from({
    timeZone: Temporal.Now.timeZone(),
    year: _startDate.getFullYear(),
    month: _startDate.getMonth() + 1,
    day: _startDate.getDate(),
    hour: _startDate.getHours(),
    minute: _startDate.getMinutes()
})

const endDate = Temporal.ZonedDateTime.from({
    timeZone: Temporal.Now.timeZone(),
    year: _endDate.getFullYear(),
    month: _endDate.getMonth() + 1,
    day: _endDate.getDate(),
    hour: _endDate.getHours(),
    minute: _endDate.getMinutes()
})

cardEvent = {
    title: props.event.title,
    description: props.event.description,
    dayNameStart: days[startDate.dayOfWeek - 1],
    dayNameEnd: days[endDate.dayOfWeek - 1],
    dayStart: startDate.day,
    dayEnd: endDate.day,
    monthNameStart: months[startDate.month - 1],
    monthNameEnd: months[endDate.month - 1],
    time: computeTime(startDate),
    color: colors[props.event.colorIndex]
}

const getStyle = () => {
    return `${cardEvent.color} py-4 px-6 rounded-md text-gray-50`;
}
</script>