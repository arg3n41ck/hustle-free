import React from 'react'
import MatsWrapper from '../MatsWrapper'
import { getFormattedStartTime } from '../bracketsUtils'
import MatFight from '../MatFight'

export default function MatsWithFightings({ matWithFightings }) {
  return (
    <MatsWrapper
      matId={matWithFightings?.id}
      matName={`${matWithFightings?.prefix} - ${matWithFightings?.name}`}
      allFightsTotal={matWithFightings?.fights?.length}
      dayStartTime={
        matWithFightings?.dayStartTime && getFormattedStartTime(matWithFightings?.dayStartTime)
      }
    >
      {!!matWithFightings?.fights?.length &&
        matWithFightings.fights.map((fight) => (
          <MatFight key={fight?.id} bracketId={fight?.bracket?.id} fight={fight} />
        ))}
    </MatsWrapper>
  )
}
