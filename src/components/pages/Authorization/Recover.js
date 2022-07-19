import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import { Box, TextField } from '@mui/material'
import Link from 'next/link'
import { motion } from 'framer-motion'
import $api from '../../../services/axios'
import AuthInfo from '../../ui/modals/AuthInfo'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const variants = {
  open: { opacity: 1, transaction: 5 },
  closed: { opacity: 0, transaction: 5 },
}

const Recover = ({ onView }) => {
  const [toggleInfoModal, setToggleInfoModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const { locale } = useRouter()
  const { t: tAuth } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')

  const { current: validationSchema } = useRef(
    yup.object({
      email: yup
        .string()
        .email(tCommon('validation.emailValid'))
        .required(tCommon('validation.emailRequired')),
    }),
  )

  const formik = useFormik({
    initialValues: {
      email: '',
      language: typeof window !== 'undefined' ? window.localStorage.getItem('locale') : 'ru',
    },
    onSubmit: async (values) => {
      try {
        await $api.post('/accounts/auth/users/reset_password/', {
          ...values,
          language: locale,
        })
        setToggleInfoModal(true)
        setErrorMessage(null)
      } catch (e) {
        if (e?.response?.data[0] === 'User with given email does not exist.') {
          setErrorMessage(
            `${tAuth('toast.userNotFoundP1')} ${values.email} ${tAuth('toast.userNotFoundP2')}`,
          )
        }
      }
    },
    validationSchema,
  })

  return (
    <Form
      animate={{ translateX: ['20%', '0%'] }}
      transition={{ duration: 0.5 }}
      onSubmit={formik.handleSubmit}
    >
      <div className='auth-container'>
        <ModalWrapperAnimate animate={toggleInfoModal ? 'open' : 'closed'} variants={variants}>
          {toggleInfoModal && (
            <AuthInfo
              title={tAuth('toast.perfect')}
              text={`${tAuth('toast.sendToEmailP1')} ${formik.values.email} ${tAuth(
                'toast.sendToEmailP1',
              )}`}
              toggleShow={setToggleInfoModal}
            />
          )}
        </ModalWrapperAnimate>
        <div className='auth-wrapper'>
          <h3 className='auth-title'>{tAuth('recover.forgotPasswordH1')}</h3>
          <p className='auth-description'>{tAuth('recover.forgotPasswordP')}</p>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tAuth('common.email')}</p>
            <TextField
              sx={{ width: '100%' }}
              name='email'
              onChange={formik.handleChange}
              placeholder={tAuth('common.email')}
              variant='outlined'
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: (
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='4'
                      y='6'
                      width='16'
                      height='12'
                      rx='2'
                      stroke='#828282'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9'
                      stroke='#828282'
                      strokeWidth='1.5'
                    />
                  </svg>
                ),
              }}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>

          <AuthButton active={formik.values.email && !Boolean(formik.errors.email)} type='submit'>
            {tAuth('common.confirm')}
          </AuthButton>

          <div className='auth-additionally'>
            <Box
              sx={{ marginBottom: 0.8, textAlign: 'center' }}
              className='auth-additionally__text'
              component='p'
            >
              {tAuth('common.alreadyHaveAccount')}{' '}
              <span onClick={() => onView('login')} className='auth-link'>
                {tAuth('login.login')}
              </span>
            </Box>
            <Box sx={{ textAlign: 'center' }} className='auth-additionally__text' component='p'>
              {tAuth('common.hasntAccount')}{' '}
              <Link href='/#user-roles' passHref>
                <a className='auth-link'>{tAuth('common.signUp')}</a>
              </Link>
            </Box>
          </div>
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
const ModalWrapperAnimate = styled(motion.div)`
  width: 100%;
  margin-top: 60vh;
  max-width: 592px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
`
const ErrorMessage = styled.p`
  color: #eb5757;
  margin: 4px;
  font-size: 13px;
`

export default Recover
