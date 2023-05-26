import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'
import MatDetailHeader from './MatDetailHeader'

const eventMatsClient = new EventMatsClient()

export default function MatDetails() {
  const {
    query: { matId },
  } = useRouter()
  const [matDetails, setMatDetails] = useState(null)
  const [fightsTotal, setFightsTotal] = useState(0)
  const [fightsFinished, setFightsFinished] = useState(0)
  const [selectedBracket, setSelectedBracket] = useState(null)

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
          console.log({ fightsCount })
          setFightsTotal(fightsCount.fightsTotal)
          setFightsFinished(fightsCount.fightsFinished)
        }
      })
    }
  }, [matId])

  console.log({ matDetails })

  return (
    <div>
      <MatDetailHeader
        name={`${matDetails?.prefix} ${matDetails?.name}`}
        dayStartTime={matDetails?.dayStartTime}
        fightsTotal={fightsTotal}
        fightsFinished={fightsFinished}
      />
    </div>
  )
}
