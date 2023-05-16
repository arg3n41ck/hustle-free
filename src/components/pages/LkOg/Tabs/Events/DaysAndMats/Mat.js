import React, { useRef } from 'react'
import styled from 'styled-components'
import { DNDIcon } from '../../../../../../assets/svg/icons'
import { CustomIconButton } from './DayWithMats'
import { Delete, Edit } from '@mui/icons-material'
import { useDrag, useDrop } from 'react-dnd'

export default function Mat({ mat }) {
  const dragNDropRef = useRef()
  const dndIconRef = useRef()

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: `BRACKETS_MATS`,
    drop: async (item) => {
      console.log(item)
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  })

  const [{ isDragging }, drag] = useDrag({
    type: `BRACKETS_MATS`,
    item: () => {
      return { type: `BRACKETS_MATS`, mat }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(dragNDropRef))

  return (
    <MatWrapper ref={dragNDropRef}>
      <MatName>Mat {mat}</MatName>
      <MatFights>Схваток: 0</MatFights>
      <SeeMat>Посмотреть</SeeMat>
      <MatsActions>
        <CustomIconButton ref={dndIconRef}>
          <DNDIcon />
        </CustomIconButton>
        <CustomIconButton>
          <Delete />
        </CustomIconButton>
        <CustomIconButton>
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
  border-bottom: 1px solid #333;

  &:hover {
    background: rgba(109, 78, 234, 0.07);

    ${MatsActions} {
      width: 180px;
    }
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
