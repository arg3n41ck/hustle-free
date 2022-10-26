import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { fetchSportTypes } from '../../../../../redux/components/sportTypes'
import { useRouter } from 'next/router'
import { Cancel, EventFormFooter, Field, Form, Submit } from './EventDefaults'
import FileUploaderBig from '../../../../ui/LKui/FileUploaderBig'
import { FormHR, FormSubTitle } from './EventPeriods'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { useTranslation } from 'next-i18next'
import CKEditor5 from '../../../../ui/CKEditor/CKEditor5'
import styled from 'styled-components'

const emptyInitialValues = {
  description: '',
  banner: null,
  descriptionExtra: '',
}

function EventForm({ defaultValues = emptyInitialValues, eventId, descriptionId }) {
  const { t: tLkOg } = useTranslation('lkOg')

  const validationSchema = yup.object({
    banner: yup.mixed().nullable().required(tLkOg('validation.coverValid')),
    description: yup.string().nullable().required(tLkOg('validation.required')),
    descriptionExtra: yup.string().nullable(),
  })

  const { touched, errors, values, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const path = `events/event_descriptions/${descriptionId ? descriptionId + '/' : ''}`
      const method = descriptionId ? 'patch' : 'post'
      const { banner, ...rest } = values
      const body =
        (typeof values.banner || '') !== 'string'
          ? { ...values, allFieldsFilled: true, event: eventId }
          : { ...rest, allFieldsFilled: true, event: eventId }
      await formDataHttp(body, path, method)
      routerPush(`/lk-og/profile/events/edit/${eventId}/rules/`)
    },
  })

  const { push: routerPush } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <FileUploaderBig
        error={touched.banner && errors.banner}
        defaultBanner={values.banner}
        onChange={(file) => {
          setFieldValue('banner', file)
        }}
      />

      <FormHR />
      <FormSubTitle>{tLkOg('coverAndDescription.description')}</FormSubTitle>

      <Field>
        <CKEditor5
          onChange={(value) => setFieldValue('description', value)}
          defaultValue={values.description || ''}
        />

        <ErrorMessage>{touched.description && errors.description}</ErrorMessage>
      </Field>

      <Field>
        <p className='auth-title__input'>{tLkOg('coverAndDescription.additionalDescription')}</p>
        <CKEditor5
          onChange={(value) => setFieldValue('descriptionExtra', value)}
          defaultValue={values.descriptionExtra || ''}
        />

        <ErrorMessage>{touched.descriptionExtra && errors.descriptionExtra}</ErrorMessage>
      </Field>

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

export default EventForm

const ErrorMessage = styled.p`
  color: #eb5757;
`
