import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import $api from '../../services/axios'
import { useRouter } from 'next/router'
import { hide, show } from './password/reset/confirm'
import { toast } from 'react-toastify'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const getErrorRes = (key) => {
  switch (key) {
    case 'current_password':
      return 'Неверно введен текущий пароль'
    default:
      return 'Пароль должен состоять из [A-Z] [0-9] и не быть слишком простым.'
  }
}

const validationSchema = yup.object({
  currentPassword: yup
    .string()
    .test('', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
    .required('Заполните поле почты'),
  newPassword: yup
    .string()
    .test('', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
    .required('Заполните поле почты')
    .min(8, 'Пароль должен содержать больше 8-ми символов'),
  repeatPassword: yup
    .string()
    .required('Введите подтверждение пароля')
    .oneOf([yup.ref('newPassword'), null], 'Пароли не совпадают'),
})

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { push: routerPush } = useRouter()
  const { values, errors, touched, isValid, handleSubmit, handleChange } = useFormik({
    initialValues: {
      newPassword: '',
      currentPassword: '',
      repeatPassword: '',
    },
    onSubmit: async ({ newPassword, currentPassword }) => {
      try {
        await $api.post('/accounts/auth/users/set_password/', {
          newPassword,
          currentPassword,
        })
        toast.success(`Вы успешно изменили пароль!`)
        await routerPush('/')
      } catch (e) {
        const error = e?.response?.data
        console.log(error)
        error
          ? setErrorMessage(getErrorRes(Object.keys(error)?.[0]))
          : toast.error('Что-то пошло не так')
      }
    },
    validationSchema,
  })

  return (
    <Form
      animate={{ translateX: ['20%', '0%'] }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div className='auth-container'>
        <div className='auth-wrapper'>
          <h3 className='auth-title'>Изменить пароль</h3>
          <p className='auth-description'>Заполните поля, чтобы изменить пароль</p>
          <div className='auth-wrapper__input'>
            <FormControl sx={{ width: '100%' }} variant='outlined'>
              <div className='auth-wrapper__input'>
                <p className='auth-title__input'>Текущий пароль</p>
                <TextField
                  value={values.currentPassword}
                  name='currentPassword'
                  onChange={handleChange}
                  placeholder='Введите текущий пароль'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  error={touched.currentPassword && Boolean(errors.currentPassword)}
                  helperText={touched.currentPassword && errors.currentPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge='end'
                        >
                          {showPassword ? show : hide}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className='auth-wrapper__input'>
                <p className='auth-title__input'>Новый пароль</p>
                <TextField
                  value={values.newPassword}
                  name='newPassword'
                  onChange={handleChange}
                  placeholder='Введите новый пароль'
                  type={showPassword2 ? 'text' : 'password'}
                  fullWidth
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword2((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge='end'
                        >
                          {showPassword2 ? show : hide}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className='auth-wrapper__input'>
                <p className='auth-title__input'>Повторите пароль</p>
                <TextField
                  value={values.repeatPassword}
                  name='repeatPassword'
                  onChange={handleChange}
                  placeholder='Повторите пароль'
                  type={showPassword3 ? 'text' : 'password'}
                  fullWidth
                  error={touched.repeatPassword && Boolean(errors.repeatPassword)}
                  helperText={touched.repeatPassword && errors.repeatPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword3((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge='end'
                        >
                          {showPassword3 ? show : hide}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormControl>
          </div>

          <AuthButton disabled={!isValid} active={isValid} type='submit'>
            Подтвердить
          </AuthButton>
        </div>
      </div>
    </Form>
  )
}

const Form = styled(motion.form)`
  min-height: 87vh;
`
export const AuthButton = styled.button`
  width: 100%;
  background: ${(p) => (p.active ? 'linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)' : '#F2F2F2')};
  border-radius: 12px;
  height: 64px;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #${(p) => (p.active ? 'fff' : '828282')};
`
const ErrorMessage = styled.p`
  color: #eb5757;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
`
export default NewPassword

export const PasswordIcon = (show) => {
  return show ? (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z'
        fill='#333333'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.3421 9.22069C13.615 9.37575 14.6243 10.385 14.7793 11.6579L15.9202 12.7988ZM9.54012 10.6614C9.32325 11.059 9.2 11.5151 9.2 12C9.2 13.5464 10.4536 14.8 12 14.8C12.4849 14.8 12.941 14.6768 13.3386 14.4599L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.54012 10.6614Z'
        fill='#333333'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.2268 17.3482L15.3455 16.4669C14.2994 17.032 13.1681 17.4 11.9999 17.4C10.3573 17.4 8.78766 16.6725 7.42544 15.6924C6.06796 14.7157 4.96717 13.5246 4.27501 12.6843C4.06993 12.4353 3.95894 12.2981 3.89048 12.1833C3.8374 12.0943 3.82964 12.0508 3.82964 12C3.82964 11.9493 3.8374 11.9057 3.89048 11.8167C3.95894 11.702 4.06993 11.5648 4.27501 11.3158C4.9435 10.5041 5.99317 9.36534 7.28712 8.40856L6.42991 7.55135C5.09508 8.56386 4.02745 9.72884 3.34875 10.5529L3.28522 10.6297C2.9596 11.0225 2.62964 11.4206 2.62964 12C2.62964 12.5794 2.9596 12.9775 3.28522 13.3704L3.34875 13.4472C4.07669 14.331 5.25205 15.607 6.72462 16.6665C8.19246 17.7225 10.0068 18.6 11.9999 18.6C13.5417 18.6 14.9766 18.0749 16.2268 17.3482ZM9.11292 5.99173C10.014 5.62814 10.9837 5.40002 11.9999 5.40002C13.993 5.40002 15.8074 6.27752 17.2752 7.33357C18.7478 8.39302 19.9231 9.66906 20.6511 10.5529L20.7146 10.6297C21.0402 11.0225 21.3702 11.4206 21.3702 12C21.3702 12.5794 21.0402 12.9775 20.7146 13.3704L20.6511 13.4472C20.1694 14.032 19.4918 14.7886 18.6617 15.5406L17.8121 14.6909C18.6046 13.9781 19.2578 13.2513 19.7248 12.6843C19.9299 12.4353 20.0409 12.2981 20.1093 12.1833C20.1624 12.0943 20.1702 12.0508 20.1702 12C20.1702 11.9493 20.1624 11.9057 20.1093 11.8167C20.0409 11.702 19.9299 11.5648 19.7248 11.3158C19.0327 10.4754 17.9319 9.28431 16.5744 8.30766C15.2122 7.3276 13.6425 6.60002 11.9999 6.60002C11.3343 6.60002 10.6807 6.71949 10.048 6.9268L9.11292 5.99173Z'
        fill='#828282'
      />
      <path d='M5 2L21 18' stroke='#333333' strokeWidth='1.2' />
    </svg>
  ) : (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12' cy='12' r='3.25' fill='#828282' stroke='#828282' strokeWidth='1.5' />
      <path
        d='M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z'
        stroke='#828282'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'auth', 'footer'])),
  },
})
