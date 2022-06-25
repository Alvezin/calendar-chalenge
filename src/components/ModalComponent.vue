<template>
  <aside>
    <span
      ><input type="button" value="X" @click="$emit('turnModalOff')"
    /></span>
    <form class="modal">
      <div>
        <label for="name">Event Name: </label>
        <input type="text" id="name" v-model="inputData.title" />
      </div>

      <div>
        <label for="note">note: </label>
        <textarea
          name="note"
          id="note"
          cols="30"
          rows="10"
          v-model="inputData.note"
        ></textarea>
      </div>
      <div>
        <div>
          <label for="duration">Event Start:</label>
          <input type="date" readonly :value="eventStart" />
        </div>

        <div>
          <label for="duration">Event End:</label>
          <input type="date" readonly :value="eventEnd" />
        </div>
        <button @click.prevent="newEvent">Create new Event</button>
      </div>
    </form>
  </aside>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  name: "ModalComponent",
  props: ["eventStart", "eventEnd"],
  setup(props, { emit }) {
    const store = useStore();
    const inputData = reactive({
      title: null,
      note: null,
      start: null,
      end: null,
      id: 0,
    });

    inputData.start = computed(() => props.eventStart);
    inputData.end = computed(() => props.eventEnd);
    function cleanInputs() {
      inputData.title = null;
      inputData.note = null;
    }

    function data() {
      return {
        title: inputData.title,
        note: inputData.note,
        start: inputData.start,
        end: inputData.end,
        id: inputData.id,
      };
    }
    function newEvent() {
      inputData.id += 1;
      store.dispatch("addNewEvent", data());
      emit("turnModalOff");
      cleanInputs();
    }
    return {
      inputData,
      newEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: 0 0 7px black;
  & span {
    width: 100%;
    & input {
      float: right;
      margin-right: 10px;
      margin-top: 10px;
      color: white;
      background-color: red;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
.modal {
  background-color: lightgray;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  z-index: 100;
  border-radius: 8px;
  & div {
    display: flex;
    flex-direction: column;
    & input {
      width: 60%;
      margin: auto;
      padding: 5px 7px;
      border-radius: 8px;
      border: 2px solid rgb(169, 166, 166);
    }
    & textarea {
      width: 60%;
      margin: auto;
    }
  }
  & button {
    width: 100px;
    margin: auto;
  }
}
</style>
