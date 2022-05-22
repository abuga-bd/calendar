<template>
  <div>
    <div class="flex items-cente font-semibold text-lg">
      Your events
    </div>
    <div class="grid gap-4 mt-12">
      <EventCard dayName="Monday" :day="15" monthName="Dec" time="9:00 AM" title="Plecat la munte" description="Nu uita portofel" />
      <EventCard dayName="Monday" :day="15" monthName="Dec" time="9:00 AM" title="Plecat la munte" description="Nu uita portofel" />
      <EventCard dayName="Monday" :day="15" monthName="Dec" time="9:00 AM" title="Plecat la munte" description="Nu uita portofel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Event from "~/models/Event";

const props = defineProps<{
    events?: [Event]
}>();


</script>
