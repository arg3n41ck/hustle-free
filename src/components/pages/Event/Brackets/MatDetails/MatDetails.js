import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'
import MatDetailHeader from './MatDetailHeader'
import MatBrackets from './MatBrackets'
import styled from 'styled-components'
import BracketFights from './BracketFights'

const eventMatsClient = new EventMatsClient()

export default function MatDetails() {
  const {
    query: { matId },
  } = useRouter()
  const [matDetails, setMatDetails] = useState(null)
  const [fightsTotal, setFightsTotal] = useState(0)
  const [fightsFinished, setFightsFinished] = useState(0)
  const [selectedBracket, setSelectedBracket] = useState(null)
  const [bracketFights, setBracketFights] = useState(null)

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
  }, [matId])

  useEffect(() => {
    if (selectedBracket) {
      eventMatsClient
        .getMatBracketDetails(selectedBracket)
        .then(({ data }) => setBracketFights(data?.fights))
    }
  }, [selectedBracket])

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
        />
        <BracketFights
          bracket={matDetails?.brackets.find((br) => br?.id == selectedBracket)}
          bracketFights={bracketFights}
        />
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
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 32px;
`
