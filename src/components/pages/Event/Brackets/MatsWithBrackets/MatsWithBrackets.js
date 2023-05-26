import React, { useMemo } from 'react'
import styled from 'styled-components'
import Bracket from './Bracket'
import { getFormattedStartTime } from '../bracketsUtils'
import { useDrop } from 'react-dnd'
import MatsWrapper from '../MatsWrapper'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'

const eventMatsClient = new EventMatsClient()

export default function MatsWithBrackets({ refreshMatList, matWithBrackets, editingMatActive }) {
  const dayStartTime = useMemo(
    () => matWithBrackets?.dayStartTime && getFormattedStartTime(matWithBrackets?.dayStartTime),
    [matWithBrackets],
  )

  const allFightsTotal = useMemo(() => {
    if (matWithBrackets?.brackets?.length) {
      return matWithBrackets.brackets.reduce((prev, cur) => {
        if (cur?.fightsTotal) {
          prev = prev + cur.fightsTotal
        }
        return prev
      }, 0)
    }
    return 0
  }, [matWithBrackets])

  const [{ isOver }, drop] = useDrop({
    accept: `MATS_BRACKET`,
    drop: async ({ bracket }) => {
      if (bracket && matWithBrackets?.id) {
        const changingBody = {
          dragBracketId: bracket?.id,
          matId: matWithBrackets.id,
        }
        await eventMatsClient.changeBracketOrderMat(changingBody).then(async () => {
          await refreshMatList()
        })
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  })

  return (
    <MatsWrapper
      matId={matWithBrackets?.id}
      matName={`${matWithBrackets?.prefix} - ${matWithBrackets?.name}`}
      allFightsTotal={allFightsTotal}
      dayStartTime={dayStartTime}
    >
      <>
        <ContentHead>
          <p>Категории</p>
          <p>cхватка</p>
          <p>eta</p>
        </ContentHead>

        <Brackets>
          {!!matWithBrackets?.brackets?.length ? (
            matWithBrackets.brackets.map((bracket) => {
              return (
                <Bracket
                  key={bracket.id}
                  matId={matWithBrackets?.id}
                  bracket={bracket}
                  editingMatActive={editingMatActive}
                  refreshMatList={refreshMatList}
                />
              )
            })
          ) : (
            <EmptyText isOver={isOver} ref={drop} className='empty'>
              Нет сетки
            </EmptyText>
          )}
        </Brackets>
      </>
    </MatsWrapper>
  )
}

export const DNDIconWrapper = styled.button`
  align-self: center;
  justify-self: center;
  padding: 16px 0 16px 16px;
`

const EmptyText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f2f2f2;
  font-weight: 600;

  border: 1px solid ${({ isOver }) => (isOver ? '#6d4eea' : 'transparent')};
`

const ContentHead = styled.div`
  display: grid;
  grid-template: 1fr / auto 88px 80px;
  border-bottom: 1px solid #1b1c22;

  & > p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 16px;
    color: #bdbdbd;
    border-right: 1px solid #1b1c22;

    &:last-child {
      border-right: none;
    }
  }
`

const Brackets = styled.div`
  min-height: 80px;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;

  border: 1px solid ${({ isOver }) => (isOver ? '#6d4eea' : 'transparent')};
`
