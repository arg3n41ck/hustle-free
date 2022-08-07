import React, { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import styled from 'styled-components'
import { Box, TextField, Autocomplete, InputAdornment, IconButton } from '@mui/material'
import { ru } from 'date-fns/locale'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Radio from '../../../../ui/Radio'
import InputMask from 'react-input-mask'
import CustomButton from '../../../../ui/CustomButton'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import { PhoneIcon } from '../../../../../assets/svg/icons'
import { EmailIcon } from '../../../../../assets/svg/icons'
import { saveUser } from '../../../../../redux/components/user'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { theme } from '../../../../../styles/theme'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../../../redux/components/countriesAndCities'
import { fetchUser } from '../../../../../redux/components/user'
import { LocationIcon } from '../../../Events/EventsCatalog/EventsFilter'
import { decamelizeKeys } from 'humps'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { hide, show } from '../../../../../pages/auth/password/reset/confirm'
import $api from '../../../../../services/axios'
import { toast } from 'react-toastify'
import { normalizePhone } from '../../../../../helpers/phoneFormatter'

const emptyInitialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
  dateBirthday: '',
  age: '',
  role: '',
  country: '',
  city: '',
  avatar: '',
  nameOrganization: '',
  address: '',
  isVisible: true,
}

const ChangePasswordValues = {
  currentPassword: '',
  newPassword: '',
}

