import { configureStore } from "@reduxjs/toolkit"
import navigations from "./components/navigations"
import technologies from "./components/technologies"
import startups from "./components/startups"
import user from "./components/user"
import events from "./components/events"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { navigations, user, startups, technologies, events },
  })
}

const store = makeStore()
export default store
