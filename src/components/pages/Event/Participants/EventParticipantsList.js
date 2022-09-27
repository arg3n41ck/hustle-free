import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import EventParticipantsItem from './EventParticipantsItem'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { Checkbox } from '@mui/material'
import EPHeader from './EPHeader'
import EPForm from './EPForm/EPForm'

const EventParticipantsList = ({ eventParticipants, isAthletes }) => {
  const { user } = useSelector((state) => state.user)
  const [showEPHeader, setShowEPHeader] = useState(null)
  const [openEPForm, setOpenEPForm] = useState(false)
  const [selectedEPC, setSelectedEPC] = useState([])
  const EPEndBlock = useRef(null)
  const { t: tEventDetail } = useTranslation('eventDetail')

  const selectedEPCDetailed = useMemo(() => {
    if (selectedEPC?.length && eventParticipants?.length) {
      return eventParticipants
        .filter(({ id }) => !!selectedEPC.includes(id))
        .map(({ id, eventParticipantsCategory, level }) => ({
          id,
          title: `${eventParticipantsCategory.name} / ${level?.name} / ${eventParticipantsCategory.fromAge} -
        ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`,
        }))
    }
    return []
  }, [selectedEPC])

  const handleOnSelectedAll = useCallback(() => {
    const ePIds = !!eventParticipants?.length ? eventParticipants.map(({ id }) => id) : []
    setSelectedEPC(ePIds)
  }, [selectedEPC, eventParticipants])

  useEffect(() => {
    document.querySelector('html').style.overflowY = openEPForm ? 'hidden' : ''
  }, [openEPForm])

  useEffect(() => {
    if (EPEndBlock) {
      window.addEventListener('scroll', () => {
        setShowEPHeader(window.scrollY + window.innerHeight >= EPEndBlock?.current?.offsetTop)
      })
    }
    return () => {
      if (EPEndBlock) {
        window.addEventListener('srcoll', () => {
          setShowEPHeader(window.scrollY + window.innerHeight >= EPEndBlock?.current?.offsetTop)
        })
      }
    }
  }, [EPEndBlock])

  return (
    <>
      {user?.role !== 'organizer' && (
        <Title>
          {isAthletes
            ? tEventDetail('event.participants.eventParticipantsList.categoriesBasedProfile')
            : tEventDetail('event.participants.eventParticipantsList.otherCategories')}
        </Title>
      )}
      <ChekboxWrapper>
        <Checkbox
          checked={(eventParticipants?.length || 0) == (selectedEPC?.length || 0)}
          onChange={({ target: { checked } }) =>
            checked ? handleOnSelectedAll() : setSelectedEPC([])
          }
        />
        <p>Выбрать всех</p>
      </ChekboxWrapper>
      {eventParticipants.map((eventParticipant) => (
        <EventParticipantsItem
          key={eventParticipant.id}
          isAthletes={isAthletes}
          isOrganizer={user?.role === 'organizer'}
          eventParticipant={eventParticipant}
          selectedEPC={selectedEPC}
          setSelectedEPC={setSelectedEPC}
        />
      ))}

      <EPHeader
        open={showEPHeader && !openEPForm}
        checked={(eventParticipants?.length || 0) == (selectedEPC?.length || 0)}
        onChange={({ target: { checked } }) =>
          checked ? handleOnSelectedAll() : setSelectedEPC([])
        }
        setOpenEPForm={setOpenEPForm}
      />
      <EPForm
        open={openEPForm}
        selectedEPCDetailed={selectedEPCDetailed}
        selectedEPC={selectedEPC}
        onClose={() => setOpenEPForm(false)}
      />
      <div ref={EPEndBlock} />
    </>
  )
}

const Title = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin: 47px 0 32px 0;
`

const ChekboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 16px;

  & .MuiCheckbox-root {
    padding: 0 !important;
  }
  p {
    font-weight: 600;
    font-size: 20px;
    color: #f2f2f2;
  }
`

export default EventParticipantsList
