<template>
  <div class="container font-roboto grid content-center min-h-screen">
    <div class="bg-white rounded-xl shadow-lg py-8 px-10 ">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl">Event Calendar</h1>
        <UserIcon/>
      </div>
      <div class="grid grid-cols-12 mt-12">
        <Calendar :dayEvents="dayEvents" class="col-span-8" />
        <Events class="col-span-4" />
      </div>
      <div class="flex justify-end mt-5">
        <AddEventButton/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from "@nuxtjs/composition-api";
import axios from "axios";
import DayEvents from "~/models/DayEvents";
import Reactive from "@/classes/Reactive";

const dayEvents: Reactive<Array<DayEvents>> = reactive(new Reactive(new Array<DayEvents>()))

onMounted(async () => {
    const data = (await axios.get("/api/getJSON")).data;
    dayEvents.value = data;
    dayEvents.value.forEach(day => day.events.sort((a, b) => a.priority - b.priority));
})

</script>

