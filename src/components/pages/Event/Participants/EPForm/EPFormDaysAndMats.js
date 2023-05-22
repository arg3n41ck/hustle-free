import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { EPFieldMainWrapper } from './EPFormBrackets'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchDaysByParams } from '../../../../../redux/components/daysAndMats'
import { Autocomplete, TextField } from '@mui/material'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import { theme } from '../../../../../styles/theme'

function EPFormDaysAndMats({ formik }) {
  const { id: eventId } = useRouter()
  const { values, errors, touched, setFieldValue } = formik
  const [matsOptions, setMatsOptions] = useState([])
  const days = useSelector((state) => state.daysAndMats.days)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDaysByParams({ event: eventId }))
  }, [eventId])

  return (
    <EPFieldMainWrapper
      className={`${(touched?.day && errors?.day) || (touched?.mat && errors?.mat) ? 'error' : ''}`}
    >
      <EPFieldTitle>2. Выберите день и мат</EPFieldTitle>
      <Fields>
        <Field>
          <p>День</p>
          <Autocomplete
            noOptionsText={'Не найдено'}
            onChange={(_, value) => {
              if (value) {
                setFieldValue('day', value?.id)
                setMatsOptions(value?.mats)
              }
            }}
            options={days.data.map((option) => option)}
            isOptionEqualToValue={() => days.data.some((day) => day?.id === values.day)}
            getOptionLabel={(option) =>
              `${option?.name} • ${format(new Date(option?.startDate), 'dd MMMM yyyy', {
                locale: ru,
              })} г.`
            }
            fullWidth
            value={days.data.find((day) => day?.id === values.day)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={'День'}
                error={touched?.day && errors?.day}
                helperText={touched?.day && errors?.day}
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        </Field>
        <Field>
          <p>Маты</p>
          <Autocomplete
            noOptionsText={'Не найдено'}
            onChange={(_, value) => value && setFieldValue('mat', value?.id)}
            options={matsOptions.map((option) => option)}
            isOptionEqualToValue={() => matsOptions.some((mat) => mat?.id === values.mat)}
            getOptionLabel={(option) => `${option?.prefix} ${option?.name}`}
            fullWidth
            value={matsOptions.find((mat) => mat?.id === values.mat)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={'Мат'}
                error={touched?.mat && errors?.mat}
                helperText={touched?.mat && errors?.mat}
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        </Field>
      </Fields>
    </EPFieldMainWrapper>
  )
}

export default EPFormDaysAndMats

export const EPFieldTitle = styled.h4`
  font-weight: 600;
  font-size: 24px;
`

export const Fields = styled.div`
  display: flex;
  grid-gap: 32px;

  ${theme.mqMax('md')} {
    flex-wrap: wrap;
    grid-gap: 16px;
  }
`

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  p {
    margin: 0;
  }
`

export const EPTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #f2f2f2;

  &.error {
    color: #eb5757;
  }
`
