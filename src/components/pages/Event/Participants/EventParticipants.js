import React, { useEffect, useState } from "react"
import Filters from "./Filters"
import EventParticipantsList from "./EventParticipantsList"
import $api from "../../../../services/axios"
import useDebounce from "../../../../hooks/useDebounce"
import { useRouter } from "next/router"

const EventParticipants = () => {
  const router = useRouter()
  const [eventParticipants, setEventParticipants] = useState([])
  const [levels, setLevels] = useState([])
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
    const { data } = await $api.get(`/events/participant_category/`, {
      params: {
        event_id: router.query.id,
        search: searchValue,
        level: levelValue,
        gender:
          (genderValue === "Мужчина" && "male") ||
          (genderValue === "Женщина" && "female") ||
          "",
        event_participants_category__from_weight: weightValue?.fromWeight || "",
        event_participants_category__to_weight: weightValue?.fromTo || "",
        country_id: countryValue,
        team_id: teamValue,
      },
    })
    setLevels(levelsData)
    setEventParticipants(data)
  }, [
    searchValue,
    levelValue,
    genderValue,
    weightValue,
    countryValue,
    teamValue,
  ])

  return (
    <>
      <Filters levels={levels} onFilter={filterHandler} />
      <EventParticipantsList eventParticipants={eventParticipants} />
    </>
  )
}

export default EventParticipants
