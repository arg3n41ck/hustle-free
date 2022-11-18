import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSportTypes, selectSportTypes } from '../../../../../redux/components/sportTypes'
import { BoxIcon } from '../../../Events/EventsCatalog/EventsFilter'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ru } from 'date-fns/locale'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { asiaTimezone } from '../../../../../services/asia-timezone'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

function EventDefaults({ formik }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const [sportTypes] = useSelector(selectSportTypes)
  const dispatch = useDispatch()

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } = formik

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className='auth-title__input'>{tLkOg('editEvent.generalInformation.nameEvent')}</p>
        <TextField
          name='name'
          placeholder={tLkOg('editEvent.generalInformation.nameEvent')}
          variant='outlined'
          fullWidth
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          onChange={handleChange}
          value={values?.name}
        />
      </Field>

      <Field>
        <p className='auth-title__input'>{tLkOg('editEvent.generalInformation.typeSport')}</p>
        {!!sportTypes?.length && (
          <Autocomplete
            value={sportTypes.find(({ id }) => id === values?.typeSport) || null}
            noOptionsText={tLkOg('editEvent.generalInformation.nothingFound')}
            onChange={(_, value) => setFieldValue('typeSport', value?.id || null)}
            options={sportTypes.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            isOptionEqualToValue={() =>
              sportTypes.some(({ id }) => {
                return id === values?.typeSport
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        touched.typeSport && Boolean(errors.typeSport) && '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                placeholder={tLkOg('editEvent.generalInformation.typeSport')}
                error={touched.typeSport && Boolean(errors.typeSport)}
                helperText={touched.typeSport && errors.typeSport}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <BoxIcon />,
                }}
              />
            )}
          />
        )}
      </Field>

      <Field>
        <p className='auth-title__input'>
          {tLkOg('editEvent.generalInformation.tournamentStartDate')}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            toolbarTitle={tLkOg('editEvent.generalInformation.tournamentStartDate')}
            cancelText={tLkOg('editEvent.cancel')}
            value={values?.dateStart}
            onChange={(value) => value && setFieldValue('dateStart', value)}
            shouldDisableDate={(date) =>
              date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
            }
            inputFormat='dd/MM/yyyy'
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        touched.dateStart && Boolean(errors.dateStart) && '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                error={touched.dateStart && Boolean(errors.dateStart)}
                helperText={touched.dateStart && errors.dateStart}
                inputProps={{
                  ...params.inputProps,
                  placeholder: tLkOg('registrationPeriods.ddMmYy'),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className='auth-title__input'>
          {tLkOg('editEvent.generalInformation.tournamentEndDate')}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            toolbarTitle={tLkOg('editEvent.generalInformation.tournamentEndDate')}
            cancelText={tLkOg('editEvent.cancel')}
            value={values?.dateEnd}
            onChange={(value) => value && setFieldValue('dateEnd', value)}
            inputFormat='dd/MM/yyyy'
            disableCloseOnSelect={false}
            shouldDisableDate={(date) =>
              date.setHours(0, 0, 0, 0) <
              (values?.dateStart
                ? new Date(values?.dateStart).setDate(new Date(values?.dateStart).getDate() - 1)
                : new Date())
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        touched.dateEnd && Boolean(errors.dateEnd) && '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                error={touched.dateEnd && Boolean(errors.dateEnd)}
                helperText={touched.dateEnd && errors.dateEnd}
                inputProps={{
                  ...params.inputProps,
                  placeholder: tLkOg('registrationPeriods.ddMmYy'),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <Field>
        <p className='auth-title__input'>{tLkOg('editEvent.generalInformation.timezone')}</p>
        <Autocomplete
          noOptionsText={tLkOg('editEvent.generalInformation.nothingFound')}
          onChange={(_, value) => value && setFieldValue('timezone', value?.tz || null)}
          options={asiaTimezone.map((option) => option)}
          getOptionLabel={(option) => `${option.country} ${option.tz}`}
          fullWidth
          value={asiaTimezone.find(({ tz }) => tz === values?.timezone) || null}
          isOptionEqualToValue={() => asiaTimezone.some(({ tz }) => tz === values?.timezone)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      touched.timezone && Boolean(errors.timezone) && '#d32f2f !important',
                  },
                },
              }}
              fullWidth
              error={touched.timezone && Boolean(errors.timezone)}
              helperText={touched.timezone && errors.timezone}
              placeholder={`(GMT+0600) ${tLkOg('registrationPeriods.theLocalTime')}`}
              InputProps={{
                ...params.InputProps,
                startAdornment: <ClockIcon />,
              }}
            />
          )}
        />
      </Field>

      {/* ??? Event format Field */}
      {/* <Field>
        <p className='auth-title__input'>{tLkOg('editEvent.generalInformation.format')}</p>
        <FormControl error={touched.formatEvent && Boolean(errors.formatEvent)} variant='standard'>
          <RadioGroup row name='formatEvent' value={values?.formatEvent} onChange={handleChange}>
            <FormControlLabel
              value='olympic'
              control={<Radio />}
              label={tLkOg('editEvent.generalInformation.olympic')}
            />
            <FormControlLabel
              value='circular'
              control={<Radio />}
              label={tLkOg('editEvent.generalInformation.circular')}
            />
          </RadioGroup>
          <FormHelperText>{touched.formatEvent && errors.formatEvent}</FormHelperText>
        </FormControl>
      </Field> */}

      <EventFormFooter>
        <Link href='/lk-og/profile/events'>
          <Cancel>{tLkOg('editEvent.cancel')}</Cancel>
        </Link>
        <Submit type='submit'>{tLkOg('editEvent.further')}</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventDefaults

export const Form = styled.form`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`

export const Field = styled.div`
  width: 100%;
`

export const EventFormFooter = styled.div`
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-column-gap: 16px;
  padding: 32px 0;
`

export const Submit = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  padding: 8px 24px;
`

export const Cancel = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #828282;
  border-radius: 16px;
  padding: 8px 24px;
`

export const ClockIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12' cy='12' r='9' stroke='#828282' strokeWidth='2' />
    <path
      d='M16.5 13C17.0523 13 17.5 12.5523 17.5 12C17.5 11.4477 17.0523 11 16.5 11V13ZM13 8.5C13 7.94772 12.5523 7.5 12 7.5C11.4477 7.5 11 7.94772 11 8.5H13ZM16.5 11H12.25V13H16.5V11ZM13 11.75V8.5H11V11.75H13ZM12.25 11C12.6642 11 13 11.3358 13 11.75H11C11 12.4404 11.5596 13 12.25 13V11Z'
      fill='#828282'
    />
  </svg>
)
