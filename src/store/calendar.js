import { types } from "./mutationTypes";
const { ADD_NEW_EVENT } = types;
export default {
  state: () => ({
    eventList: [],
  }),
  mutations: {
    ADD_NEW_EVENT(state, payload) {
      state.eventList.push(payload);
    },
  },
  actions: {
    addNewEvent({ commit }, payload) {
      commit(ADD_NEW_EVENT, payload);
    },
  },
};
