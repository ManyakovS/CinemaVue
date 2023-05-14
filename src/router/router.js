
import { createRouter, createWebHashHistory } from "vue-router"

import RegistrationPageVue from "@/pages/RegistrationPage.vue";
import TicketPageVue from "@/pages/TicketPage.vue";
import FilmsPageVue from "@/pages/FilmsPage.vue";
import MyTicketsVue from "@/pages/MyTickets.vue";
import AdminPageVue from "@/pages/AdminPage.vue";

const routes = [
    {
        path: '/',
        component: RegistrationPageVue
    },
    {
        path: '/ticket/:filmName',
        name: 'ticket',
        component: TicketPageVue
    },
    {
        path: '/film',
        component: FilmsPageVue
    },
    {
        path: '/myTicket',
        component: MyTicketsVue
    },
    {
        path: '/admin',
        component: AdminPageVue
    },
]

const router = createRouter(
    {
        routes,
        history: createWebHashHistory(process.env.Base_URL)
    }
)

export default router;