import { configureStore } from "@reduxjs/toolkit"
import profileMenu from "./components/navigations"
import skills from "./components/skills"
import technologies from "./components/technologies"
import startups from "./components/startups"
import user from "./components/user"
import auth from "./components/auth"

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: { profileMenu, skills, user, startups, technologies, auth },
  })
}

const store = makeStore()
export default store
