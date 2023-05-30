import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { DNDIcon } from '../../../../../../assets/svg/icons'
import { CustomIconButton } from './DayWithMats'
import { Delete, Edit } from '@mui/icons-material'
import { useDrag, useDrop } from 'react-dnd'
import { EventMatsClient } from '../../../../../../services/apiClients/eventMatsClient'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchDaysByParams } from '../../../../../../redux/components/daysAndMats'

const eventMatsClient = new EventMatsClient()

export default function Mat({ mat, day, onSelectToEditMat }) {
  const dragNDropRef = useRef()
  const dndIconRef = useRef()
  const {
    query: { id: eventId },
  } = useRouter()

  const dispatch = useDispatch()

  const [{ isOver }, drop] = useDrop({
    accept: `BRACKETS_MATS_${day?.id}`,
    drop: async (item) => {
      const { mat: dragMat } = item
      const hoverMat = mat
      await eventMatsClient.editMat(dragMat?.id, { order: hoverMat?.order })
      await eventMatsClient.editMat(hoverMat?.id, { order: dragMat?.order })
      dispatch(fetchDaysByParams({ event: eventId }))
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  })

  const [_, drag] = useDrag({
    type: `BRACKETS_MATS_${day?.id}`,
    item: () => {
      return { type: `BRACKETS_MATS_${day?.id}`, mat }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(dragNDropRef))

  const handleDeleteMat = useCallback(async () => {
    if (mat?.id) {
      await eventMatsClient
        .deleteMat(mat.id)
        .then(() => dispatch(fetchDaysByParams({ event: eventId })))
    }
  }, [mat])

  return (
    <MatWrapper ref={dragNDropRef} className={`${isOver ? 'isOver' : ''}`}>
      <MatName>
        {mat?.prefix} {mat?.name}
      </MatName>
      {/* TODO СХВАТКИ ДОДЕЛАТЬ! */}
      <MatFights>Схваток: 0</MatFights>
      <SeeMat>Посмотреть</SeeMat>
      <MatsActions>
        <CustomIconButton ref={dndIconRef}>
          <DNDIcon />
        </CustomIconButton>
        <CustomIconButton onClick={handleDeleteMat}>
          <Delete />
        </CustomIconButton>
        <CustomIconButton onClick={onSelectToEditMat}>
          <Edit />
        </CustomIconButton>
      </MatsActions>
    </MatWrapper>
  )
}

const MatsActions = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  grid-gap: 32px;
  overflow: hidden;
  transition: width 0.08s ease-in-out;
`

const MatWrapper = styled.li`
  display: flex;
  align-items: center;
  grid-gap: 32px;
  padding: 24px 32px;
  border: 1px solid transparent;
  border-bottom: 1px solid #333;

  &:hover {
    background: rgba(109, 78, 234, 0.07);

    ${MatsActions} {
      width: 180px;
    }
  }

  &.isOver {
    border: 1px solid #6d4eea;
  }

  &:last-child {
    border-bottom: none;
  }
`

const MatName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  border-radius: 8px;
  background: #6d4eea;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;

  margin: 0 auto 0 0;
`

const MatFights = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`

const SeeMat = styled.button`
  padding: 8px 20px;

  background: rgba(109, 78, 234, 0.07);
  border-radius: 4px;

  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #6d4eea;

  &:hover {
    color: #f2f2f2;
    background: #6d4eea;
  }
`
