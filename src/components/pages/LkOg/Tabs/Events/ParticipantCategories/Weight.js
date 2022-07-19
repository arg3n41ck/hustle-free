import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ParticipantCategoriesModal from './Modal'
import { FieldsRow } from '../EventLocation'
import { TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PCFieldName } from './Name'

const initialEmptyValues = {
  fromWeight: 0,
  toWeight: 0,
}

function Weight({ open, edit, onClose, name, submit, onBack, defaultValues = initialEmptyValues }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const validationSchema = yup.object({
    fromWeight: yup.mixed().required(tLkOg('validation.required')),
    toWeight: yup.mixed().required(tLkOg('validation.required')),
  })
  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })

  return (
    <ParticipantCategoriesModal
      open={open}
      edit={edit}
      title={name}
      onBack={onBack}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <PCFieldName>{tLkOg('categoriesOfParticipants.weightsOfCategoryParticipants')}</PCFieldName>
      <FieldsRow>
        <TextField
          name='fromWeight'
          placeholder={tLkOg('categoriesOfParticipants.from')}
          variant='outlined'
          fullWidth
          type='number'
          error={touched.fromWeight && Boolean(errors.fromWeight)}
          helperText={touched.fromWeight && errors.fromWeight}
          onChange={handleChange}
          value={values.fromWeight}
        />
        <TextField
          name='toWeight'
          placeholder={tLkOg('categoriesOfParticipants.to')}
          variant='outlined'
          fullWidth
          type='number'
          error={touched.toWeight && Boolean(errors.toWeight)}
          helperText={touched.toWeight && errors.toWeight}
          onChange={handleChange}
          value={values.toWeight}
        />
      </FieldsRow>
    </ParticipantCategoriesModal>
  )
}

export default Weight
