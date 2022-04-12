import { configureStore } from "@reduxjs/toolkit"
import navigations from "./components/navigations"
import user from "./components/user"
import events from "./components/events"
import locations from "./components/locations"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { navigations, user, events, locations },
  })
}

const store = makeStore()
export default store
