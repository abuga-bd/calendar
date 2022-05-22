<template>
  <div>
    <div class="flex items-cente font-semibold text-lg">
      Your events
    </div>
    <div class="grid gap-4 mt-12" v-for="event in events.value" :key="event.id">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import Reactive from "~/classes/Reactive";
import DayEvents from "~/models/DayEvents";
import Event from "~/models/Event";
import { reactive, useStore } from "@nuxtjs/composition-api";

const props = defineProps<{
  events: Reactive<Array<Event>>
}>();

const store = useStore()
</script>
