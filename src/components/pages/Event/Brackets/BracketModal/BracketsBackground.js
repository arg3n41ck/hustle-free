import React, { useMemo } from 'react'
import styled from 'styled-components'

export default function BracketsBackground({ steps }) {
  const arrayFromSteps = useMemo(() => {
    const array = []
    for (let step = 0; step < steps; step++) {
      array.push(step + 1)
    }
    return array
  }, [steps])
  return (
    <BgWrapper steps={steps}>
      {!!arrayFromSteps?.length &&
        arrayFromSteps.map((step) => <BgCol key={`steps_bg_col_${step}`} />)}
    </BgWrapper>
  )
}

const BgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template: 1fr / repeat(${({ steps }) => steps}, 340px);
`

const BgCol = styled.div`
  width: 100%;
  height: 100%;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`
