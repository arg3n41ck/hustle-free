import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Delete, Edit, KeyboardArrowDown } from '@mui/icons-material'
import { Collapse, IconButton } from '@mui/material'
import styled from 'styled-components'
import Mat from './Mat'

const mockMats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function DayWithMats() {
  const [open, setOpen] = useState(false)
  return (
    <DayRowWrapper>
      <DayHeader>
        <DayHeaderActions>День 1</DayHeaderActions>
        <DayHeaderActions>31/09/2022 с 09:00</DayHeaderActions>
        <DayHeaderActions>Матов: 3</DayHeaderActions>
        <DayHeaderActions>
          <CustomIconButton>
            <ContentCopyIcon />
          </CustomIconButton>
          <CustomIconButton>
            <Edit />
          </CustomIconButton>
          <CustomIconButton>
            <Delete />
          </CustomIconButton>
        </DayHeaderActions>
        <DayHeaderActions>
          <ArrowIconS open={open} onClick={() => setOpen(!open)}>
            <KeyboardArrowDown />
          </ArrowIconS>
        </DayHeaderActions>
      </DayHeader>
      <Collapse in={open}>
        <Mats>
          {mockMats.map((item) => (
            <Mat key={item} mat={item} />
          ))}
        </Mats>
      </Collapse>
    </DayRowWrapper>
  )
}

const ArrowIconS = styled.div`
  transition: 0.2s;
  transform: rotate(${({ open }) => (open ? '-180deg' : '0')});
`

const DayRowWrapper = styled.li`
  display: grid;
  grid-template: min-content auto / 1fr;
  border-bottom: 1px solid #333;
`

const DayHeader = styled.div`
  display: grid;
  grid-template: 1fr / max-content auto max-content min-content min-content;
  border-bottom: 1px solid #333;
`

export const CustomIconButton = styled(IconButton)`
  color: #828282;
  fill: #828282;

  svg {
    color: inherit;
    fill: inherit;

    path {
      color: inherit;
      fill: inherit;
    }
  }

  &:hover {
    svg {
      fill: #f2f2f2;
      color: #f2f2f2;
    }
  }
`

const DayHeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 32px;
  padding: 21px 32px;
  border-right: 1px solid #333;

  &:last-child {
    border-right: none;
  }
`

const Mats = styled.ul`
  display: flex;
  flex-direction: column;
`
