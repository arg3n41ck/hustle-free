import React, { useRef } from 'react'
import { DNDIconWrapper } from './MatsWithBrackets'
import { DNDIcon } from '../../../../../assets/svg/icons'
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { getFormattedStartTime } from '../bracketsUtils'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'
import { useRouter } from 'next/router'

const eventMatsClient = new EventMatsClient()

export default function Bracket({
  refreshMatList,
  matId,
  bracket,
  editingMatActive,
  ogAndIsMyEvent,
}) {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()

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
    canDrop: () => !!ogAndIsMyEvent,
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
    canDrag: () => editingMatActive && ogAndIsMyEvent,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(dragNDropRef))

  return (
    <BracketWrapper
      isOver={isOver}
      ref={dragNDropRef}
      className={`${ogAndIsMyEvent && editingMatActive ? 'dndActive' : ''}`}
    >
      {editingMatActive && ogAndIsMyEvent && (
        <DNDIconWrapper>
          <DNDIcon />
        </DNDIconWrapper>
      )}
      <ContentText>
        {`${categoryName} / ${level} / ${fromAge}-${toAge} лет / ${fromWeight} кг - ${toWeight} кг`}
      </ContentText>
      <ContentText>{`${fightsTotal || 0}/${fightsFinished || 0}`}</ContentText>
      <ContentText>{eta ? getFormattedStartTime(eta) : '--:--'}</ContentText>

      {!editingMatActive && (
        <ActionsWrapper>
          <BracketButton
            onClick={() => routerPush(`/events/${eventId}/brackets/bracket/${bracketId}/`)}
          >
            Сетка
          </BracketButton>
        </ActionsWrapper>
      )}
    </BracketWrapper>
  )
}

const ContentText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f2f2f2;
    font-weight: 600;
  }
`

const ActionsWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: none;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 32px;
  padding: 16px;
  top: 0;
  left: 0;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`

const BracketWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: 1fr / auto 88px 80px;
  border-bottom: 1px solid #1b1c22;

  @media screen and (max-width: 768px) {
    grid-template: 1fr / auto 64px 72px;
  }

  &.dndActive {
    grid-template: 1fr / min-content auto 88px 80px;
  }
  & > ${ContentText} {
    padding: 16px;
    border-right: 1px solid #1b1c22;

    @media screen and (max-width: 768px) {
      padding: 8px;
    }

    &:last-child {
      border-right: none;
    }
  }

  &:hover {
    background: linear-gradient(0deg, rgba(109, 78, 234, 0.07), rgba(109, 78, 234, 0.07)), #141519;

    ${ActionsWrapper} {
      display: flex;
    }
  }

  border-bottom: 1px solid ${({ isOver }) => (isOver ? '#6d4eea' : 'transparent')};
`

const BracketButton = styled.button`
  height: min-content;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 8px;
  padding: 8px 14px;

  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 16px;
    padding: 4px 12px;
  }
`
