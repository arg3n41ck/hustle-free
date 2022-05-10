import React from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Link from "next/link"

//??? Notifications types (нужны для определения типа сслыки в Link)
// ORGANIZER_EVENT_STATUS = 'oes'
// ORGANIZER_EVENT_NEW_PARTICIPANTS = 'oenp'
// ATHLETE_EVENT_STATUS = 'aes'
// ATHLETE_TEAM_STATUS = 'ats'
// TEAM_NEW_PARTICIPANTS = 'tnp'

const NotificationItems = ({ notification }) => {
  const { locale } = useRouter()

  return (
    <>
      <Link
        href={getNotificationLinkType(
          notification.notificationType,
          notification.objId
        )}
        passHref
        target={"_blank"}
      >
        <a>
          <ListItem>
            <Indicator />
            <Text>{notification[locale]}</Text>
          </ListItem>
        </a>
      </Link>
    </>
  )
}

export default NotificationItems

const getNotificationLinkType = (type, id) => {
  switch (type) {
    case "oes":
      return "/lk-og/profile/events"
    case "oenp":
      return id ? `/events/${id}/participants` : "/"
    case "aes":
      return id ? `/events/${id}` : "/"
    case "ats":
      return `/lk-ah/profile/teams`
    case "tnp":
      return `/lk-tm/profile/athletes`
    default:
      return "/"
  }
}

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-gap: 12px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  padding: 16px;
  cursor: pointer;
`

const Indicator = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #6d4eea;
`

const Text = styled.p`
  height: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;

  color: #f2f2f2;
`
