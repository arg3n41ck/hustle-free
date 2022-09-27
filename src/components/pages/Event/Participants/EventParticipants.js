import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import EventParticipantsList from './EventParticipantsList'
import $api from '../../../../services/axios'
import useDebounce from '../../../../hooks/useDebounce'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getEnabledLevels } from '../Categories/EventCategories'

const getEventParticipants = async (url, query) => {
  const { data } = await $api.get(url, { params: query })
  return data?.length ? data : []
}

const EventParticipants = () => {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventParticipants, setEventParticipants] = useState([])
  const [levels, setLevels] = useState([])
  const { user } = useSelector((state) => state.user)
  const [filter, setFilter] = useState({
    search: '',
    level: '',
    gender: '',
    weight: {},
    countryId: '',
    teamId: '',
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
    const params = {
      search: searchValue,
      event: eventId,
      level: levelValue,
      gender:
        (genderValue === tEventDetail('event.participants.eventParticipants.male') && 'male') ||
        (genderValue === tEventDetail('event.participants.eventParticipants.female') && 'female') ||
        '',
      event_participants_category__from_weight: weightValue?.fromWeight || '',
      event_participants_category__to_weight: weightValue?.toWeight || '',
      country: countryValue,
      team: teamValue,
    }
    const othersPC = await getEventParticipants(`/directories/participant_category/`, params)
    othersPC?.length && setLevels(getEnabledLevels(othersPC))
    setEventParticipants(othersPC)
  }, [user, searchValue, levelValue, genderValue, weightValue, countryValue, teamValue])
  return (
    <>
      <Filters levels={levels} onFilter={filterHandler} />
      <EventParticipantsList
        eventParticipants={eventParticipants}
        isAthletes={!!user?.role === 'athlete'}
      />
      {/* <EventParticipantsList eventParticipants={eventParticipants} />/ */}
    </>
  )
}

export default EventParticipants
