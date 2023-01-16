import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import useQuery from '../../../../hooks/useQuery'
import { fetchCountries } from '../../../../redux/components/countriesAndCities'
import {
  fetchBracketsByParams,
  fetchBracketsFightsByParams,
  fetchParticipantAthletes,
  setSelectedBracket,
  clearBF,
} from '../../../../redux/components/eventBrackets'
import { fetchParticipantCategories } from '../../../../redux/components/participantsCategories'
import { getEnabledLevels } from '../Categories/EventCategories'
import Filters from '../Participants/Filters'
import BracketModal from './BracketModal/BracketModal'
import BracketPCDropdown from './BracketPCDropdown'

function EventBrackets() {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const query = useQuery()

  const { data: eventParticipants } = useSelector(
    (state) => state.participantCategories.participantCategories,
  )
  const {
    brackets: { data: brackets },
    bracket,
  } = useSelector((state) => state.brackets)

  const [levels, setLevels] = useState([])
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(fetchParticipantCategories(query))
  }, [query])

  useEffect(() => {
    dispatch(fetchBracketsByParams(query))
    dispatch(fetchCountries())
  }, [eventId])

  useEffect(() => {
    setLevels(getEnabledLevels(eventParticipants))
  }, [eventParticipants])

  useEffect(() => {
    query.set('event', eventId)
  }, [eventId])

  useEffect(() => {
    if (bracket?.id) {
      dispatch(fetchBracketsFightsByParams({ bracket: bracket?.id, type: bracket?.bracketType }))
      dispatch(
        fetchParticipantAthletes({
          participation_category: bracket?.participationCategory,
        }),
      )
    }
  }, [bracket])

  const filterHandler = ({ target: { name, value } }) => {
    if (!!value) {
      query.set(name, value)
    } else {
      name && query.delete(name)
    }
    routerPush(`/events/${eventId}/brackets/?${query}`)
  }

  const bracketsPC = useMemo(() => {
    return (
      brackets?.length &&
      eventParticipants?.length &&
      brackets.map((bracket) => {
        const bracketPC = eventParticipants.find(({ id }) => id === bracket.participationCategory)
        return {
          ...bracket,
          participationCategory: bracketPC,
        }
      })
    )
  }, [brackets, eventParticipants])

  return (
    <MainWrapper style={{ minHeight: !!bracketsPC?.length ? '100vh' : 'unset' }}>
      <Filters levels={levels} onFilter={filterHandler} />
      <AnimatePresence>
        {!!bracket?.id && (
          <BracketsWrapper
            initial={{ height: 0 }}
            animate={{
              height: 'unset',
              transition: { delay: 0.5, duration: 0.4 },
            }}
            exit={{
              height: 0,
              transition: { delay: 0.4, duration: 0.5 },
            }}
          >
            <BracketModal
              selectedBracket={bracket}
              onClose={() => {
                dispatch(clearBF())
                dispatch(setSelectedBracket(null))
              }}
            />
          </BracketsWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!bracketsPC?.length && !bracket && (
          <BracketsWrapper
            initial={{ height: 0 }}
            animate={{
              height: 'unset',
              transition: { delay: 0.2, duration: 0.3 },
            }}
            exit={{
              height: 0,
              transition: { delay: 0.4, duration: 0.5 },
            }}
          >
            <PCWrapper>
              {bracketsPC
                .filter(({ participationCategory }) => participationCategory)
                .map((bracket) => (
                  <BracketPCDropdown
                    key={`bracket_${bracket.id}`}
                    bracket={bracket}
                    onSelectBracket={(value) => dispatch(setSelectedBracket(value))}
                  />
                ))}
            </PCWrapper>
          </BracketsWrapper>
        )}
      </AnimatePresence>
    </MainWrapper>
  )
}

export default EventBrackets

const MainWrapper = styled.div`
  position: relative;
`

const BracketsWrapper = styled(motion.div)`
  top: 0;
  z-index: 12;

  overflow-y: auto;
  overflow-x: hidden;
`

const PCWrapper = styled.div``
