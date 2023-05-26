import React, { useMemo } from 'react'
import { getFormattedStartTime } from '../bracketsUtils'
import styled from 'styled-components'

export default function BracketRow({ bracket }) {
  const fightsFinished = +bracket?.fightsFinished || 0
  const fightsTotal = +bracket?.fightsTotal || 0
  const category = useMemo(() => {
    return `${bracket?.categoryName} / ${bracket?.level} / ${bracket?.fromAge} - ${bracket?.toAge} / ${bracket?.fromWeight} - ${bracket?.toWeight}`
  }, [bracket])

  return (
    <BracketWrapper>
      <BracketCategory fillPercent={(100 * fightsFinished) / fightsTotal}>
        {category}
      </BracketCategory>
      <Col>{`${fightsFinished} / ${fightsTotal}`}</Col>
      <Col>{bracket?.eta ? getFormattedStartTime(bracket?.eta) : '--:--'}</Col>
    </BracketWrapper>
  )
}

const BracketWrapper = styled.div`
  width: 100%;
  padding: 28px 0;
`

const BracketCategory = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
