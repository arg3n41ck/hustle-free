import { PlayArrow } from '@mui/icons-material'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { getBracketsRoundType } from '../bracketsUtils'
import { ScoreboardContext } from '../Scoreboard/context'

export default function ScoreTooltip({
  fightStartTime,
  fightsStep,
  fightNumber,
  matPrefix,
  scoreboard,
  fightId,
}) {
  const { open, onOpen } = useContext(ScoreboardContext)
  const [hours, minutes] = useMemo(() => {
    if (fightStartTime) {
      const [hours, minutes, _] = fightStartTime.split(':')
      return [hours, minutes]
    }
    return [null, null]
  }, [fightStartTime])

  return (
    <OutterWrapper className='scoreboard-tooltip'>
      <Polygon />
      <ContentWrapper>
        <BFIndicator>
          {matPrefix || ''}-{fightNumber || ''}
        </BFIndicator>
        <Step>{getBracketsRoundType[fightsStep]}</Step>
        <Time>
          {hours || '00'}:{minutes || '00'}
        </Time>
        <GoToScoreBtn onClick={() => !open && onOpen(scoreboard, fightId)}>
          <PlayArrow color='#fff' />
          scoreboard
        </GoToScoreBtn>
      </ContentWrapper>
    </OutterWrapper>
  )
}

const OutterWrapper = styled.div`
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  align-items: center;
  z-index: 1;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
  padding: 5px;
  border-radius: 8px;
  background: #333;
`

const BFIndicator = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  color: #f2f2f2;
`

const Step = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin: 0 0 10px;
  color: #f2f2f2;
`

const Time = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #bdbdbd;
`

const GoToScoreBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  background: #6d4eea;
`

const Polygon = () => (
  <svg width='9' height='14' viewBox='0 0 9 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M2.13333 8.6C1.06667 7.8 1.06667 6.2 2.13333 5.4L8 1V13L2.13333 8.6Z' fill='#333333' />
    <path
      d='M2.13333 8.6C1.06667 7.8 1.06667 6.2 2.13333 5.4L8 1V13L2.13333 8.6Z'
      stroke='#333333'
    />
  </svg>
)
