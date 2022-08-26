import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import $api from '../../../../services/axios'

//??? Notifications types (нужны для определения типа сслыки в Link)
// ORGANIZER_EVENT_STATUS = 'oes'
// ORGANIZER_EVENT_NEW_PARTICIPANTS = 'oenp'
// ATHLETE_EVENT_STATUS = 'aes'
// ATHLETE_TEAM_STATUS = 'ats'
// TEAM_NEW_PARTICIPANTS = 'tnp'

const setChecked = async (id) => {
  await $api.get(`/notifications/${id}/`)
}

const NotificationItems = ({ notification }) => {
  return (
    <>
      <Link
        href={getNotificationLinkType(notification.notificationType, notification.objId)}
        passHref
        target={'_blank'}
      >
        <a onClick={() => setChecked(notification.id)}>
          <ListItem>
            <Indicator />
            <Text>{notification?.text}</Text>
          </ListItem>
        </a>
      </Link>
    </>
  )
}

export default NotificationItems

const getNotificationLinkType = (type, id) => {
  switch (type) {
    case 'organizer_event_status':
      return '/lk-og/profile/events'
    case 'organizer_event_new_participants':
      return id ? `/events/${id}/participants` : '/'
    case 'athlete_event_status':
      return id ? `/events/${id}` : '/'
    case 'athlete_team_status':
      return `/lk-ah/profile/teams`
    case 'team_new_participant':
      return `/lk-tm/profile/athletes`
    default:
      return '/'
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
