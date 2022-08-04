import React, { useEffect, useState } from 'react'
import LkDefaultHeader from '../../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../../ui/LKui/HeaderContent'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import EventsTable from './EventsTable'
import $api from '../../../../../../services/axios'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOgEvents, selectOgEvents } from '../../../../../../redux/components/user'

function EventsContent({ onToggleSidebar }) {
  const [, ogEvents] = useSelector(selectOgEvents)
  const {
    user: { user },
  } = useSelector((state) => state)
  const { push: routerPush } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')
  const dispatch = useDispatch()

  useEffect(() => {
    user?.email && dispatch(fetchOgEvents({ organizer: user?.email }))
  }, [user])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>{tLkOg('myEvents.myEvents')}</TitleHeader>
          <CreateEventBTN onClick={() => routerPush('/lk-og/profile/events/edit')}>
            {tLkOg('myEvents.createANewEvent')}
          </CreateEventBTN>
        </HeaderWrapper>
      </LkDefaultHeader>
      <TableWrapper>
        <EventsTable events={ogEvents} />
      </TableWrapper>
    </div>
  )
}

export default EventsContent

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const CreateEventBTN = styled.button`
  padding: 0 20px;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`

const TableWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`
