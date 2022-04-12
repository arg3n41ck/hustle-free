import { configureStore } from "@reduxjs/toolkit"
import profileMenu from "./components/navigations"
import skills from "./components/skills"
import technologies from "./components/technologies"
import startups from "./components/startups"
import user from "./components/user"
import events from "./components/events"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { profileMenu, skills, user, startups, technologies, events },
  })
}

const store = makeStore()
export default store
