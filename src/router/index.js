import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "@/views/CalendarView";
const routes = [
  {
    path: "/",
    name: "calendar",
    component: CalendarView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
