import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useQuery from '../../../../hooks/useQuery'
import { fetchBracketsByParams } from '../../../../redux/components/eventBrackets'
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
  const pcQuery = useQuery()
  const bracketsQuery = useQuery()
  const [selectedBracket, setSelectedBracket] = useState(null)

  const { data: eventParticipants } = useSelector(
    (state) => state.participantCategories.participantCategories,
  )
  const { data: brackets } = useSelector((state) => state.brackets.brackets)

  const [levels, setLevels] = useState([])
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(fetchParticipantCategories(pcQuery))
  }, [pcQuery])

  useEffect(() => {
    dispatch(fetchBracketsByParams(bracketsQuery))
  }, [eventId])

  useEffect(() => {
    setLevels(getEnabledLevels(eventParticipants))
  }, [eventParticipants])

  useEffect(() => {
    pcQuery.set('event', eventId)
    bracketsQuery.set('event', eventId)
  }, [eventId])

  const filterHandler = ({ target: { name, value } }) => {
    if (!!value) {
      pcQuery.set(name, value)
    } else {
      name && pcQuery.delete(name)
    }
    routerPush(`/events/${eventId}/brackets/?${pcQuery}`)
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
    <div>
      <Filters levels={levels} onFilter={filterHandler} />

      {bracketsPC?.length &&
        bracketsPC
          .filter(({ participationCategory }) => participationCategory)
          .map((bracket) => (
            <BracketPCDropdown
              key={`bracket_${bracket.id}`}
              bracket={bracket}
              setSelectedBracket={setSelectedBracket}
            />
          ))}

      <BracketModal selectedBracket={selectedBracket} onClose={() => setSelectedBracket(null)} />
    </div>
  )
}

export default EventBrackets
