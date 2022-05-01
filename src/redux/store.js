import { configureStore } from "@reduxjs/toolkit"
import user from "./components/user"
import events from "./components/events"
import countries from "./components/countriesAndCities"
import sportTypes from "./components/sportTypes"
import teams from "./components/teams"
import stories from "./components/stories"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { user, events, countries, sportTypes, teams, stories },
  })
}

const store = makeStore()
export default store
