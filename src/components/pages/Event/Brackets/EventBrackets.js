import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchDaysByParams, fetchMatsWithBrackets } from '../../../../redux/components/daysAndMats'
import { Autocomplete, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import MatsWithBrackets from './MatsWithBrackets/MatsWithBrackets'
import { theme } from '../../../../styles/theme'
import useQuery from '../../../../hooks/useQuery'

function EventBrackets() {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const searchParams = useQuery()
  const daySearchValue = searchParams.get('day') || null
  const [editingMatActive, setEditingMatActive] = useState(false)
  const { t: tEventDetail } = useTranslation('eventDetail')

  const { days, matsWithBrackets } = useSelector((state) => state.daysAndMats)

  const dispatch = useDispatch()

  const selectedDay = useMemo(() => {
    if (daySearchValue && days?.data?.length) {
      return days.data.find((day) => day?.id == daySearchValue)
    }
    return null
  }, [daySearchValue, days?.data])

  useEffect(() => {
    eventId && dispatch(fetchDaysByParams({ event: eventId }))
  }, [eventId])

  const refreshMatList = useCallback(() => {
    if (selectedDay?.id && eventId) {
      dispatch(fetchMatsWithBrackets({ event_id: eventId, day_id: selectedDay.id || '' }))
    }
  }, [eventId, selectedDay])

  useEffect(() => {
    refreshMatList()
  }, [eventId, selectedDay])

  const onSelectDay = (day) => {
    day?.id && searchParams.set('day', day?.id)
    routerPush(`/events/${eventId}/brackets/?${searchParams}`)
  }

  useEffect(() => {
    if (days?.data?.length && !selectedDay) {
      onSelectDay(days.data[0])
    }
  }, [days?.data])

  return (
    <MainWrapper style={{ minHeight: '100vh' }}>
      <TopHeader>
        <FilterByDaysWrapper>
          <p>День</p>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '20px 68px 20px 20px',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '20px !important',
              },
            }}
            onChange={(_, value) => value && onSelectDay(value)}
            options={days.data.map((option) => option)}
            value={selectedDay}
            disableClearable
            isOptionEqualToValue={() => days.data.some((day) => day?.id === selectedDay?.id)}
            noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
            getOptionLabel={(option) => option.name}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={'Выбрать день'}
              />
            )}
          />
        </FilterByDaysWrapper>
        <EditButton
          className={`${editingMatActive ? 'disabled' : ''}`}
          onClick={() => setEditingMatActive(!editingMatActive)}
        >
          {editingMatActive ? 'Завершить редактирование' : 'Редактировать'}
        </EditButton>
      </TopHeader>

      <MatsWrapper>
        {!!matsWithBrackets?.data?.length
          ? matsWithBrackets.data.map((mat) => (
              <MatsWithBrackets
                key={mat?.id}
                refreshMatList={refreshMatList}
                matWithBrackets={mat}
                editingMatActive={editingMatActive}
              />
            ))
          : `В выбранном дне нет матов, выберите другой день`}
      </MatsWrapper>
    </MainWrapper>
  )
}

export default EventBrackets

const MainWrapper = styled.div`
  position: relative;
`

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 48px;

  grid-gap: 16px;

  ${theme.mqMax('md')} {
    flex-direction: column;
  }
`

const FilterByDaysWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  ${theme.mqMax('md')} {
    max-width: unset;
    align-self: flex-start;
  }

  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    display: flex;
    align-items: center;
    color: #f2f2f2;
  }
`

const EditButton = styled.button`
  height: min-content;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  color: #ffffff;
  border-radius: 8px;
  padding: 12px 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  &.disabled {
    background: #828282;
    color: #bdbdbd;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const MatsWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  flex-wrap: wrap;

  ${theme.mqMin('md')} {
    display: grid;
    grid-gap: 32px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
