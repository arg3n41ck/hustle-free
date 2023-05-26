import DayForm from './DayForm'
import React, { useEffect, useState } from 'react'
import DayWithMats from './DayWithMats'
import { useRouter } from 'next/router'
import MatModal from './MatModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDaysByParams } from '../../../../../../redux/components/daysAndMats'
import { Cancel, EventFormFooter, Submit } from '../EventDefaults'
import { useTranslation } from 'next-i18next'

export default function DaysAndMats() {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')
  const days = useSelector((state) => state.daysAndMats.days)
  const [selectedDay, setSelectedDay] = useState(null)
  const [editDay, setEditDay] = useState(null)
  const [editMat, setEditMat] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDaysByParams({ event: eventId }))
  }, [])

  return (
    <div>
      {!!days.data?.length &&
        days.data?.map((day) => (
          <DayWithMats
            onOpenMatModalByDayId={(day) => setSelectedDay(day)}
            key={day?.id}
            onSelectToEditDay={() => setEditDay(day)}
            onSelectToEditMat={(mat) => {
              setEditMat(mat)
              setSelectedDay(day)
            }}
            day={day}
          />
        ))}
      <DayForm editDay={editDay} onClose={() => setEditDay(null)} />
      <MatModal
        editMat={editMat || null}
        day={selectedDay || null}
        onClose={() => {
          setEditMat(null)
          setSelectedDay(null)
        }}
      />
      <EventFormFooter>
        <Cancel onClick={() => routerPush('/lk-og/profile/events')}>
          {tLkOg('editEvent.cancel')}
        </Cancel>
        <Submit
          type='submit'
          onClick={() => routerPush(`/lk-og/profile/events/edit/${eventId}/contacts`)}
        >
          {tLkOg('editEvent.save')}
        </Submit>
      </EventFormFooter>
    </div>
  )
}
