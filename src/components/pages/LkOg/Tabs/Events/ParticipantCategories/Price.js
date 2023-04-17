import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ParticipantCategoriesModal from './Modal'
import { Field } from '../EventDefaults'
import { FormSubTitle } from '../EventPeriods'
import { Autocomplete, TextField } from '@mui/material'
import styled from 'styled-components'
import $api from '../../../../../../services/axios'
import { editParticipantCategory } from './ParticipantCategoriesEdit'
import { useTranslation } from 'next-i18next'

const initialEmptyValues = {
  earlyPrice: '',
  standartPrice: '',
  latePrice: '',
  currency: 'kzt',
}

const createPrice = async (values) => {
  try {
    const { data } = await $api.post('/directories/part_category_price/', values)
    return data
  } catch (e) {
    console.log(e)
  }
}
const editPrice = async (values, id) => {
  try {
    const { data } = await $api.put(`/directories/part_category_price/${id}/`, values)
    return data
  } catch (e) {
    console.log(e)
  }
}

const getPrice = async (id) => {
  const { data } = await $api.get(`/directories/part_category_price/${id}/`)
  return data
}

const getEventPeriods = async (id) => {
  const { data } = await $api.get(`/events/event_registr_periods/`, { params: { event: id } })
  return data?.length ? data[0] : data
}

function Price({ open, name, edit, onClose, submit, priceId, onBack, eventId, id: pcId }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const { t: tCommon } = useTranslation('common')
  const [eventPeriods, setEventPeriods] = useState(null)

  const formik = useFormik({
    initialValues: initialEmptyValues,
    validationSchema: yup.object({
      standartPrice: yup.string().required(tLkOg('validation.required')),
      earlyPrice: yup
        .string()
        .test('earlyPriceRequired', tLkOg('validation.required'), (value) => {
          if (eventPeriods?.earlyRegActive) {
            return value !== undefined && value !== null && value !== ''
          }
          return true
        })
        .nullable(),
      latePrice: yup
        .string()
        .test('latePriceRequired', tLkOg('validation.required'), (value) => {
          if (eventPeriods?.lateRegActive) {
            return value !== undefined && value !== null && value !== ''
          }
          return true
        })
        .nullable(),
    }),
    onSubmit: async (values) => {
      if (!priceId && !Array.isArray(pcId)) {
        createPrice({ ...values, eventId }).then((data) => {
          edit && data && editParticipantCategory({ price: data.id }, pcId)
          data && submit({ price: data.id })
        })
      } else if (priceId && !Array.isArray(pcId)) {
        editPrice({ ...values, event_id: eventId }, priceId).then(() => {
          submit()
        })
      } else if (Array.isArray(pcId)) {
        await Promise.all(
          pcId.map(async (id) => {
            await createPrice({ ...values, eventId }).then(async ({ id: priceId }) => {
              await editParticipantCategory({ price: priceId }, id)
            })
          }),
        ).then(() => {
          submit()
        })
      }
    },
  })

  useEffect(() => {
    formik.validateForm()
  }, [eventPeriods])

  useEffect(() => {
    priceId && getPrice(priceId).then(formik.setValues)
  }, [priceId])

  useEffect(() => {
    eventId && getEventPeriods(eventId).then(setEventPeriods)
  }, [eventId])

  const currencyOptions = [
    { name: tCommon('currency.kzt'), value: 'kzt' },
    { name: tCommon('currency.usd'), value: 'usd' },
    { name: tCommon('currency.eur'), value: 'eur' },
  ]

  return (
    <ParticipantCategoriesModal
      open={open}
      title={name}
      onClose={onClose}
      onBack={onBack}
      onSubmit={formik.handleSubmit}
      edit={edit}
    >
      <Form onSubmit={formik.handleSubmit}>
        <FormSubTitle>{tLkOg('categoriesOfParticipants.categoryRegistrationPrices')}</FormSubTitle>

        {eventPeriods?.earlyRegActive && (
          <Field>
            <p className='auth-title__input'>{tLkOg('registrationPeriods.earlyRegistration')}</p>
            <TextField
              name='earlyPrice'
              placeholder={tLkOg('categoriesOfParticipants.price')}
              variant='outlined'
              fullWidth
              type='number'
              error={formik.touched.earlyPrice && Boolean(formik.errors.earlyPrice)}
              helperText={formik.touched.earlyPrice && formik.errors.earlyPrice}
              onChange={formik.handleChange}
              value={
                formik.values.earlyPrice
                  ? Math.round(formik.values.earlyPrice)
                  : formik.values.earlyPrice
              }
            />
          </Field>
        )}

        <Field>
          <p className='auth-title__input'>{tLkOg('registrationPeriods.standartRegistrations')}</p>
          <TextField
            name='standartPrice'
            placeholder={tLkOg('categoriesOfParticipants.price')}
            variant='outlined'
            fullWidth
            type='number'
            error={formik.touched.standartPrice && Boolean(formik.errors.standartPrice)}
            helperText={formik.touched.standartPrice && formik.errors.standartPrice}
            onChange={formik.handleChange}
            value={
              formik.values.standartPrice
                ? Math.round(formik.values.standartPrice)
                : formik.values.standartPrice
            }
          />
        </Field>

        {eventPeriods?.lateRegActive && (
          <Field>
            <p className='auth-title__input'>{tLkOg('registrationPeriods.tateCheckIn')}</p>
            <TextField
              name='latePrice'
              placeholder={tLkOg('categoriesOfParticipants.price')}
              variant='outlined'
              fullWidth
              type='number'
              error={formik.touched.latePrice && Boolean(formik.errors.latePrice)}
              helperText={formik.touched.latePrice && formik.errors.latePrice}
              onChange={formik.handleChange}
              value={
                formik.values.latePrice
                  ? Math.round(formik.values.latePrice)
                  : formik.values.latePrice
              }
            />
          </Field>
        )}

        <Field>
          <p className='auth-title__input'>{tLkOg('categoriesOfParticipants.valuta')}</p>
          <Autocomplete
            noOptionsText={tLkOg('editEvent.generalInformation.nothingFound')}
            onChange={(_, value) => value && formik.setFieldValue('currency', value.value)}
            options={currencyOptions.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={currencyOptions.find(({ value }) => formik.values.currency === value)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.currency &&
                        Boolean(formik.errors.currency) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                error={formik.touched.currency && Boolean(formik.errors.currency)}
                helperText={formik.touched.currency && formik.errors.currency}
                placeholder='Валюта'
              />
            )}
          />
        </Field>
        <input style={{ display: 'none' }} type='submit' />
      </Form>
    </ParticipantCategoriesModal>
  )
}

export default Price

const Form = styled.form`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
