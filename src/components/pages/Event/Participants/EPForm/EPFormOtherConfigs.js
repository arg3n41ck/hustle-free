import React from 'react'
import styled from 'styled-components'
import { EPFieldMainWrapper } from './EPFormBrackets'
import { TextField } from '@mui/material'
import { ru } from 'date-fns/locale'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { theme } from '../../../../../styles/theme'

function EPFormOtherConfigs({ formik }) {
  const { values, errors, touched, handleChange, setFieldValue } = formik

  return (
    <EPFieldMainWrapper
      className={`${
        (touched?.roundTime && errors?.roundTime) ||
        (touched?.mat && errors?.estimateRoundTime) ||
        (touched?.roundsAmount && errors?.roundsAmount)
          ? 'error'
          : ''
      }`}
    >
      <Fields>
        <Field>
          <p>Количество раундов</p>
          <TextField
            fullWidth
            type='number'
            placeholder={'Количество раундов'}
            name='roundsAmount'
            onChange={handleChange}
            value={values?.roundsAmount}
            error={touched?.roundsAmount && errors?.roundsAmount}
            helperText={touched?.roundsAmount && errors?.roundsAmount}
          />
        </Field>
        <Field>
          <p>Время одного раунда</p>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={ru}>
            <TimePicker
              value={values?.roundTime}
              name='roundTime'
              mask='__:__'
              inputFormat='mm:ss'
              disableOpenPicker
              onChange={(date) => {
                date?.$d && setFieldValue('roundTime', date?.$d)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor:
                          touched.roundTime && Boolean(errors.roundTime) && '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  error={touched.roundTime && Boolean(errors.roundTime)}
                  helperText={touched.roundTime && errors.roundTime}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: '00:00',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Field>
        <Field>
          <p>Расчетное время на раунд</p>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={ru}>
            <TimePicker
              value={values?.estimateRoundTime}
              name='estimateRoundTime'
              mask='__:__'
              inputFormat='mm:ss'
              disableOpenPicker
              onChange={(date) => {
                date?.$d && setFieldValue('estimateRoundTime', date?.$d)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor:
                          touched.estimateRoundTime &&
                          Boolean(errors.estimateRoundTime) &&
                          '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  error={touched.estimateRoundTime && Boolean(errors.estimateRoundTime)}
                  helperText={touched.estimateRoundTime && errors.estimateRoundTime}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: '00:00',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Field>
      </Fields>
    </EPFieldMainWrapper>
  )
}

export default EPFormOtherConfigs

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
