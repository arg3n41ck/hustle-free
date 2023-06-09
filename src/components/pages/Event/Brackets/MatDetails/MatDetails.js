import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'
import MatDetailHeader from './MatDetailHeader'
import MatBrackets from './MatBrackets'
import styled from 'styled-components'
import BracketFights from './BracketFights'
import { useMediaQuery } from '@mui/material'
import { ScoreboardContext } from '../Scoreboard/context'

const eventMatsClient = new EventMatsClient()

export default function MatDetails() {
  const {
    query: { matId },
  } = useRouter()
  const [matDetails, setMatDetails] = useState(null)
  const [fightsTotal, setFightsTotal] = useState(0)
  const [fightsFinished, setFightsFinished] = useState(0)
  const [selectedBracket, setSelectedBracket] = useState(null)
  const { open } = useContext(ScoreboardContext)
  const [bracketFights, setBracketFights] = useState(null)
  const lg = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (matId) {
      eventMatsClient.getMatDetails(matId).then(({ data }) => {
        setMatDetails(data)
        if (data?.brackets?.length) {
          const fightsCount = data.brackets.reduce(
            (prev, { fightsTotal, fightsFinished }) => {
              prev.fightsTotal = prev.fightsTotal + fightsTotal
              prev.fightsFinished = prev.fightsFinished + fightsFinished
              return prev
            },
            { fightsFinished: 0, fightsTotal: 0 },
          )
          setFightsTotal(fightsCount.fightsTotal)
          setFightsFinished(fightsCount.fightsFinished)
        }
      })
    }
  }, [matId, open])

  useEffect(() => {
    if (selectedBracket) {
      eventMatsClient
        .getMatBracketDetails(selectedBracket)
        .then(({ data }) => setBracketFights(data))
    }
  }, [selectedBracket, open])

  useEffect(() => {
    if (matDetails?.brackets?.length) {
      setSelectedBracket(matDetails.brackets[0]?.id)
    }
  }, [matDetails])

  return (
    <MainWrapper>
      <MatDetailHeader
        name={`${matDetails?.prefix} ${matDetails?.name}`}
        dayStartTime={matDetails?.dayStartTime}
        fightsTotal={fightsTotal}
        fightsFinished={fightsFinished}
      />
      <InnerWrapper>
        <MatBrackets
          brackets={matDetails?.brackets}
          selectedBracket={selectedBracket}
          onSelect={(bracketId) => setSelectedBracket(bracketId)}
          bracketFights={bracketFights}
        />
        {lg && <BracketFights bracketFights={bracketFights} />}
      </InnerWrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    grid-gap: 32px;
  }
`
