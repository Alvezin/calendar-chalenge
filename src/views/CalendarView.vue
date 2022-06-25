<template>
  <main>
    <full-calendar :options="calendarOptions" />
    <modal-component
      class="modal"
      v-show="viewConfig.showModal"
      @turnModalOff="turnModalOff()"
      :eventStart="viewConfig.eventStart"
      :eventEnd="viewConfig.eventEnd"
    />
    <define-event-click-sit
      :eventData="viewConfig.selectedEvent"
      @turnEventSitModalOff="turnEventSitModalOff()"
      v-show="DefineEventClickSit.showComponent"
    />
  </main>
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useStore } from "vuex";
import { computed, reactive } from "@vue/runtime-core";
import ModalComponent from "@/components/ModalComponent.vue";
import DefineEventClickSit from "@/components/DefineEventClickSit.vue";
export default {
  name: "CalendarView",
  setup() {
    const store = useStore();
    const viewConfig = reactive({
      showModal: false,
      eventStart: null,
      eventEnd: null,
      selectedEvent: {},
    });
    const DefineEventClickSit = reactive({
      showComponent: false,
    });

    function select(event) {
      viewConfig.showModal = true;
      viewConfig.eventStart = event.startStr;
      viewConfig.eventEnd = event.endStr;
    }

    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      editable: true,
      selectable: true,
      unselectAuto: true,
      select: select,
      events: [],
      eventClick: show,
    });
    function show(element) {
      viewConfig.selectedEvent = element.event._def;
      DefineEventClickSit.showComponent = true;
    }
    function turnModalOff() {
      viewConfig.showModal = false;
    }
    function turnEventSitModalOff () {
      DefineEventClickSit.showComponent = false;
    }
    calendarOptions.events = computed(() => store.state.calendar.eventList);
    return {
      calendarOptions,
      viewConfig,
      turnModalOff,
      DefineEventClickSit,
      turnEventSitModalOff,
    };
  },
  components: {
    FullCalendar,
    ModalComponent,
    DefineEventClickSit,
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
