import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { ScoreboardContext } from './context'
import { useRouter } from 'next/router'
import { getBracketsRoundType } from '../bracketsUtils'

export default function ScoreboardMainActions({ winner }) {
  const {
    push: routerPush,
    query: { id: eventId },
  } = useRouter()
  const {
    scoreboard,
    onEnd,
    roundSubmission,
    disableScoring,
    undoScoringAction,
    switchSides,
    onWin,
  } = useContext(ScoreboardContext)

  const category = useMemo(() => {
    if (scoreboard?.fight?.bracket) {
      return `${scoreboard.fight.bracket.categoryName} / ${scoreboard.fight.bracket.level} / ${scoreboard.fight.bracket.fromAge} - ${scoreboard.fight.bracket.toAge} / ${scoreboard.fight.bracket.fromWeight} - ${scoreboard.fight.bracket.toWeight}`
    }
    return 'Выберите категорию'
  }, [scoreboard?.fight?.bracket])

  return (
    <MainWrapper>
      <div>
        <MatDetails>
          <Step className={winner ? 'ambal' : ''}>
            {scoreboard?.fight?.step ? getBracketsRoundType[scoreboard.fight.step] : ''}
          </Step>
          <Match className={winner ? 'ambal' : ''}>
            {scoreboard?.fight?.bracket?.matPrefix} {scoreboard?.fight?.bracket?.matName} • МАТЧ{' '}
            {scoreboard?.fight?.currentFight}/{scoreboard?.fight?.bracket?.getFightsCount}
          </Match>
        </MatDetails>
        <Category className={winner ? 'ambal' : ''}>{category}</Category>
      </div>

      {!winner && (
        <ActionsWrapper>
          <ActionsRow>
            {roundSubmission?.readyToSave ? (
              <SaveSubmission onClick={onWin}>Сохранить</SaveSubmission>
            ) : (
              <>
                <ActionBtn disabled={disableScoring} onClick={undoScoringAction} area='undo'>
                  undo scorint action
                </ActionBtn>
                <ActionBtn area='switch' onClick={switchSides}>
                  switch sides
                </ActionBtn>
                <ActionBtn
                  area='fightorder'
                  onClick={() => routerPush(`/events/${eventId}/brackets/mats/75`)}
                >
                  back to fightorder
                </ActionBtn>
              </>
            )}
          </ActionsRow>
          <ActionsRow>
            {roundSubmission.readyToSave && (
              <ActionBtn
                area='fightorder'
                onClick={() => routerPush(`/events/${eventId}/brackets/mats/75`)}
              >
                back to fightorder
              </ActionBtn>
            )}
            <ActionBtn
              area='bracket'
              onClick={() =>
                scoreboard?.fight?.bracket?.id &&
                routerPush(`/events/${eventId}/brackets/bracket/${scoreboard.fight.bracket.id}`)
              }
            >
              back to bracket
            </ActionBtn>
            <ActionBtn area='end' onClick={onEnd}>
              {roundSubmission.isEnd ? 'back' : 'end game'}
            </ActionBtn>
          </ActionsRow>
        </ActionsWrapper>
      )}
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`

const MatDetails = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`

const Step = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  text-transform: uppercase;
  color: #f2f2f2;
  margin: 0;

  &.ambal {
    font-size: 34px;
    line-height: 150%;
  }
`

const Match = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;

  &.ambal {
    font-size: 24px;
    line-height: 150%;
  }
  text-transform: uppercase;
  color: #bdbdbd;
  margin: 0;
`

const Category = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 24px;
  text-transform: uppercase;
  color: #bdbdbd;
  margin: 0;

  &.ambal {
    font-size: 34px;
    line-height: 150%;
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  background: #141519;
  border: 1px solid #0f0f10;
  border-radius: 12px;
  overflow: hidden;
`

const ActionsRow = styled.div`
  display: flex;
  align-content: center;
`

const ActionBtn = styled.button`
  height: 100%;
  width: 100%;
  min-width: fit-content;

  padding: 12px;
  font-weight: 500;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border: 1px solid #0f0f10;

  color: #f2f2f2;

  &:hover {
    background-color: #0f0f10;
  }
`

const SaveSubmission = styled.button`
  height: 100%;
  width: 100%;
  min-width: fit-content;

  padding: 15px;
  font-weight: 500;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border: 1px solid #0f0f10;

  color: #f2c94c;

  &:hover {
    background-color: #0f0f10;
  }
`
