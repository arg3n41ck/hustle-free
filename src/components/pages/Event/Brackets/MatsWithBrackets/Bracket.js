import React, { useRef } from 'react'
import { DNDIconWrapper } from './MatsWithBrackets'
import { DNDIcon } from '../../../../../assets/svg/icons'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { getFormattedStartTime } from '../bracketsUtils'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'

const eventMatsClient = new EventMatsClient()

export default function Bracket({ refreshMatList, matId, bracket, editingMatActive }) {
  const {
    id: bracketId,
    categoryName,
    level,
    fromAge,
    toAge,
    fromWeight,
    toWeight,
    fightsTotal,
    fightsFinished,
    eta,
  } = bracket
  const dragNDropRef = useRef()
  const [{ isOver }, drop] = useDrop({
    accept: `MATS_BRACKET`,
    drop: async (item) => {
      const { bracket: dragBracket, matId: draggedMat } = item
      if (dragBracket?.id && matId && draggedMat && bracketId) {
        const changingBody = {
          dragBracketId: dragBracket?.id,
          dropBracketId: bracketId,
        }
        if (matId !== draggedMat) {
          changingBody['matId'] = matId
        }
        await eventMatsClient.changeBracketOrderMat(changingBody).then(async () => {
          await refreshMatList()
        })
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  })

  const [_, drag] = useDrag({
    type: `MATS_BRACKET`,
    item: () => {
      return { type: `MATS_BRACKET`, bracket, matId }
    },
    canDrag: () => !!editingMatActive,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(dragNDropRef))

  return (
    <BracketWrapper
      isOver={isOver}
      ref={dragNDropRef}
      className={`${editingMatActive ? 'dndActive' : ''}`}
    >
      {editingMatActive && (
        <DNDIconWrapper>
          <DNDIcon />
        </DNDIconWrapper>
      )}
      <ContentText>
        {`${categoryName} / ${level} / ${fromAge}-${toAge} лет / ${fromWeight} кг - ${toWeight} кг`}
      </ContentText>
      <ContentText>{`${fightsTotal || 0}/${fightsFinished || 0}`}</ContentText>
      <ContentText>{eta ? getFormattedStartTime(eta) : '--:--'}</ContentText>
    </BracketWrapper>
  )
}

const ContentText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 0;

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f2f2f2;
    font-weight: 600;
  }
`

const BracketWrapper = styled.div`
  display: grid;
  grid-template: 1fr / auto 88px 80px;
  border-bottom: 1px solid #1b1c22;

  &.dndActive {
    grid-template: 1fr / min-content auto 88px 80px;
  }
  & > ${ContentText} {
    padding: 16px;
    border-right: 1px solid #1b1c22;

    &:last-child {
      border-right: none;
    }
  }

  border-bottom: 1px solid ${({ isOver }) => (isOver ? '#6d4eea' : 'transparent')};
`
