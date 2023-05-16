import React, { useState } from 'react'
import { Add } from '@mui/icons-material'
import styled from 'styled-components'
import CreateDayModal from './CreateDayModal'

export default function CreateDay() {
  const [openCreate, setOpenCreate] = useState(false)
  return (
    <>
      <CreateDayModal open={openCreate} onClose={() => setOpenCreate(false)} />
      <CreateButton onClick={() => setOpenCreate(true)}>
        <Add />
        Добавить новый день
      </CreateButton>
    </>
  )
}

const CreateButton = styled.button`
  width: 100%;
  display: flex;
  grid-gap: 8px;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  color: #ffffff;
  border-bottom: 1px solid #333;

  padding: 24px 32px;

  background: linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), #1b1c22;
  background-blend-mode: overlay, normal;

  &:hover {
    background: linear-gradient(0deg, rgba(235, 87, 87, 0.07), rgba(235, 87, 87, 0.07)), #141519;
  }

  svg {
    color: #6d4eea;
  }
`
