import React, { useContext } from 'react'
import styled from 'styled-components'
import { ScoreboardContext } from './context'
import { timerActions } from './const'

export default function ScoreboardTimer({ winner }) {
  const { timerState, handleTimerChange, roundSubmission } = useContext(ScoreboardContext)
  const { remainTimeInSec, isTimerActive } = timerState

  // Converting seconds to minutes:seconds format
  const minutes = Math.floor(remainTimeInSec / 60)
  const seconds = remainTimeInSec - minutes * 60

  return (
    <MainWrapper className={`${winner ? 'winner' : ''}`}>
      <Time className={`${winner ? 'winner' : roundSubmission.isEnd ? 'disabled' : ''}`}>
        {remainTimeInSec > 0
          ? `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          : '00:00'}
      </Time>
      {!roundSubmission.isEnd && (
        <ActionsWrapper>
          {timerActions(isTimerActive).map(({ actionType, component }) => (
            <ActionBtn key={actionType} onClick={() => handleTimerChange(actionType)}>
              {component}
            </ActionBtn>
          ))}
        </ActionsWrapper>
      )}
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  display: grid;
  grid-auto-flow: auto 72px / 1fr;

  background: linear-gradient(0deg, rgba(27, 28, 34, 0.5), rgba(27, 28, 34, 0.5)), #0f0f10;
  border-radius: 12px;

  &.winner {
    background: none;
  }
`

const Time = styled.p`
  min-width: 456px;
  font-family: 'Roboto Condensed';
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 100px;
  line-height: 100%;
  text-transform: uppercase;
  color: #e0e0e0;
  padding: 16px;

  &.disabled {
    min-height: 212px;
    color: #333;
    font-size: 150px;
  }

  &.winner {
    font-size: 150px;
    color: #f2c94c;
  }
`

const ActionsWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 8px;
  padding: 12px 8px;
  background: #000;
`

const ActionBtn = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;

  &:hover {
    & svg path {
      color: #6d4eea;
      stroke: #6d4eea;
    }

    & svg.main path {
      fill: #6d4eea;
    }
  }
`
