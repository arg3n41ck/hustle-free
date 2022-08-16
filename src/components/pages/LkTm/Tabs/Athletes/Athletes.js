import React, { useEffect, useState } from 'react'
import Teams from './Teams'
import Applications from './Applications'
import HeaderContent, { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import $api from '../../../../../services/axios'
import HorizontalTabsBorder from '../../../../ui/tabs/HorizontalTabsBorder'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

const fetchMyRequests = async () => {
  const { data: requests } = await $api.get(`/teams/athlete_requests/`, {
    params: {
      status: 'in_panding',
    },
  })
  return requests
}
const fetchTeams = async (id) => {
  if (id) {
    const { data } = await $api.get(`/teams/athlete_requests/`, {
      params: {
        team: id,
        status: 'approved',
      },
    })
    return data
  }
}

const Athletes = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.user)
  const [view, setView] = useState('teams') // teams | applicationsD
  const [teams, setTeams] = useState(null)
  const [applications, setApplications] = useState([])
  const { t: tLkTm } = useTranslation('lkTm')

  const tabs = [
    {
      value: 'teams',
      name: `${tLkTm('athletes.tabs.participants')} (${!!teams ? teams.length : 0})`,
    },
    {
      value: 'applications',
      name: `${tLkTm('athletes.tabs.applications')} (${!!applications ? applications.length : 0})`,
    },
  ]

  const viewHandler = (value) => {
    setView(value)
  }

  useEffect(async () => {
    if (user?.id) {
      try {
        setApplications(await fetchMyRequests())
        setTeams(await fetchTeams(user?.teamId))
      } catch (e) {
        throw e
      }
    }
  }, [user])

  const acceptOrRejectHandler = async (id, status = 'approved', athleteId) => {
    try {
      const indexCurrentElement = applications.findIndex((application) => application.id === id)
      setApplications((prev) => [
        ...prev.slice(0, indexCurrentElement),
        ...prev.slice(indexCurrentElement + 1),
      ])
      await $api.put(`/teams/athlete_requests/${id}/`, {
        status,
        athlete: athleteId,
        team: user?.teamId,
      })
      setTeams(await fetchTeams(user?.teamId))
    } catch (e) {}
  }

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>{tLkTm('athletes.athletes')}</TitleHeader>
      </HeaderContent>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={viewHandler}
        height={'96px'}
      >
        {view === 'teams' ? (
          <Teams teams={teams} />
        ) : (
          <Applications onAcceptOrReject={acceptOrRejectHandler} applications={applications} />
        )}
      </HorizontalTabsBorder>
    </>
  )
}

export default Athletes
