import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { motion } from 'framer-motion'
import { AuthButton } from '../../Authorization/Authorization'
import $api from '../../../../services/axios'
import { useDispatch } from 'react-redux'
import { getCookie, setCookie } from '../../../../services/JWTService'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { PasswordIcon } from '../../../../pages/auth/auth-reset-password'
import { useTranslation } from 'next-i18next'

const validationSchema = yup.object({
  lastName: yup
    .string()
    .test('lastName', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
    .required('Заполните поле'),
  firstName: yup
    .string()
    .test('firstName', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
    .required('Заполните поле'),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[A-Z]){8,}/gi,
      'Пароль должен состоять из [A-z] [0-9] и не быть слишком простым...',
    )
    .required('Заполните поле'),
})

const InputPersonalData = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { t: tAuth } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: unescape(getCookie('email')) || '',
      password: '',
    },
    onSubmit: async (values) => {
      if (
        formik.values.firstName &&
        !Boolean(formik.errors.firstName) &&
        formik.values.lastName &&
        !Boolean(formik.errors.lastName) &&
        formik.values.password &&
        !Boolean(formik.errors.password)
      ) {
        try {
          try {
            const { data: _data } = await $api.post('/accounts/athlete/', values)
            setCookie('token', _data.access, 999)
            setCookie('refresh', _data.refresh, 999999)
            toast.success(tAuth('toast.successActivation'))
            await router.push('/')
          } catch (e) {}
        } catch (e) {}
      }
    },
    validationSchema,
  })

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form
      animate={{ translateX: ['20%', '0%'] }}
      transition={{ duration: 0.5 }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          marginBottom: ' 14vh !important',
        }}
        className='auth-container'
      >
        <div className='auth-wrapper'>
          <h3 className='auth-title'>{tAuth('organizer.welcom')}</h3>
          <p className='auth-description'>{tAuth('regorganizerP')}</p>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridColumnGap: 24,
            }}
          >
            <div className='auth-wrapper__input'>
              <p className='auth-title__input'>{tCommon('form.fieldsNames.lastName')}</p>
              <TextField
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                name='lastName'
                value={formik.values.lastName}
                onChange={(e) =>
                  formik.setFieldValue(
                    'lastName',
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''),
                  )
                }
                placeholder={tCommon('form.fieldsNames.lastName')}
                variant='outlined'
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div className='auth-wrapper__input'>
              <p className='auth-title__input'>{tCommon('form.fieldsNames.firstName')}</p>
              <TextField
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                name='firstName'
                value={formik.values.firstName}
                onChange={(e) =>
                  formik.setFieldValue(
                    'firstName',
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''),
                  )
                }
                placeholder={tCommon('form.fieldsNames.firstName')}
                variant='outlined'
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
          </Box>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.email')}</p>
            <TextField
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.email && Boolean(formik.errors.email) && '#d32f2f !important',
                  },
                },
              }}
              value={formik.values.email}
              disabled
              name='email'
              variant='outlined'
              onChange={(e) => formik.setFieldValue('email', e.target.value)}
            />
          </div>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.password')}</p>
            <FormControl
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.password &&
                      Boolean(formik.errors.password) &&
                      '#d32f2f !important',
                  },
                },
              }}
              variant='outlined'
            >
              <OutlinedInput
                placeholder={tCommon('form.fieldsNames.password')}
                name='password'
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      <PasswordIcon show={showPassword} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && <Error>{formik.errors.password}</Error>}
            </FormControl>
          </div>

          <AuthButton
            active={
              formik.values.firstName &&
              !Boolean(formik.errors.firstName) &&
              formik.values.lastName &&
              !Boolean(formik.errors.lastName) &&
              formik.values.password &&
              !Boolean(formik.errors.password)
            }
            type='submit'
          >
            {tAuth('common.next')}
          </AuthButton>
        </div>
      </Box>
    </Form>
  )
}

const Form = styled(motion.form)``

const Error = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`

export default InputPersonalData
