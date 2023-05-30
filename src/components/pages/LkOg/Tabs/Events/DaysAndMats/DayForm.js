import React, { useMemo, useState } from 'react'
import { Add } from '@mui/icons-material'
import styled from 'styled-components'
import CreateDayModal from './CreateDayModal'

export default function DayForm({ editDay, onClose }) {
  const [openCreate, setOpenCreate] = useState(false)

  const { openEdit, dayEditState } = useMemo(() => {
    if (editDay?.id) {
      const dayDate = new Date(`${editDay?.startDate} ${editDay?.startTime}`)
      const state = {
        name: editDay?.name,
        startDate: editDay?.startDate,
        startTime: dayDate,
      }
      return { openEdit: true, dayEditState: state }
    }
    return { openEdit: false, dayEditState: null }
  }, [editDay])

  return (
    <>
      <CreateDayModal
        initialValues={dayEditState}
        editDayId={editDay?.id || null}
        open={openEdit || openCreate}
        onClose={() => {
          setOpenCreate(false)
          onClose()
        }}
      />
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
