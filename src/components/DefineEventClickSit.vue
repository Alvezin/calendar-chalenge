<template>
  <aside class="modal">
    <span
      ><input type="button" value="X" @click="$emit('turnEventSitModalOff')"
    />
    <h4>{{ state.prop.title }}</h4>
    </span>
    <div>
      <button>aprove</button>
      <button>Cancel</button>
      <button>Details</button>
    </div>
  </aside>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  name: "DefineEventClickSit",
  props: ["eventData"],
  setup(props) {
    const state = reactive({
      prop: computed(() => props.eventData),
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss" scoped>
span {
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
.modal {
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: white;
  width: 200px;
  min-height: 100px;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
