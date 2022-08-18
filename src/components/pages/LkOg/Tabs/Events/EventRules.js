import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { fetchSportTypes } from '../../../../../redux/components/sportTypes'
import { useRouter } from 'next/router'
import { Cancel, EventFormFooter, Field, Form, Submit } from './EventDefaults'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { useTranslation } from 'next-i18next'
import CKEditor5 from '../../../../ui/CKEditor/CKEditor5'
import styled from 'styled-components'

const emptyInitialValues = {
  rules: '',
}

function EventRules({ eventId, defaultValues = emptyInitialValues, rulesId }) {
  const { t: tLkOg } = useTranslation('lkOg')

  const validationSchema = yup.object({
    rules: yup.string().required(tLkOg('validation.required')).nullable(),
  })

  const { touched, errors, values, handleChange, setFieldValue, handleSubmit, isValid } = useFormik(
    {
      initialValues: defaultValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        await formDataHttp(
          { ...values, allFieldsFilled: true, event: eventId },
          `events/rules/${rulesId ? rulesId + '/' : ''}`,
          rulesId ? 'put' : 'post',
        )
        routerPush(`/lk-og/profile/events/edit/${eventId}/participant-categories`)
      },
    },
  )

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <CKEditor5
        onChange={(value) => setFieldValue('rules', value)}
        defaultValue={values.rules || ''}
      />
      <ErrorMessage>{touched.rules && errors.rules}</ErrorMessage>
      <EventFormFooter>
        <Cancel onClick={() => routerPush('/lk-og/profile/events')}>
          {tLkOg('editEvent.cancel')}
        </Cancel>
        <Submit disabled={!isValid} type='submit'>
          {tLkOg('editEvent.further')}
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventRules

const ErrorMessage = styled.p`
  color: #eb5757;
`
