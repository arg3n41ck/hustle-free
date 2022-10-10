import React, { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { fetchSportTypes } from '../../../../../redux/components/sportTypes'
import { useRouter } from 'next/router'
import { Cancel, EventFormFooter, Field, Form, Submit } from './EventDefaults'
import { TextField } from '@mui/material'
import { FieldsRow } from './EventLocation'
import { FormHR, FormSubTitle } from './EventPeriods'
import InputMask from 'react-input-mask'
import { PhoneIcon } from '../../../../../assets/svg/icons'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { useTranslation } from 'next-i18next'
import { useEventRouteContext } from './EventRouteProvider'

const emptyInitialValues = {
  nameOrganization: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  telegram: '',
  instagram: '',
  youtube: '',
  tiktok: '',
  facebook: '',
  linkedin: '',
  twitter: '',
  vk: '',
  email: '',
  webSite: '',
}

function EventContacts({ defaultValue = emptyInitialValues, eventId, contactsId }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const { ctxStep } = useEventRouteContext()

  const { current: validationSchema } = useRef(
    yup.object({
      nameOrganization: yup.string().nullable().required(tLkOg('validation.required')),
      firstName: yup.string().nullable().required(tLkOg('validation.required')),
      lastName: yup.string().nullable().required(tLkOg('validation.required')),
      phoneNumber: yup.string().nullable().required(tLkOg('validation.required')),
      telegram: '',
      instagram: '',
      youtube: '',
      tiktok: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      vk: '',
      email: yup.string().nullable().required(tLkOg('validation.required')),
      webSite: '',
    }),
  )

  const { touched, errors, values, setFieldValue, handleChange, handleSubmit, isValid } = useFormik(
    {
      initialValues: defaultValue,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        await formDataHttp(
          { ...values, allFieldsFilled: true, event: eventId },
          `events/contacts/${contactsId ? contactsId + '/' : ''}`,
          contactsId ? 'put' : 'post',
        )
        routerPush(`/lk-og/profile/events/`)
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
      <FormSubTitle>{tLkOg('contacts.organizer')}</FormSubTitle>
      <Field>
        <p className='auth-title__input'>{tLkOg('contacts.nameOfTheOrganization')}</p>
        <TextField
          name='nameOrganization'
          placeholder={tLkOg('contacts.nameOfTheOrganization')}
          variant='outlined'
          fullWidth
          error={touched.nameOrganization && Boolean(errors.nameOrganization)}
          helperText={touched.nameOrganization && errors.nameOrganization}
          onChange={handleChange}
          value={values.nameOrganization || ''}
        />
      </Field>

      <FieldsRow>
        <Field>
          <p className='auth-title__input'>{tLkOg('contacts.surname')}</p>
          <TextField
            name='lastName'
            placeholder={tLkOg('contacts.surname')}
            variant='outlined'
            fullWidth
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            onChange={handleChange}
            value={values.lastName || ''}
          />
        </Field>
        <Field>
          <p className='auth-title__input'>{tLkOg('contacts.name')}</p>
          <TextField
            name='firstName'
            placeholder={tLkOg('contacts.name')}
            variant='outlined'
            fullWidth
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            onChange={handleChange}
            value={values.firstName || ''}
          />
        </Field>
      </FieldsRow>

      <Field>
        <p className='auth-title__input'>{tLkOg('contacts.email')}</p>
        <TextField
          name='email'
          placeholder={tLkOg('contacts.email')}
          variant='outlined'
          fullWidth
          type='email'
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          value={values.email || ''}
        />
      </Field>

      <Field>
        <p className='auth-title__input'>{tLkOg('contacts.phoneNumber')}</p>
        <InputMask
          name={'phoneNumber'}
          onChange={(e) => setFieldValue('phoneNumber', `+${e.target.value.replace(/\D/gi, '')}`)}
          value={`${values.phoneNumber}`.replace(/\D/gi, '')}
          mask='+7(999) 999 99 99'
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      touched.phoneNumber && Boolean(errors.phoneNumber) && '#d32f2f !important',
                  },
                },
              }}
              variant='outlined'
              placeholder={'+7 (7'}
              error={Boolean(touched.phoneNumber) && errors.phoneNumber}
              InputProps={{
                endAdornment: <PhoneIcon />,
              }}
            />
          )}
        </InputMask>
      </Field>

      <FormHR />

      <FormSubTitle>{tLkOg('contacts.social')}</FormSubTitle>

      <Field>
        <p className='auth-title__input'>
          Facebook <span>({tLkOg('contacts.dispensable')})</span>
        </p>
        <TextField
          name='facebook'
          placeholder='ссылка'
          variant='outlined'
          fullWidth
          type='facebook'
          error={touched.facebook && Boolean(errors.facebook)}
          helperText={touched.facebook && errors.facebook}
          onChange={handleChange}
          value={values.facebook || ''}
        />
      </Field>

      <Field>
        <p className='auth-title__input'>
          Linkedin <span>({tLkOg('contacts.dispensable')})</span>
        </p>
        <TextField
          name='linkedin'
          placeholder='ссылка'
          variant='outlined'
          fullWidth
          type='linkedin'
          error={touched.linkedin && Boolean(errors.linkedin)}
          helperText={touched.linkedin && errors.linkedin}
          onChange={handleChange}
          value={values.linkedin || ''}
        />
      </Field>

      <Field>
        <p className='auth-title__input'>
          Instagram <span>({tLkOg('contacts.dispensable')})</span>
        </p>
        <TextField
          name='instagram'
          placeholder='ссылка'
          variant='outlined'
          fullWidth
          type='instagram'
          error={touched.instagram && Boolean(errors.instagram)}
          helperText={touched.instagram && errors.instagram}
          onChange={handleChange}
          value={values.instagram || ''}
        />
      </Field>

      <Field>
        <p className='auth-title__input'>
          VK <span>({tLkOg('contacts.dispensable')})</span>
        </p>
        <TextField
          name='vk'
          placeholder='ссылка'
          variant='outlined'
          fullWidth
          type='vk'
          error={touched.vk && Boolean(errors.vk)}
          helperText={touched.vk && errors.vk}
          onChange={handleChange}
          value={values.vk || ''}
        />
      </Field>

      <EventFormFooter>
        <Cancel type='button' onClick={() => routerPush('/lk-og/profile/events')}>
          {tLkOg('editEvent.cancel')}
        </Cancel>
        <Submit disabled={!isValid} type='submit'>
          {ctxStep?.contacts?.allFieldsFilled
            ? tLkOg('myEvents.save')
            : tLkOg('editEvent.sendToModeration')}
        </Submit>
      </EventFormFooter>
    </Form>
  )
}

export default EventContacts
