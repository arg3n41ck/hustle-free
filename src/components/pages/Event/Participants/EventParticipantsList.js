import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import EventParticipantsItem from './EventParticipantsItem'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { Checkbox } from '@mui/material'
import EPHeader from './EPHeader'
import EPForm from './EPForm/EPForm'
import { selectOgEvents } from '../../../../redux/components/user'
import { useRouter } from 'next/router'
import { fetchBracketsByParams, selectBrackets } from '../../../../redux/components/eventBrackets'

const EventParticipantsList = ({ eventParticipants, isAthletes }) => {
  const { user } = useSelector((state) => state.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const {
    query: { id: eventId },
  } = useRouter()
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)
  const [showEPHeader, setShowEPHeader] = useState(null)
  const [brackets] = useSelector(selectBrackets)
  const [openEPForm, setOpenEPForm] = useState(false)
  const [selectedEPC, setSelectedEPC] = useState([])
  const EPBlock = useRef(null)
  const { t: tEventDetail } = useTranslation('eventDetail')
  const dispatch = useDispatch()

  const enabledToCreateBracketPC = useMemo(() => {
    const bracketsIDs = brackets.data?.length
      ? brackets.data.map(({ participationCategory }) => +participationCategory)
      : []
    return eventParticipants?.length
      ? eventParticipants.filter(({ id }) => !bracketsIDs.includes(+id)).map(({ id }) => id)
      : []
  }, [brackets, eventParticipants])

  useEffect(() => {
    dispatch(fetchBracketsByParams({ event: eventId }))
  }, [eventId])

  const selectedEPCDetailed = useMemo(() => {
    if (selectedEPC?.length && eventParticipants?.length) {
      return eventParticipants
        .filter(({ id }) => !!selectedEPC.includes(id))
        .map(({ id, eventParticipantsCategory, level, participants }) => ({
          id,
          title: `${eventParticipantsCategory.name} / ${level?.name} / ${eventParticipantsCategory.fromAge} -
        ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`,
          participantsCount: participants?.length || 0,
        }))
    } else if (!selectedEPC?.length) {
      return []
    }
    return []
  }, [selectedEPC])

  const handleOnSelectedAll = useCallback(() => {
    setSelectedEPC(enabledToCreateBracketPC)
  }, [enabledToCreateBracketPC])

  useEffect(() => {
    document.querySelector('html').style.overflowY = openEPForm ? 'hidden' : ''
  }, [openEPForm])

  useEffect(() => {
    if (EPBlock) {
      window.addEventListener('scroll', () => {
        setShowEPHeader(window.scrollY >= EPBlock?.current?.offsetTop)
      })
    }
    return () => {
      if (EPBlock) {
        window.addEventListener('srcoll', () => {
          setShowEPHeader(window.scrollY >= EPBlock?.current?.offsetTop)
        })
      }
    }
  }, [EPBlock])

  return (
    <>
      {isAthletes && (
        <Title>
          {tEventDetail('event.participants.eventParticipantsList.categoriesBasedProfile')}
        </Title>
      )}
      {!!ogAndIsMyEvent && (
        <ChekboxWrapper>
          <Checkbox
            checked={(enabledToCreateBracketPC?.length || 0) == (selectedEPC?.length || 0)}
            onChange={({ target: { checked } }) =>
              checked ? handleOnSelectedAll() : setSelectedEPC([])
            }
          />
          <p>Выбрать всех</p>
        </ChekboxWrapper>
      )}
      <div ref={EPBlock} />
      {eventParticipants.map((eventParticipant) => (
        <EventParticipantsItem
          key={eventParticipant.id}
          isOrganizer={!!ogAndIsMyEvent}
          eventParticipant={eventParticipant}
          selectedEPC={selectedEPC}
          enabledToCreateBracketPC={enabledToCreateBracketPC}
          setSelectedEPC={setSelectedEPC}
        />
      ))}

      {!!ogAndIsMyEvent && (
        <>
          <EPHeader
            open={showEPHeader && !openEPForm && selectedEPCDetailed?.length}
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
            onClose={() => {
              setOpenEPForm(false)
              setSelectedEPC([])
            }}
          />
        </>
      )}
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
