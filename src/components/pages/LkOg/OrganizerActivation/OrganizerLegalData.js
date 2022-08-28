import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { TextField, Autocomplete } from '@mui/material'
import { motion } from 'framer-motion'
import { AuthButton } from '../../Authorization/Authorization'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectCountriesAndCities } from '../../../../redux/components/countriesAndCities'
import { LocationIcon } from '../../Events/EventsCatalog/EventsFilter'
import { useTranslation } from 'next-i18next'

const OrganizerLegalData = ({ dataPersonal, onSubmit, data }) => {
  const { t: tAuth } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')
  const [countries, cities] = useSelector(selectCountriesAndCities)

  const { current: validationSchema } = useRef(
    yup.object({
      nameOrganizer: yup
        .string()
        .test(
          'nameOrganizer',
          tCommon('validation.required'),
          (value) => !!(value || '').replace(/\s/g, ''),
        )
        .required(tCommon('validation.required')),
      country: yup
        .string()
        .nullable()
        .test(
          'country',
          tCommon('validation.required'),
          (value) => value !== 'default' && !!(value || '').replace(/\s/g, ''),
        )
        .required(tCommon('validation.required')),
      city: yup
        .string()
        .nullable()
        .test(
          'city',
          tCommon('validation.required'),
          (value) => value !== 'default' && !!(value || '').replace(/\s/g, ''),
        )
        .required(tCommon('validation.required')),
    }),
  )

  const formik = useFormik({
    initialValues: {
      nameOrganizer: !!data?.name_organization ? data.name_organization : '',
      country: !!data?.country ? data.country : null,
      city: !!data?.city ? data.city : null,
      actualAddress: !!data?.actual_address ? data.actual_address : '',
      legalName: !!data?.legal_name ? data.legal_name : '',
      legalAddress: !!data?.legal_address ? data.legal_address : '',
      bin: !!data?.bin ? data.bin : '',
      number: !!data?.number ? data.number : '',
      swift: !!data?.swift ? data.swift : '',
      bankName: !!data?.bank_name ? data.bank_name : '',
    },
    onSubmit: async (values) => {
      if (
        formik.values.nameOrganizer &&
        !Boolean(formik.errors.nameOrganizer) &&
        formik.values.country &&
        !Boolean(formik.errors.country) &&
        formik.values.city &&
        !Boolean(formik.errors.city)
      ) {
        toast.info(tCommon('form.status.waitForServer'))
        const data = {
          ...dataPersonal,
          name_organization: values.nameOrganizer,
          country: values.country,
          city: values.city,
          address: values.actualAddress,
          legal_name: values.legalName,
          legal_address: values.legalAddress,
          bin: values.bin,
          number: values.number,
          swift: values.swift,
          bank_name: values.bankName,
        }
        if (data.phone_number === '+') delete data.phone_number

        for (let key in data) {
          if (!data[key]) delete data[key]
        }

        await onSubmit({ ...data, ...dataPersonal })
      }
    },
    validationSchema,
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>{tCommon('form.fieldsNames.organizationName')}</p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.nameOrganizer &&
                  Boolean(formik.errors.nameOrganizer) &&
                  '#d32f2f !important',
              },
            },
          }}
          value={formik.values.nameOrganizer}
          name='nameOrganizer'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.organizationName')}
          variant='outlined'
          error={formik.touched.nameOrganizer && Boolean(formik.errors.nameOrganizer)}
          helperText={formik.touched.nameOrganizer && formik.errors.nameOrganizer}
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>{tCommon('form.fieldsNames.country')}</p>
        <Autocomplete
          noOptionsText={tAuth('common.noOptionsText')}
          onChange={(_, value) => [
            formik.setFieldValue('country', value?.id || null),
            formik.setFieldValue('city', ''),
          ]}
          options={countries.map((option) => option) || []}
          getOptionLabel={(option) => option.name}
          value={countries.find(({ id }) => id === formik.values?.country) || null}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.country &&
                      Boolean(formik.errors.country) &&
                      '#d32f2f !important',
                  },
                },
              }}
              fullWidth
              placeholder={tCommon('form.fieldsNames.country')}
              InputProps={{
                ...params.InputProps,
                startAdornment: <LocationIcon />,
              }}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          )}
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>{tCommon('form.fieldsNames.city')}</p>
        <Autocomplete
          noOptionsText={tAuth('common.noOptionsText')}
          onChange={(_, value) => formik.setFieldValue('city', value?.id || null)}
          options={countries.find(({ id }) => id === formik.values?.country)?.cityCountry || []}
          getOptionLabel={(option) => option?.name}
          value={cities.find(({ id }) => id === formik.values.city) || null}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.city && Boolean(formik.errors.city) && '#d32f2f !important',
                  },
                },
              }}
              fullWidth
              placeholder={tCommon('form.fieldsNames.city')}
              InputProps={{
                ...params.InputProps,
                startAdornment: <LocationIcon />,
              }}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          )}
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.actualAddress')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.actualAddress &&
                  Boolean(formik.errors.actualAddress) &&
                  '#d32f2f !important',
              },
            },
          }}
          value={formik.values.actualAddress}
          name='actualAddress'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.actualAddress')}
          variant='outlined'
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.legalName')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.legalName &&
                  Boolean(formik.errors.legalName) &&
                  '#d32f2f !important',
              },
            },
          }}
          value={formik.values.legalName}
          name='legalName'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.legalName')}
          variant='outlined'
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.legalAddress')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{ width: '100%', marginBottom: 3 }}
          value={formik.values.legalAddress}
          name='legalAddress'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.legalAddress')}
          variant='outlined'
        />
      </div>

      <h3 className='auth-title'>{tCommon('form.fieldsNames.requisites')}</h3>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.bin')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.bin && Boolean(formik.errors.bin) && '#d32f2f !important',
              },
            },
          }}
          value={formik.values.bin}
          name='bin'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.bin')}
          variant='outlined'
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.iban')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.number && Boolean(formik.errors.number) && '#d32f2f !important',
              },
            },
          }}
          value={formik.values.number}
          name='number'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.iban')}
          variant='outlined'
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          SWIFT{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': {
                borderColor:
                  formik.touched.swift && Boolean(formik.errors.swift) && '#d32f2f !important',
              },
            },
          }}
          value={formik.values.swift}
          name='swift'
          onChange={formik.handleChange}
          placeholder='SWIFT'
          variant='outlined'
        />
      </div>

      <div className='auth-wrapper__input'>
        <p className='auth-title__input'>
          {tCommon('form.fieldsNames.bankName')}{' '}
          <span style={{ color: '#828282' }}>({tCommon('form.fieldsNames.notNecessary')})</span>
        </p>
        <TextField
          sx={{ width: '100%', marginBottom: 5 }}
          value={formik.values.bankName}
          name='bankName'
          onChange={formik.handleChange}
          placeholder={tCommon('form.fieldsNames.bankName')}
          variant='outlined'
        />
      </div>

      <AuthButton
        active={
          formik.values.nameOrganizer &&
          !Boolean(formik.errors.nameOrganizer) &&
          formik.values.country &&
          !Boolean(formik.errors.country) &&
          formik.values.city &&
          !Boolean(formik.errors.city)
        }
        type='submit'
      >
        {tAuth('common.next')}
      </AuthButton>
    </Form>
  )
}

const Form = styled(motion.form)``

export default OrganizerLegalData
