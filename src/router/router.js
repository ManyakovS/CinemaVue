
import { createRouter, createWebHashHistory } from "vue-router"

import RegistrationPageVue from "@/pages/RegistrationPage.vue";
import TicketPageVue from "@/pages/TicketPage.vue";
import FilmsPageVue from "@/pages/FilmsPage.vue";

const routes = [
    {
        path: '/',
        component: RegistrationPageVue
    },
    {
        path: '/ticket',
        component: TicketPageVue
    },
    {
        path: '/film',
        component: FilmsPageVue
    },
]

const router = createRouter(
    {
        routes,
        history: createWebHashHistory(process.env.Base_URL)
    }
)

export default router;