const Edits = () => {
  const {
    user: { user },
    countries: {
      countries: { data: countries },
    },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { push: routerPush } = useRouter()
  const [currentCities, setCurrentCities] = useState([])
  const [imageUrl, setImageUrl] = useState(null)
  const [, cities] = useSelector(selectCountriesAndCities)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { t: tCommon } = useTranslation('common')

  const { current: validationSchema } = useRef(
    yup.object({
      email: yup
        .string()
        .email(tCommon('validation.emailValid'))
        .required(tCommon('validation.emailRequired')),
      firstName: yup.string().required(tCommon('validation.required')),
      lastName: yup.string().required(tCommon('validation.required')),
      phoneNumber: yup
        .string()
        .nullable()
        .test({
          test: (value) => (normalizePhone(value) ? value.length === 12 : true),
          message: tCommon('validation.phoneNumberMin'),
        }),
      gender: yup.mixed().nullable().required(tCommon('validation.required')),
      dateBirthday: yup.date().nullable().required(tCommon('validation.required')),
      country: yup.string().required(tCommon('validation.required')).nullable(),
      city: yup.string().required(tCommon('validation.required')).nullable(),
    }),
  )

  const { current: validationSchemaChangePassword } = useRef(
    yup.object({
      currentPassword: yup
        .string()
        .test('', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
        .required('Заполните поле почты'),
      newPassword: yup
        .string()
        .test('', 'Заполните поле', (value) => !!(value || ' ').replace(/\s/g, ''))
        .required('Заполните поле почты')
        .min(8, 'Пароль должен содержать больше 8-ми символов'),
    }),
  )

  const formikForChangePassword = useFormik({
    initialValues: ChangePasswordValues,
    validationSchema: validationSchemaChangePassword,
    onSubmit: async (values, { resetForm }) => {
      try {
        await $api.patch('/accounts/users/me/', values)
        resetForm()
        toast.success(`Вы успешно изменили пароль!`)
      } catch (e) {
        if (!!e.response.data.current_password) {
          toast.error('Неверный старый пароль')
        } else if (!!e.response.data.new_password) {
          toast.warning('Этот пароль слишком распространен')
        } else {
          toast.error('Что-то пошло не так')
        }
      }
    },
  })

  const formik = useFormik({
    initialValues: !!user?.id ? { ...emptyInitialValues, ...user } : emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { avatar, ...rstValues } = values
        const currentCountry = countries.find((country) => country.id === values.country),
          currentCity = currentCountry?.cityCountry?.find((country) => country.id === values.city)
        const newValues = {
          ...decamelizeKeys({
            ...rstValues,
            dateBirthday:
              values.dateBirthday && format(new Date(values.dateBirthday), 'yyyy-MM-dd'),
            country: currentCountry.id,
            city: currentCity.id,
            visible: !!values.isVisible,
          }),
          avatar,
        }

        for (let key in newValues) {
          if (!newValues[key]) delete newValues[key]
        }
        
        if (typeof newValues.avatar === 'string') delete newValues.avatar
        const {isVisible, ...usersData} = newValues
        const { data: atheletesData } = await formDataHttp({isVisible}, `athletes/${user?.athleteId}/`, 'patch')
        const { data } = await formDataHttp({...usersData}, `accounts/users/me/`, 'patch')

        dispatch(saveUser({ ...newValues, ...data, atheletesData }))
        dispatch(fetchUser())
        await routerPush('/lk-ah/profile')
      } catch (e) {
        throw e
      }
    },
  })

  useEffect(() => {
    if (user) formik.setValues(user)
  }, [user])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.id === changeCountry.id)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values?.country === 'number') {
      const currentCountry = countries.find((country) => country.id === formik.values?.country)
      setCurrentCities(currentCountry.cityCountry)
    }

    !countries?.length && dispatch(fetchCountries())
  }, [])

  const uploadImageToClient = (event) => {
    if (event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  if (!user?.id && !countries?.length && !currentCities?.length) {
    return <div />
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header>
        <TitleHeader>{tCommon('form.titles.profileEdit')}</TitleHeader>
      </Header>
      <Content>
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
              sx={{ width: '100%' }}
              name='lastName'
              value={formik.values?.lastName}
              onChange={(e) =>
                formik.setFieldValue('lastName', e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''))
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
              sx={{ width: '100%' }}
              name='firstName'
              value={formik.values?.firstName}
              onChange={(e) =>
                formik.setFieldValue('firstName', e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''))
              }
              placeholder={tCommon('form.fieldsNames.firstName')}
              variant='outlined'
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </div>
        </Box>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              display: 'flex',
            },
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: 24,
          }}
          className='auth-wrapper__input'
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.birthDate')}</p>
            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                toolbarTitle={'Выбрать дату'}
                cancelText={'Отмена'}
                value={formik.values?.dateBirthday}
                onChange={(value) =>
                  formik.setFieldValue('dateBirthday', value && format(value, 'yyyy-MM-dd'))
                }
                inputFormat='dd/MM/yyyy'
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(formik.touched.dateBirthday) && formik.errors.dateBirthday}
                    helperText={formik.touched.dateBirthday && formik.errors.dateBirthday}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: 'ДД/ММ/ГГГГ',
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>
              {tCommon('form.fieldsNames.phoneNumber')} ({tCommon('form.fieldsNames.notNecessary')})
            </p>
            <InputMask
              name={'phoneNumber'}
              onChange={(e) => {
                if (normalizePhone(e.target.value || '') === '7') {
                  formik.setFieldValue('phoneNumber', '')
                } else formik.setFieldValue('phoneNumber', `+${e.target.value.replace(/\D/gi, '')}`)
              }}
              value={`${formik.values?.phoneNumber || ''}`.replace(/\D/gi, '')}
              mask='+7(999) 999 99 99'
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{ width: '100%' }}
                  variant='outlined'
                  placeholder={'+7 (7'}
                  error={Boolean(formik.touched.phoneNumber) && formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  InputProps={{
                    endAdornment: <PhoneIcon />,
                  }}
                />
              )}
            </InputMask>
          </div>
        </Box>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              display: 'flex',
            },
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: 24,
          }}
          className='auth-wrapper__input'
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.country')}</p>
            <Autocomplete
              noOptionsText={'Ничего не найдено'}
              onChange={(_, value) => [
                changeCurrentCities(value),
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
                  fullWidth
                  placeholder={tCommon('form.fieldsNames.country')}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.city')}</p>

            <Autocomplete
              noOptionsText={'Ничего не найдено'}
              onChange={(_, value) => formik.setFieldValue('city', value?.id || null)}
              options={countries.find(({ id }) => id === formik.values?.country)?.cityCountry || []}
              getOptionLabel={(option) => option?.name}
              value={cities.find(({ id }) => id === formik.values.city) || null}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder={tCommon('form.fieldsNames.city')}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>
        </Box>

        <Box
          sx={{
            '& .MuiFormControl-root': {
              display: 'flex',
            },
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: 24,
          }}
          className='auth-wrapper__input'
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.gender.label')}</p>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <RadioWrapper>
                <Radio
                  text={tCommon('form.fieldsNames.gender.female')}
                  checked={formik.values?.gender === 'female'}
                  onChange={() => formik.setFieldValue('gender', 'female')}
                />
              </RadioWrapper>
              <RadioWrapper>
                <Radio
                  text={tCommon('form.fieldsNames.gender.male')}
                  checked={formik.values?.gender === 'male'}
                  onChange={() => formik.setFieldValue('gender', 'male')}
                />
              </RadioWrapper>
            </Box>
            {!!(formik.touched?.gender && Boolean(formik.errors?.gender)) && (
              <Error>{formik.errors?.gender}</Error>
            )}
          </div>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.profileType')}</p>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <RadioWrapper>
                <Radio
                  text={tCommon('form.fieldsNames.open')}
                  checked={formik.values?.isVisible}
                  onChange={() => formik.setFieldValue('isVisible', true)}
                />
              </RadioWrapper>
              <RadioWrapper>
                <Radio
                  text={tCommon('form.fieldsNames.close')}
                  checked={!formik.values?.isVisible}
                  onChange={() => formik.setFieldValue('isVisible', false)}
                />
              </RadioWrapper>
            </Box>
          </div>
        </Box>

        <Line />

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.email')}</p>
          <TextField
            sx={{ width: '100%' }}
            name='email'
            value={formik.values?.email}
            placeholder={tCommon('form.fieldsNames.email')}
            variant='outlined'
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
          />
        </div>

        <form>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.oldPassword')}</p>
            <TextField
              placeholder={tCommon('form.fieldsNames.enterOldPassword')}
              type={showPassword ? 'text' : 'password'}
              value={formikForChangePassword.values.currentPassword}
              name='currentPassword'
              fullWidth
              error={
                formikForChangePassword.touched.currentPassword &&
                Boolean(formikForChangePassword.errors.currentPassword)
              }
              helperText={
                formikForChangePassword.touched.currentPassword &&
                formikForChangePassword.errors.currentPassword
              }
              onChange={formikForChangePassword.handleChange}
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
            <p className='auth-title__input'>{tCommon('form.fieldsNames.newPassword')}</p>
            <TextField
              placeholder={tCommon('form.fieldsNames.enterNewPassword')}
              type={showPassword2 ? 'text' : 'password'}
              fullWidth
              value={formikForChangePassword.values.newPassword}
              name='newPassword'
              onChange={formikForChangePassword.handleChange}
              error={
                formikForChangePassword.touched.newPassword &&
                Boolean(formikForChangePassword.errors.newPassword)
              }
              helperText={
                formikForChangePassword.touched.newPassword &&
                formikForChangePassword.errors.newPassword
              }
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

          <ButtonWrapper width={'100%'} onClick={formikForChangePassword.handleSubmit}>
            <CustomButton
              disabled={
                !formikForChangePassword.values.newPassword.length ||
                !formikForChangePassword.values.currentPassword.length
              }
              typeButton={
                !!formikForChangePassword.values.newPassword.length &&
                !!formikForChangePassword.values.currentPassword.length
                  ? 'primary'
                  : 'secondary'
              }
            >
              {tCommon('form.fieldsNames.save')}
            </CustomButton>
          </ButtonWrapper>
        </form>
      </Content>

      <Footer>
        <div className='auth-wrapper__input'>
          <h3 className='auth-title'>{tCommon('form.fieldsNames.profileAvatar.label')}</h3>
          <Description>{tCommon('form.fieldsNames.profileAvatar.description')}</Description>
          <AvatarWrapper>
            <FileUploadLabel htmlFor={'startup-logo'} hasAvatar={formik.values?.avatar}>
              <input
                id={'avatar'}
                name={'avatar'}
                accept='image/*'
                onChange={(e) => {
                  uploadImageToClient(e)
                  const file = e.target.files[0]
                  formik.setFieldValue('avatar', file)
                }}
                type='file'
              />
              {!formik.values?.avatar && (
                <AvatarInfo>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M25.2828 14H27.7172V9.60451H32V7.26025H27.7172V3H25.2828V7.26025H21V9.60451H25.2828V14Z'
                      fill='#6D4EEA'
                    />
                    <path
                      d='M25.6666 19.7623V15.6H28V24.5C28 26.4297 26.4297 28 24.5 28H3.5C1.77798 28 0.349915 26.7471 0.061737 25.1067C0.0104675 24.9736 0.00341797 24.8324 0.0198669 24.6925C0.0182718 24.6638 0.014245 24.6357 0.0102305 24.6078C0.00510551 24.5722 0 24.5367 0 24.5V10.5C0 8.57034 1.57034 7 3.5 7H19.4V9.3334H3.5C2.85721 9.3334 2.3334 9.85721 2.3334 10.5V22.0955L6.71994 17.7089C7.51675 16.9108 8.81537 16.9108 9.61325 17.7089L11.0834 19.1789L16.6367 13.6255C17.4336 12.8274 18.732 12.8274 19.5301 13.6255L25.6666 19.7623Z'
                      fill='#6D4EEA'
                    />
                    <path
                      d='M8.1666 12.8334C8.1666 14.122 7.12198 15.1666 5.8334 15.1666C4.54462 15.1666 3.5 14.122 3.5 12.8334C3.5 11.5446 4.54462 10.5 5.8334 10.5C7.12198 10.5 8.1666 11.5446 8.1666 12.8334Z'
                      fill='#6D4EEA'
                    />
                  </svg>
                </AvatarInfo>
              )}
              {!!formik.values?.avatar && (
                <ImageS
                  src={typeof formik.values?.avatar === 'string' ? formik.values?.avatar : imageUrl}
                />
              )}
            </FileUploadLabel>

            <div>
              <Description style={{ margin: 0 }}>
                {tCommon('form.fieldsNames.profileAvatar.rules4mb')}
              </Description>
            </div>
          </AvatarWrapper>
          {formik.touched?.avatar && Boolean(formik.errors?.avatar) && (
            <Error>{formik.errors?.avatar}</Error>
          )}
        </div>
      </Footer>

      <DeleteProfileContent>
        {tCommon('form.fieldsNames.deleteProfile.extra')}
        <Link href={`/auth/delete/${user?.id}`}>
          <a>
            <span>{tCommon('form.fieldsNames.deleteProfile.label')}</span>
          </a>
        </Link>
      </DeleteProfileContent>

      <Footer>
        <ButtonWrapper onClick={() => routerPush('/lk-ah/profile')}>
          <CustomButton type={'button'} typeButton={'secondary'}>
            {tCommon('form.fieldsNames.cancel')}
          </CustomButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <CustomButton type={'submit'} typeButton={'primary'}>
            {tCommon('form.fieldsNames.save')}
          </CustomButton>
        </ButtonWrapper>
      </Footer>
    </form>
  )
}

