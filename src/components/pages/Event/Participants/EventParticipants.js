import React, { useEffect, useState } from "react"
import Filters from "./Filters"
import EventParticipantsList from "./EventParticipantsList"
import $api from "../../../../services/axios"
import useDebounce from "../../../../hooks/useDebounce"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useTranslation } from "next-i18next"

const getEventParticipants = async (url, query) => {
  const { data } = await $api.get(url, { params: query })
  return data?.length ? data : []
}

const EventParticipants = () => {
  const { t: tEventDetail } = useTranslation("eventDetail")
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventParticipants, setEventParticipants] = useState([])
  const [athletePCState, setAthletePCState] = useState([])
  const [levels, setLevels] = useState([])
  const { user } = useSelector((state) => state.user)
  const [filter, setFilter] = useState({
    search: "",
    level: "",
    gender: "",
    weight: {},
    countryId: "",
    teamId: "",
  })
  const searchValue = useDebounce(filter.search, 500)
  const levelValue = useDebounce(filter.level, 500)
  const genderValue = useDebounce(filter.gender, 500)
  const weightValue = useDebounce(filter.weight, 500)
  const countryValue = useDebounce(filter.countryId, 500)
  const teamValue = useDebounce(filter.teamId, 500)

  const filterHandler = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(async () => {
    const { data: levelsData } = await $api.get(`/directory/discipline_level/`)
    const params = {
      event_id: eventId,
      search: searchValue,
      level: levelValue,
      gender:
        (genderValue ===
          tEventDetail("event.participants.eventParticipants.male") &&
          "male") ||
        (genderValue ===
          tEventDetail("event.participants.eventParticipants.female") &&
          "female") ||
        "",
      "category-tab": false,
      event_participants_category__from_weight: weightValue?.fromWeight || "",
      event_participants_category__to_weight: weightValue?.toWeight || "",
      country_id: countryValue,
      team_id: teamValue,
    }
    const othersPC = await getEventParticipants(
      `/events/participant_category/`,
      params
    )
    const athletePC = await getEventParticipants(
      `events/events/${eventId}/athlete_categories/`,
      {}
    )
    setLevels(levelsData)
    setEventParticipants(othersPC)
    user?.role === "athlete" && setAthletePCState(athletePC)
  }, [
    searchValue,
    levelValue,
    genderValue,
    weightValue,
    countryValue,
    teamValue,
  ])
  console.log({ athletePCState, eventParticipants })
  return (
    <>
      <Filters levels={levels} onFilter={filterHandler} />
      {!!athletePCState.length && (
        <EventParticipantsList eventParticipants={athletePCState} isAthletes />
      )}
      <EventParticipantsList eventParticipants={eventParticipants} />
    </>
  )
}

export default EventParticipants
