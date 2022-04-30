import React, { useEffect, useState } from "react"
import Teams from "./Teams"
import Applications from "./Applications"
import HeaderContent, { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import $api from "../../../../../services/axios"
import HorizontalTabsBorder from "../../../../ui/tabs/HorizontalTabsBorder"
import { useSelector } from "react-redux"

const fetchMyRequests = async () => {
  const { data: requests } = await $api.get(`/teams/teams/my_requests/`, {
    params: {
      status: "in_panding",
    },
  })
  return requests
}
const fetchTeams = async (id) => {
  if (id) {
    const { data } = await $api.get(`/teams/team_athlete/`, {
      params: {
        team_id: id,
      },
    })
    return data
  }
}

const Athletes = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.user)
  const [view, setView] = useState("teams") // teams | applications
  const [teams, setTeams] = useState(null)
  const [applications, setApplications] = useState([])

  const tabs = [
    {
      value: "teams",
      name: `Участники (${!!teams ? teams.results.length : 0})`,
    },
    {
      value: "applications",
      name: `Заявки (${!!applications ? applications.length : 0})`,
    },
  ]

  const viewHandler = (value) => {
    setView(value)
  }

  useEffect(async () => {
    if (user?.id) {
      try {
        setApplications(await fetchMyRequests())
        setTeams(await fetchTeams(user?.id))
      } catch (e) {
        throw e
      }
    }
  }, [user])

  const acceptOrRejectHandler = async (id, status = "approved") => {
    try {
      const indexCurrentElement = applications.findIndex(
        (application) => application.id === id
      )
      setApplications((prev) => [
        ...prev.slice(0, indexCurrentElement),
        ...prev.slice(indexCurrentElement + 1),
      ])
      await $api.put(`/teams/change_request/${id}/`, { status })
      setTeams(await fetchTeams(user?.id))
    } catch (e) {}
  }

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>Атлеты</TitleHeader>
      </HeaderContent>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={viewHandler}
        height={"96px"}
      >
        {view === "teams" ? (
          <Teams teams={teams} />
        ) : (
          <Applications
            onAcceptOrReject={acceptOrRejectHandler}
            applications={applications}
          />
        )}
      </HorizontalTabsBorder>
    </>
  )
}

export default Athletes
