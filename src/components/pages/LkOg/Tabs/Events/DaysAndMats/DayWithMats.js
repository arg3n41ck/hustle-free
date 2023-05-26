import React, { useCallback, useMemo, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Add, Delete, Edit, KeyboardArrowDown } from '@mui/icons-material'
import { Collapse, IconButton } from '@mui/material'
import styled from 'styled-components'
import Mat from './Mat'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { EventMatsClient } from '../../../../../../services/apiClients/eventMatsClient'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchDaysByParams } from '../../../../../../redux/components/daysAndMats'

const eventMatsClient = new EventMatsClient()

export default function DayWithMats({
  day,
  onOpenMatModalByDayId,
  onSelectToEditDay,
  onSelectToEditMat,
}) {
  const [open, setOpen] = useState(false)
  const {
    query: { id: eventId },
  } = useRouter()
  const dispatch = useDispatch()

  const dateTime = useMemo(() => {
    if (day && day?.startTime && day?.startDate) {
      const dateStr = new Date(`${day?.startDate} ${day?.startTime}`)
      const date = format(dateStr, 'dd MMMM yyyy', { locale: ru })
      const time = format(dateStr, 'HH:mm')

      return `${date} г. с ${time}`
    }
  }, [day])

  const handleOnCopyDayWithMats = useCallback(async () => {
    if (day?.id) {
      const dayBody = {
        event: eventId,
        name: day?.name,
        startDate: day?.startDate,
        startTime: day?.startTime,
      }

      await eventMatsClient
        .createDay(dayBody)
        .then(async ({ data }) => {
          if (day?.mats?.length) {
            await Promise.all(
              day?.mats.map(({ day, ...matBody }) =>
                eventMatsClient.createMat({ day: data?.id, ...matBody }),
              ),
            )
          }
        })
        .then(() => {
          dispatch(fetchDaysByParams({ event: eventId }))
        })
    }
  }, [day])

  const handleDeleteDay = useCallback(async () => {
    if (day?.id) {
      await eventMatsClient
        .deleteDay(day.id)
        .then(() => dispatch(fetchDaysByParams({ event: eventId })))
    }
  }, [day])

  return (
    <DayRowWrapper>
      <DayHeader>
        <DayHeaderActions className='name'>{day?.name}</DayHeaderActions>
        <DayHeaderActions>{dateTime}</DayHeaderActions>
        <DayHeaderActions>Матов: {day?.mats?.length}</DayHeaderActions>
        <DayHeaderActions>
          <CustomIconButton onClick={handleOnCopyDayWithMats}>
            <ContentCopyIcon />
          </CustomIconButton>
          <CustomIconButton onClick={onSelectToEditDay}>
            <Edit />
          </CustomIconButton>
          <CustomIconButton onClick={handleDeleteDay}>
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
          {!!day?.mats?.length &&
            [...day.mats]
              .sort((a, b) => {
                return a?.order - b?.order
              })
              .map((mat) => (
                <Mat
                  key={mat?.id}
                  day={day}
                  onSelectToEditMat={() => onSelectToEditMat(mat)}
                  mat={mat}
                />
              ))}
          <CreateButton onClick={() => onOpenMatModalByDayId(day)}>
            <Add />
            Создать мат
          </CreateButton>
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
  grid-template: 1fr / auto 285px max-content 250px 88px;
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

  &.name {
    justify-content: flex-start;
  }
  &:last-child {
    border-right: none;
  }
`

const Mats = styled.ul`
  display: flex;
  flex-direction: column;
`

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

  background-blend-mode: overlay, normal;

  &:hover {
    background: rgba(109, 78, 234, 0.07);
  }

  svg {
    color: #6d4eea;
  }
`
