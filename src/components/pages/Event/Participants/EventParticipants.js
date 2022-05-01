import React, { useEffect, useState } from "react"
import Filters from "./Filters"
import EventParticipantsList from "./EventParticipantsList"
import $api from "../../../../services/axios"
import useDebounce from "../../../../hooks/useDebounce"

const EventParticipants = () => {
  const [eventParticipants, setEventParticipants] = useState([])
  const [levels, setLevels] = useState([])
  const [filter, setFilter] = useState({
    search: "",
    level: "",
    gender: "",
    weight: "",
    countryId: "",
  })
  const searchValue = useDebounce(filter.search, 500)
  const levelValue = useDebounce(filter.level, 500)
  const genderValue = useDebounce(filter.gender, 500)
  const weightValue = useDebounce(filter.weight, 500)
  const countryValue = useDebounce(filter.countryId, 500)

  const filterHandler = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  ;``
  useEffect(async () => {
    const { data: levelsData } = await $api.get(`/directory/discipline_level/`)
    const { data } = await $api.get(`/events/participant_category/`, {
      params: {
        search: searchValue,
        level: levelValue,
        gender:
          (genderValue === "Мужчина" && "male") ||
          (genderValue === "Женщина" && "female") ||
          "",
        weight: weightValue,
        country_id: countryValue,
      },
    })
    setLevels(levelsData)
    setEventParticipants(data)
  }, [searchValue, levelValue, genderValue, weightValue, countryValue])

  return (
    <>
      <Filters levels={levels} filter={filter} onFilter={filterHandler} />
      <EventParticipantsList eventParticipants={eventParticipants} />
    </>
  )
}

export default EventParticipants
