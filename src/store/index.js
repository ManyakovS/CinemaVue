import {createStore} from "vuex";
import {cinemaModule} from "@/store/CinemaModule";

export default createStore({
    state: {
      isAuth: false,
    },
    modules: {
        post: cinemaModule
    }
})
