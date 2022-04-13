import { configureStore } from "@reduxjs/toolkit"
import navigations from "./components/navigations"
import user from "./components/user"
import events from "./components/events"
import countries from "./components/countriesAndCities"
import sportTypes from "./components/sportTypes"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { navigations, user, events, countries, sportTypes },
  })
}

const store = makeStore()
export default store
