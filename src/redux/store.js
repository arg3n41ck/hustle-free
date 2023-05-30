import { configureStore } from '@reduxjs/toolkit'
import user from './components/user'
import events from './components/events'
import countries from './components/countriesAndCities'
import sportTypes from './components/sportTypes'
import teams from './components/teams'
import stories from './components/stories'
import categories from './components/categories'
import athletes from './components/athletes'
import brackets from './components/eventBrackets'
import participantCategories from './components/participantsCategories'
import organizers from './components/organizers'
import daysAndMats from './components/daysAndMats'

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      user,
      events,
      countries,
      sportTypes,
      teams,
      stories,
      athletes,
      categories,
      brackets,
      participantCategories,
      organizers,
      daysAndMats,
    },
  })
}

const store = makeStore()
export default store
