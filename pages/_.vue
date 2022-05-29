<template>
  <div class="container font-roboto grid content-center min-h-screen" >
    <div class="bg-white rounded-xl shadow-lg py-8 px-10 ">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl">Event Calendar</h1>
        <UserIcon />
      </div>
      <div class="grid grid-cols-12 mt-12" >
        <Calendar :day-events="dayEvents" class="col-span-8" @update="inputUpdated" />
        <Events :events="cardEvents" class="col-span-4" />
      </div>
      <div class="flex justify-end mt-5" v-if="store.$auth.loggedIn">
        <AddEventButton :day-events="dayEvents" @updateEvents="inputUpdatedEvents" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, useStore } from "@nuxtjs/composition-api";
import axios from "axios";
import { Temporal } from "@js-temporal/polyfill";
import DayEvents from "~/models/DayEvents";
import Reactive from "@/classes/Reactive";
import Event from "~/models/Event";

const store = useStore()

let index = 0;
const cardEvents: Reactive<Array<Event>> = reactive(new Reactive(new Array<Event>()));
const NO_DISPLAYED_EVENTS = 3;
let eventsAdded: number = 0;
const dayEvents: Reactive<Array<DayEvents>> = reactive(new Reactive(new Array<DayEvents>()))

onMounted(async () => {
  if (!store.$auth.loggedIn)
    return
  const data = (await axios.get("https://localhost:7272/external/api/v1/CalendarItemModels", {
    headers: {
      Authorization: `${(<any>store.$auth.strategy).token.get()}`
    }
  })).data;
  dayEvents.value = data;
  dayEvents.value.forEach(day => day.events.sort((a, b) => a.priority - b.priority));
  index = dayEvents.value.length;
  makeEvents()
})

const inputUpdated = async (value: { startDate: string, endDate: string }) => {
  if (!store.$auth.loggedIn)
    return
  const data = (await axios.get("https://localhost:7272/external/api/v1/CalendarItemModels", {
    params: { 
      startDate: value.startDate,
      endDate: value.endDate 
    },
    headers: {
      Authorization: `${(<any>store.$auth.strategy).token.get()}`
    }
  })).data;
  dayEvents.value = data;
  dayEvents.value.forEach(day => day.events.sort((a, b) => a.priority - b.priority));
}

const inputUpdatedEvents = async (value: {
  title: string,
  description: string,
  startDate: string,
  endDate: string,
}) => {
  const _startDate = new Date(value.startDate);
  const _endDate = new Date(value.endDate);

  let startDate = Temporal.ZonedDateTime.from({
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

  const priority = endDate.epochMilliseconds - startDate.epochMilliseconds;
  while (startDate.epochMilliseconds <= endDate.epochMilliseconds) {
    dayEvents.value.push(
      {
        date: new Date(startDate.year, startDate.month - 1, startDate.day, 3, 0, 0).toISOString(),
        events: [
          {
            id: index,
            title: value.title,
            description: value.description,
            startDate: value.startDate,
            endDate: value.endDate,
            hasNext: endDate.since(startDate).hours >= 24,
            priority,
            colorIndex: index % 4
          }
        ]
      }
    )

    startDate = startDate.add({days: 1});
  }

  index++;
  dayEvents.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  dayEvents.value.forEach(day => day.events.sort((a, b) => a.priority - b.priority));
  makeEvents()
}

const makeEvents = () => {
  if (store.$auth.loggedIn) {
    for (let i = 0; i < dayEvents.value.length; i++) {
      const day = dayEvents.value[i];
      const _date = new Date(day.date);

      const date = Temporal.ZonedDateTime.from({
        timeZone: Temporal.Now.timeZone(),
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
        hour: _date.getHours(),
        minute: _date.getMinutes()
      })

      if (date.epochMilliseconds - Temporal.Now.zonedDateTimeISO().epochMilliseconds > 0)
        for (let j = 0; j < day.events.length; j++) {
          const event = day.events[j];
          if (!cardEvents.value.find((existingEvent: Event) => event.id === existingEvent.id)) {
            cardEvents.value.push(event);
            eventsAdded++;

            if (eventsAdded === NO_DISPLAYED_EVENTS) {
              break;
            }
          }
        }

      if (eventsAdded === NO_DISPLAYED_EVENTS) {
        break;
      }
    }
  } else {
    cardEvents.value = cardEvents.value.concat([
      {
        id: 1,
        title: "Plecat la munte",
        description: "Nu uita portofel",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        hasNext: false,
        priority: 10,
        colorIndex: 0
      },
      {
        id: 2,
        title: "Plecat la munte",
        description: "Nu uita portofel",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        hasNext: false,
        priority: 10,
        colorIndex: 1
      },
      {
        id: 3,
        title: "Plecat la munte",
        description: "Nu uita portofel",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        hasNext: false,
        priority: 10,
        colorIndex: 2
      }
    ])
  }
}

</script>

