import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NotificationModal from './NotificationModal'
import $api from '../../../../services/axios'
import { useInterval } from '../../../../hooks/useInterval'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const getNotifications = async (params) => {
  try {
    const { data } = await $api.get('/notifications/', { params })
    return data?.length ? data.filter(({ checked }) => !checked) : []
  } catch ({ response }) {
    console.log(response)
  }
}

const Notifications = () => {
  const [anchorNotifications, setAnchorNotifications] = useState(null)
  const [notifications, setNotifications] = useState(null)
  const {
    user: { user },
  } = useSelector((state) => state)
  const route = useRouter()

  useInterval(async () => {
    user && getNotifications({ recipient: user?.id }).then(setNotifications)
  }, 630000)

  useEffect(() => {
    user && getNotifications({ recipient: user?.id }).then(setNotifications)
  }, [route, user])

  return (
    <NotificationWrapper>
      <BellIcon onClick={(e) => setAnchorNotifications(e.currentTarget)} />
      <NotificationModal
        anchorNotifications={anchorNotifications}
        setAnchorNotifications={setAnchorNotifications}
        notifications={notifications}
      />
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    min-width: 32px;
    min-height: 32px;
  }
`

export default Notifications

export const BellIcon = ({ onClick }) => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8.66993 9.30021C9.04652 5.53439 12.2154 2.66663 16 2.66663V2.66663C19.7846 2.66663 22.9534 5.5344 23.33 9.30021L23.7121 13.1217C23.8011 14.0111 23.8455 14.4558 23.9375 14.8873C24.0865 15.5872 24.3288 16.2639 24.6579 16.8994C24.8608 17.2912 25.1087 17.6631 25.6045 18.4067L27.2604 20.8906C28.1729 22.2593 28.6291 22.9437 28.3465 23.4718C28.0638 24 27.2413 24 25.5963 24H6.40366C4.75863 24 3.93612 24 3.65347 23.4718C3.37082 22.9437 3.82706 22.2593 4.73956 20.8906L6.39544 18.4067C6.89123 17.6631 7.13913 17.2912 7.34201 16.8994C7.67107 16.2639 7.91339 15.5872 8.06246 14.8873C8.15438 14.4558 8.19885 14.0111 8.28778 13.1217L8.66993 9.30021Z'
      fill='#828282'
    />
    <path
      d='M13.4242 27.5059C13.5761 27.6476 13.9109 27.7729 14.3766 27.8622C14.8423 27.9516 15.4129 28 16 28C16.587 28 17.1576 27.9516 17.6233 27.8622C18.089 27.7729 18.4238 27.6476 18.5758 27.5059'
      stroke='#828282'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
)
