import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchDaysByParams, fetchMatsWithBrackets } from '../../../../redux/components/daysAndMats'
import { Autocomplete, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'

function EventBrackets() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [selectedDay, setSelectedDay] = useState(null)
  const { t: tEventDetail } = useTranslation('eventDetail')

  const { days, matsWithBrackets } = useSelector((state) => state.daysAndMats)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDaysByParams({ event: eventId }))
  }, [eventId])

  useEffect(() => {
    dispatch(fetchMatsWithBrackets({ event_id: eventId, day_id: selectedDay || '' }))
  }, [eventId, selectedDay])

  console.log({ days, matsWithBrackets })
  return (
    <MainWrapper style={{ minHeight: '100vh' }}>
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
          onChange={(_, value) => value && setSelectedDay(value?.id)}
          options={days.data.map((option) => option)}
          isOptionEqualToValue={() => days.data.some((day) => day?.id === selectedDay)}
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
    </MainWrapper>
  )
}

export default EventBrackets

const MainWrapper = styled.div`
  position: relative;
`

const FilterByDaysWrapper = styled.div``

const PCWrapper = styled.div``
