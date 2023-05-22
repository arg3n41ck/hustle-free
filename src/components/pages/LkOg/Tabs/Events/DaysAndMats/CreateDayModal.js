import React, { useEffect } from 'react'
import { Modal, TextField } from '@mui/material'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ru } from 'date-fns/locale'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { EventMatsClient } from '../../../../../../services/apiClients/eventMatsClient'
import { fetchDaysByParams } from '../../../../../../redux/components/daysAndMats'
import { useDispatch } from 'react-redux'

const eventMatsClient = new EventMatsClient()

const emptyValues = {
  name: '',
  startDate: null,
  startTime: null,
}

function CreateDayModal({ open, onClose, editDayId = null, initialValues = null }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const {
    query: { id: eventId },
  } = useRouter()
  const dispatch = useDispatch()

  const formik = useFormik({
    validationSchema: yup.object({
      name: yup.string().required(tLkOg('validation.required')).nullable(),
      startDate: yup.string().required(tLkOg('validation.required')).nullable(),
      startTime: yup.string().required(tLkOg('validation.required')).nullable(),
    }),
    initialValues: emptyValues,
    onSubmit: async (values) => {
      const body = {
        startDate: format(new Date(values.startDate), 'y-MM-dd'),
        startTime: format(new Date(values.startTime), 'HH:mm:ss'),
        name: values.name,
        event: eventId,
      }

      try {
        if (editDayId) {
          await eventMatsClient
            .editDay(editDayId, body)
            .then(() => dispatch(fetchDaysByParams({ event: eventId })))
        } else {
          await eventMatsClient
            .createDay(body)
            .then(() => dispatch(fetchDaysByParams({ event: eventId })))
        }

        formik.resetForm()
        onClose()
      } catch (error) {
        const errors = error?.response?.data?.non_field_errors
        const isBerfore = (errors?.[0] || '').indexOf('before') > -1
        const isAfter = (errors?.[0] || '').indexOf('after') > -1
        const message = isBerfore
          ? 'Дата не может быть позже даты окончания турнира'
          : isAfter && 'Дата не может быть раньше даты окончания турнира'
        if (isBerfore || isAfter) {
          toast.error(message)
        }
      }
    },
  })

  useEffect(() => {
    formik.setValues(editDayId ? initialValues : emptyValues)
  }, [open, editDayId, initialValues])

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={open}
      onClose={handleClose}
    >
      <Wrapper>
        <Title>Добавить день</Title>
        <Content>
          <Field>
            <p className='auth-title__input'>Название</p>
            <TextField
              name='name'
              fullWidth
              value={formik.values.name}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.name && Boolean(formik.errors.name) && '#d32f2f !important',
                  },
                },
              }}
              placeholder='Название'
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Field>
          <Dates>
            <Field>
              <p className='auth-title__input'>Дата начала турнира</p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  cancelText={tLkOg('editEvent.cancel')}
                  value={formik.values.startDate}
                  disableCloseOnSelect={false}
                  name='startDate'
                  onChange={(value) => value && formik.setFieldValue('startDate', value)}
                  inputFormat='dd/MM/yyyy'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            borderColor:
                              formik.touched.startDate &&
                              Boolean(formik.errors.startDate) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                      helperText={formik.touched.startDate && formik.errors.startDate}
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
              <p className='auth-title__input'>Время начала турнира</p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDayjs}>
                <TimePicker
                  value={formik.values.startTime}
                  name='startTime'
                  onChange={(value) => {
                    value && formik.setFieldValue('startTime', value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          '& > fieldset': {
                            borderColor:
                              formik.touched.startTime &&
                              Boolean(formik.errors.startTime) &&
                              '#d32f2f !important',
                          },
                        },
                      }}
                      fullWidth
                      error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                      helperText={formik.touched.startTime && formik.errors.startTime}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: '00:00',
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Field>
          </Dates>
        </Content>
        <Footer>
          <Button onClick={handleClose}>{tLkOg('editEvent.back')}</Button>
          <Button type='button' onClick={formik.handleSubmit} className='primary'>
            {tLkOg('editEvent.save')}
          </Button>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default CreateDayModal

const Wrapper = styled.div`
  height: min-content;
  max-width: 688px;
  width: 100%;
  border-radius: 16px;
  background: #1b1c22;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
  margin: 0 5px;
`

const Title = styled.p`
  padding: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  border-bottom: 1px solid #333333;
`

const Content = styled.div`
  padding: 24px;

  display: flex;
  flex-direction: column;
  grid-gap: 16px;
`

const Dates = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 16px;
`

const Footer = styled.div`
  padding: 24px;
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-column-gap: 16px;
  border-top: 1px solid #333333;
`

const Button = styled.button`
  border-radius: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #828282;
  border: 1px solid #333;

  &.primary {
    background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
    color: #ffffff;
  }
`

const Field = styled.div``
