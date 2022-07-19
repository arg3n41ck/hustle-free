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
    const { data } = await $api.post('/directory/participant_category_price/', values)
    return data
  } catch (e) {
    console.log(e)
  }
}
const editPrice = async (values, id) => {
  try {
    const { data } = await $api.put(`/directory/participant_category_price/${id}/`, values)
    return data
  } catch (e) {
    console.log(e)
  }
}

const getPrice = async (id) => {
  const { data } = await $api.get(`/directory/participant_category_price/${id}/`)
  return data
}

function Price({ open, name, edit, onClose, submit, priceId, onBack, eventId, id: pcId }) {
  const [defaultValues, setDefaultValues] = useState(initialEmptyValues)
  const { t: tLkOg } = useTranslation('lkOg')
  const { t: tCommon } = useTranslation('common')

  const validationSchema = yup.object({
    standartPrice: yup.string().required(tLkOg('validation.required')),
  })

  const { values, setFieldValue, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    enableReinitialize: true,
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
    priceId && getPrice(priceId).then(setDefaultValues)
  }, [priceId])

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
      onSubmit={handleSubmit}
      edit={edit}
    >
      <Form>
        <FormSubTitle>{tLkOg('categoriesOfParticipants.categoryRegistrationPrices')}</FormSubTitle>

        <Field>
          <p className='auth-title__input'>{tLkOg('registrationPeriods.earlyRegistration')}</p>
          <TextField
            name='earlyPrice'
            placeholder={tLkOg('categoriesOfParticipants.price')}
            variant='outlined'
            fullWidth
            type='number'
            error={touched.earlyPrice && Boolean(errors.earlyPrice)}
            helperText={touched.earlyPrice && errors.earlyPrice}
            onChange={handleChange}
            value={values.earlyPrice ? Math.round(values.earlyPrice) : values.earlyPrice}
          />
        </Field>

        <Field>
          <p className='auth-title__input'>{tLkOg('registrationPeriods.standartRegistrations')}</p>
          <TextField
            name='standartPrice'
            placeholder={tLkOg('categoriesOfParticipants.price')}
            variant='outlined'
            fullWidth
            type='number'
            error={touched.standartPrice && Boolean(errors.standartPrice)}
            helperText={touched.standartPrice && errors.standartPrice}
            onChange={handleChange}
            value={values.standartPrice ? Math.round(values.standartPrice) : values.standartPrice}
          />
        </Field>

        <Field>
          <p className='auth-title__input'>{tLkOg('registrationPeriods.tateCheckIn')}</p>
          <TextField
            name='latePrice'
            placeholder={tLkOg('categoriesOfParticipants.price')}
            variant='outlined'
            fullWidth
            type='number'
            error={touched.latePrice && Boolean(errors.latePrice)}
            helperText={touched.latePrice && errors.latePrice}
            onChange={handleChange}
            value={values.latePrice ? Math.round(values.latePrice) : values.latePrice}
          />
        </Field>

        <Field>
          <p className='auth-title__input'>{tLkOg('categoriesOfParticipants.valuta')}</p>
          <Autocomplete
            noOptionsText={tLkOg('editEvent.generalInformation.nothingFound')}
            onChange={(_, value) => value && setFieldValue('currency', value.value)}
            options={currencyOptions.map((option) => option)}
            getOptionLabel={(option) => option.name}
            fullWidth
            value={currencyOptions.find(({ value }) => values.currency === value)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={touched.currency && Boolean(errors.currency)}
                helperText={touched.currency && errors.currency}
                placeholder='Валюта'
              />
            )}
          />
        </Field>
      </Form>
    </ParticipantCategoriesModal>
  )
}

export default Price

const Form = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`
