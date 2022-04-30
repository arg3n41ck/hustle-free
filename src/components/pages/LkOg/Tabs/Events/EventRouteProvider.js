import React, { useCallback, useEffect, useState } from "react"
import { createContext, useContext } from "react"
import $api from "../../../../../services/axios"
import { useRouter } from "next/router"

const EventRouteContext = createContext()

const steps = [
  "general",
  "location",
  "periods",
  "description",
  "rules",
  "participantCategories",
  "contacts",
]

const eventProfileFormPaths = [
  "/lk-og/profile/events/edit/[id]",
  "/lk-og/profile/events/edit",
]

function EventRouteWrapper({ children }) {
  const {
    pathname,
    query: { id: eventId },
  } = useRouter()

  const [ctxStep, setCtxStep] = useState({
    general: {
      allFieldsFilled: false,
      access: true,
    },
    location: {
      allFieldsFilled: false,
      access: false,
    },
    periods: {
      allFieldsFilled: false,
      access: false,
    },
    description: {
      allFieldsFilled: false,
      access: false,
    },
    rules: {
      allFieldsFilled: false,
      access: false,
    },
    participantCategories: {
      allFieldsFilled: false,
      access: false,
    },
    contacts: {
      allFieldsFilled: false,
      access: false,
    },
  })

  const rowEventRoutes = useCallback(
    (resStatuses) => {
      if (resStatuses && eventId) {
        steps.forEach((statusKey, i) => {
          const isPreviousFilled = !!resStatuses[steps[i - 1 || 0]]
          const isCurrentFilled = !!resStatuses[statusKey]
          setCtxStep((s) => ({
            ...s,
            [statusKey]: {
              allFieldsFilled: isCurrentFilled,
              access: statusKey === "general" ? true : !!isPreviousFilled,
            },
          }))
        })
      } else if (!eventId) {
        steps.forEach((key) => {
          setCtxStep((s) => ({
            ...s,
            [key]: {
              allFieldsFilled: false,
              access: key === "general",
            },
          }))
        })
      }
    },
    [eventId, pathname]
  )

  const isInOgProfile = eventProfileFormPaths.includes(pathname)

  useEffect(async () => {
    isInOgProfile && eventId
      ? await $api
          .get(`/organizer/events/${eventId}/event_creating_status/`)
          .then(({ data }) => {
            const { event, id, ...rest } = data
            rowEventRoutes(rest)
          })
      : rowEventRoutes(null)
  }, [eventId, pathname])

  return (
    <EventRouteContext.Provider
      value={{
        ctxStep,
        setCtxStep,
      }}
    >
      {children}
    </EventRouteContext.Provider>
  )
}

export function useEventRouteContext() {
  return useContext(EventRouteContext)
}

export default EventRouteWrapper
