import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ParticipantCategoriesModal from './Modal'
import { FieldsRow } from '../EventLocation'
import { TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PCFieldName } from './Name'
import styled from 'styled-components'

const initialEmptyValues = {
  fromAge: 0,
  toAge: 0,
}

function Age({ open, edit, name, onClose, submit, onBack, defaultValues = initialEmptyValues }) {
  const { t: tLkOg } = useTranslation('lkOg')

  const { current: validationSchema } = useRef(
    yup.object({
      fromAge: yup
        .mixed()
        .required(tLkOg('validation.required'))
        .test({
          test: function (value) {
            return value < this.parent.toAge
          },
          message: tLkOg('validation.ageFromValidate'),
        }),
      toAge: yup.mixed().required(tLkOg('validation.required')),
    }),
  )

  const { values, touched, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })

  return (
    <ParticipantCategoriesModal
      open={open}
      title={name}
      onBack={onBack}
      onClose={onClose}
      onSubmit={handleSubmit}
      edit={edit}
    >
      <form onSubmit={handleSubmit}>
        <PCFieldName>{tLkOg('categoriesOfParticipants.agesParticipants')}</PCFieldName>
        <FieldsRow>
          <TextField
            name='fromAge'
            placeholder={tLkOg('categoriesOfParticipants.from')}
            variant='outlined'
            fullWidth
            error={touched.fromAge && Boolean(errors.fromAge)}
            helperText={touched.fromAge && errors.fromAge}
            onChange={(e) => setFieldValue('fromAge', e.target.value.replace(/\D/gi, ''))}
            value={values.fromAge}
          />
          <TextField
            name='toAge'
            placeholder={tLkOg('categoriesOfParticipants.to')}
            variant='outlined'
            fullWidth
            error={touched.toAge && Boolean(errors.toAge)}
            helperText={touched.toAge && errors.toAge}
            onChange={(e) => setFieldValue('toAge', e.target.value.replace(/\D/gi, ''))}
            value={values.toAge}
          />
          <input style={{display: 'none'}} type="submit"/>
        </FieldsRow>
      </form>
    </ParticipantCategoriesModal>
  )
}

export default Age
