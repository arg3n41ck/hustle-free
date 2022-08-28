import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from '@mui/material'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { fetchSportTypes } from '../../../../../redux/components/sportTypes'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ru } from 'date-fns/locale'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker } from '@mui/lab'
import { useRouter } from 'next/router'
import { Cancel, EventFormFooter, Field, Form, Submit } from './EventDefaults'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'

const emptyInitialValues = {
  maxParticipantCount: '',
  earlyRegStart: null,
  earlyRegEnd: null,
  standartRegStart: null,
  standartRegEnd: null,
  lateRegStart: null,
  lateRegEnd: null,
  earlyRegActive: false,
  lateRegActive: false,
}

function EventPeriods({ defaultValues = emptyInitialValues, eventId, periodsId }) {
  const { t: tLkOg } = useTranslation('lkOg')

  const { current: validationSchema } = useRef(
    yup.object({
      maxParticipantCount: yup.number().required(tLkOg('validation.required')).nullable(),
      earlyRegActive: yup.boolean(),
      lateRegActive: yup.boolean(),
      earlyRegStart: yup
        .date()
        .nullable()
        .test({
          message: tLkOg('validation.regPeriods.earlyStartEarlyEnd'),
          test: function (value) {
            return this.parent.earlyRegActive
              ? this.parent.earlyRegEnd &&
                  new Date(this.parent.earlyRegEnd).getTime() > new Date(value).getTime()
              : true
          },
        })
        .test({
          message: tLkOg('validation.regPeriods.earlyStartStandartStart'),
          test: function (value) {
            return this.parent.earlyRegActive
              ? this.parent.standartRegStart &&
                  new Date(this.parent.standartRegStart).getTime() > new Date(value).getTime()
              : true
          },
        }),
      earlyRegEnd: yup
        .date()
        .nullable()
        .test({
          message: tLkOg('validation.required'),
          test: function (value) {
            return this.parent.earlyRegActive ? value : true
          },
        })
        .test({
          message: tLkOg('validation.regPeriods.earlyStartStandartStart'),
          test: function (value) {
            return this.parent.earlyRegActive
              ? this.parent.standartRegStart &&
                  new Date(this.parent.standartRegStart).getTime() > new Date(value).getTime()
              : true
          },
        }),
      standartRegStart: yup
        .date()
        .nullable()
        .required(tLkOg('validation.required'))
        .test({
          message: tLkOg('validation.regPeriods.standartStartStandartEnd'),
          test: function (value) {
            return (
              this.parent.standartRegEnd &&
              new Date(this.parent.standartRegEnd).getTime() > new Date(value).getTime()
            )
          },
        })
        .test({
          message: tLkOg('validation.validDate'),
          test: function (value) {
            return new Date().setHours(0, 0, 0, 0) <= new Date(value).setHours(0, 0, 0, 0)
          },
        }),
      standartRegEnd: yup.date().nullable().required(tLkOg('validation.required')),

      lateRegStart: yup
        .date()
        .nullable()
        .test({
          message: tLkOg('validation.regPeriods.lateStartStandartEnd'),
          test: function (value) {
            return this.parent.lateRegActive
              ? this.parent.standartRegEnd &&
                  new Date(this.parent.standartRegEnd).getTime() < new Date(value).getTime()
              : true
          },
        })
        .test({
          message: tLkOg('validation.regPeriods.lateStartLateEnd'),
          test: function (value) {
            return this.parent.lateRegActive
              ? this.parent.lateRegEnd &&
                  new Date(this.parent.lateRegEnd).getTime() > new Date(value).getTime()
              : true
          },
        }),
      lateRegEnd: yup
        .date()
        .nullable()
        .test({
          message: tLkOg('validation.required'),
          test: function (value) {
            return this.parent.lateRegActive ? value : true
          },
        }),
    }),
  )

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await formDataHttp(
        {
          ...values,
          earlyRegStart:
            values.earlyRegStart && format(new Date(values.earlyRegStart), 'yyyy-MM-dd'),
          earlyRegEnd: values.earlyRegEnd && format(new Date(values.earlyRegEnd), 'yyyy-MM-dd'),
          standartRegStart:
            values.standartRegStart && format(new Date(values.standartRegStart), 'yyyy-MM-dd'),
          standartRegEnd:
            values.standartRegEnd && format(new Date(values.standartRegEnd), 'yyyy-MM-dd'),
          lateRegStart: values.lateRegStart && format(new Date(values.lateRegStart), 'yyyy-MM-dd'),
          lateRegEnd: values.lateRegEnd && format(new Date(values.lateRegEnd), 'yyyy-MM-dd'),
          allFieldsFilled: true,
          event: eventId,
        },
        `events/event_registr_periods/${periodsId ? periodsId + '/' : ''}`,
        periodsId ? 'put' : 'post',
      )
      routerPush(`/lk-og/profile/events/edit/${eventId}/description`)
    },
  })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <p className='auth-title__input'>
          {tLkOg('registrationPeriods.maximumNumberOfRegistrations')}
        </p>
        <TextField
          name='maxParticipantCount'
          placeholder={tLkOg('registrationPeriods.maximumNumberOfRegistrations')}
          variant='outlined'
          fullWidth
          type='number'
          error={touched.maxParticipantCount && Boolean(errors.maxParticipantCount)}
          helperText={touched.maxParticipantCount && errors.maxParticipantCount}
          onChange={handleChange}
          value={values.maxParticipantCount}
        />
      </Field>
      <FormHR />
      <FormSubTitle>{tLkOg('registrationPeriods.earlyRegistration')}</FormSubTitle>
      <div>
        <Field>
          <FormControl
            error={touched.earlyRegActive && Boolean(errors.earlyRegActive)}
            variant='standard'
          >
            <FormControlLabel
              name='earlyRegActive'
              onChange={handleChange}
              checked={values.earlyRegActive}
              control={<Checkbox />}
              label={tLkOg('registrationPeriods.yes')}
            />
            <FormHelperText>{touched.earlyRegActive && errors.earlyRegActive}</FormHelperText>
          </FormControl>
        </Field>

        <Collapse in={values.earlyRegActive}>
          <FieldsColumn>
            <Field style={{ marginTop: 24 }}>
              <p className='auth-title__input'>{tLkOg('registrationPeriods.sunriseStartDate')}</p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <DatePicker
                  toolbarTitle={tLkOg('registrationPeriods.sunriseStartDate')}
                  cancelText={tLkOg('editEvent.cancel')}
                  value={values.earlyRegStart}
                  disableCloseOnSelect={false}
                  onChange={(value) => value && setFieldValue('earlyRegStart', value)}
                  inputFormat='dd/MM/yyyy'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            borderColor:
                              touched.earlyRegStart &&
                              Boolean(errors.earlyRegStart) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={touched.earlyRegStart && Boolean(errors.earlyRegStart)}
                      helperText={touched.earlyRegStart && errors.earlyRegStart}
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
                {tLkOg('registrationPeriods.endDateForEarlyRegistration')}
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <DatePicker
                  toolbarTitle={tLkOg('registrationPeriods.endDateForEarlyRegistration')}
                  cancelText={tLkOg('editEvent.cancel')}
                  value={values.earlyRegEnd}
                  disableCloseOnSelect={false}
                  onChange={(value) => value && setFieldValue('earlyRegEnd', value)}
                  shouldDisableDate={(date) =>
                    values.earlyRegStart &&
                    date.setHours(0, 0, 0, 0) < new Date(values.earlyRegStart)
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
                              touched.earlyRegEnd &&
                              Boolean(errors.earlyRegEnd) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={touched.earlyRegEnd && Boolean(errors.earlyRegEnd)}
                      helperText={touched.earlyRegEnd && errors.earlyRegEnd}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: tLkOg('registrationPeriods.ddMmYy'),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Field>
          </FieldsColumn>
        </Collapse>
      </div>

      <FormHR />

      <FormSubTitle>{tLkOg('registrationPeriods.standartRegistrations')}</FormSubTitle>

      <Field>
        <p className='auth-title__input'>
          {tLkOg('registrationPeriods.standardEnrollmentStartDate')}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <DatePicker
            toolbarTitle={tLkOg('registrationPeriods.standardEnrollmentStartDate')}
            cancelText={tLkOg('editEvent.cancel')}
            value={values.standartRegStart}
            onChange={(value) => value && setFieldValue('standartRegStart', value)}
            inputFormat='dd/MM/yyyy'
            disableCloseOnSelect={false}
            shouldDisableDate={(date) =>
              date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ||
              (values.earlyRegEnd && date.setHours(0, 0, 0, 0) < new Date(values.earlyRegEnd))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        touched.standartRegStart &&
                        Boolean(errors.standartRegStart) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                error={touched.standartRegStart && Boolean(errors.standartRegStart)}
                helperText={touched.standartRegStart && errors.standartRegStart}
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
          {tLkOg('registrationPeriods.endDateOfStandardRegistration')}
        </p>
        <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
          <DatePicker
            toolbarTitle={tLkOg('registrationPeriods.endDateOfStandardRegistration')}
            cancelText={tLkOg('editEvent.cancel')}
            value={values.standartRegEnd}
            onChange={(value) => value && setFieldValue('standartRegEnd', value)}
            inputFormat='dd/MM/yyyy'
            disableCloseOnSelect={false}
            shouldDisableDate={(date) =>
              date.setHours(0, 0, 0, 0) <
              (values.standartRegStart
                ? new Date(values.standartRegStart)
                : new Date().setHours(0, 0, 0, 0))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        touched.standartRegEnd &&
                        Boolean(errors.standartRegEnd) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                error={touched.standartRegEnd && Boolean(errors.standartRegEnd)}
                helperText={touched.standartRegEnd && errors.standartRegEnd}
                inputProps={{
                  ...params.inputProps,
                  placeholder: tLkOg('registrationPeriods.ddMmYy'),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Field>

      <FormHR />

      <FormSubTitle>{tLkOg('registrationPeriods.tateCheckIn')}</FormSubTitle>
      <div>
        <Field>
          <FormControl
            error={touched.lateRegActive && Boolean(errors.lateRegActive)}
            variant='standard'
          >
            <FormControlLabel
              name='lateRegActive'
              checked={values.lateRegActive}
              onChange={handleChange}
              control={<Checkbox />}
              label={tLkOg('registrationPeriods.yes')}
            />
            <FormHelperText>{touched.lateRegActive && errors.lateRegActive}</FormHelperText>
          </FormControl>
        </Field>

        <Collapse in={values.lateRegActive}>
          <FieldsColumn>
            <Field style={{ marginTop: 24 }}>
              <p className='auth-title__input'>
                {tLkOg('registrationPeriods.lateRegistrationStartDate')}
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <DatePicker
                  toolbarTitle={tLkOg('registrationPeriods.lateRegistrationStartDate')}
                  cancelText={tLkOg('editEvent.cancel')}
                  value={values.lateRegStart}
                  onChange={(value) => value && setFieldValue('lateRegStart', value)}
                  inputFormat='dd/MM/yyyy'
                  disableCloseOnSelect={false}
                  shouldDisableDate={(date) =>
                    date.setHours(0, 0, 0, 0) <
                    (values.standartRegEnd ? new Date(values.standartRegEnd) : new Date())
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            borderColor:
                              touched.lateRegStart &&
                              Boolean(errors.lateRegStart) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={touched.lateRegStart && Boolean(errors.lateRegStart)}
                      helperText={touched.lateRegStart && errors.lateRegStart}
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
                {tLkOg('registrationPeriods.lateRegistrationEndDate')}
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <DatePicker
                  toolbarTitle={tLkOg('registrationPeriods.lateRegistrationEndDate')}
                  cancelText={tLkOg('editEvent.cancel')}
                  value={values.lateRegEnd}
                  onChange={(value) => value && setFieldValue('lateRegEnd', value)}
                  inputFormat='dd/MM/yyyy'
                  disableCloseOnSelect={false}
                  shouldDisableDate={(date) =>
                    date.setHours(0, 0, 0, 0) <
                    (values.lateRegStart ? new Date(values.lateRegStart) : new Date())
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            borderColor:
                              touched.lateRegEnd &&
                              Boolean(errors.lateRegEnd) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={touched.lateRegEnd && Boolean(errors.lateRegEnd)}
                      helperText={touched.lateRegEnd && errors.lateRegEnd}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: tLkOg('registrationPeriods.ddMmYy'),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Field>
          </FieldsColumn>
        </Collapse>
      </div>

      <FormHR />

      <EventFormFooter>
        <Cancel onClick={() => routerPush('/lk-og/profile/events')}>
          {tLkOg('editEvent.cancel')}
        </Cancel>
        <Submit type='submit'>{tLkOg('editEvent.further')}</Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventPeriods

export const FormSubTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

export const FormHR = styled.div`
  width: 100%;
  border-bottom: 1px solid #333;
  margin: 8px 0;
`

export const ExtraInfo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-top: 24px;
`

export const FieldsColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