const Line = styled.div`
  border: 1px solid #333333;
  margin: 32px 0;
`

const DeleteProfileContent = styled.div`
  border-top: 1px solid #333333;
  padding: 32px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;

  a {
    margin-left: 5px;
    text-decoration: underline;
  }
`

const ImageS = styled.img`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const Header = styled.div`
  padding: 32px;
  border-bottom: 1px solid #333333;
`

const Content = styled.div`
  padding: 32px;
`

const RadioWrapper = styled.div`
  display: flex;
  margin-right: 32px;
`

const Footer = styled.div`
  border-top: 1px solid #333333;
  padding: 32px;
  display: flex;
  justify-content: flex-end;
`
const ButtonWrapper = styled.div`
  max-width: ${({ width }) => (width ? width : '256px')};
  width: 100%;
  &:first-child {
    margin-right: 32px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  ${theme.mqMax('md')} {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const AvatarInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
`

const Description = styled.p`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-bottom: 16px;
`

const FileUploadLabel = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 2px dashed #6d4eea;
  border-radius: 8px;
  width: 100%;
  max-width: 112px;
  font-size: 18px;
  margin-right: 24px;
  line-height: 24px;
  height: 112px;

  input[type='file'] {
    top: 0;
    right: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
  }
  span {
    color: #6d4eea;
  }
`

const Error = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
`

export default Edits
