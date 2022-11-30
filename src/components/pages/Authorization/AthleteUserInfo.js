import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import styled from 'styled-components'
import { Box, TextField, Autocomplete, useMediaQuery } from '@mui/material'
import { ru } from 'date-fns/locale'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Radio from '../../ui/Radio'
import InputMask from 'react-input-mask'
import CustomButton from '../../ui/CustomButton'
import { PhoneIcon } from '../../../assets/svg/icons'
import { saveUser } from '../../../redux/components/user'
import { format } from 'date-fns'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../redux/components/countriesAndCities'
import { fetchUser } from '../../../redux/components/user'
import { LocationIcon } from '../Events/EventsCatalog/EventsFilter'
import { decamelizeKeys } from 'humps'
import { formDataHttp } from '../../../helpers/formDataHttp'
import { normalizePhone } from '../../../helpers/phoneFormatter'

const validationSchema = yup.object({
  firstName: yup.string().required('Обязательное поле'),
  lastName: yup.string().required('Обязательное поле'),
  phoneNumber: yup.string().test({
    test: (value) => (normalizePhone(value) ? value.length === 12 : true),
    message: 'Номер телефона должен быть не менее 12 символов',
  }),
  gender: yup.mixed().required('Обязательное поле'),
  dateBirthday: yup.mixed().nullable().required('Обязательное поле'),
  country: yup.string().required('Обязательное поле').nullable(),
  city: yup.string().required('Обязательное поле').nullable(),
})

const AthleteUserInfo = () => {
  const {
    user: { user },
    countries: {
      countries: { data: countries },
    },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [currentCities, setCurrentCities] = useState([])
  const [, cities] = useSelector(selectCountriesAndCities)
  const md = useMediaQuery('(max-width: 768px)')

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      gender: user?.gender || '',
      dateBirthday: user?.dateBirthday || null,
      country: user?.country?.id || null,
      city: user?.city?.id || null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const newValues = {
          ...decamelizeKeys({
            ...values,
            dateBirthday:
              values.dateBirthday && format(new Date(values.dateBirthday), 'yyyy-MM-dd'),
          }),
        }

        for (let key in newValues) {
          if (!newValues[key]) delete newValues[key]
        }
        const { data } = await formDataHttp(newValues, `accounts/users/me/`, 'patch')

        dispatch(saveUser({ ...newValues, ...data }))
        dispatch(fetchUser())
      } catch (e) {
        throw e
      }
    },
  })

  useEffect(() => {
    formik.handleSubmit()
  }, [])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.id === changeCountry.id)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values?.country === 'number') {
      const currentCountry = countries.find((country) => country.id === formik.values?.country)
      currentCountry && setCurrentCities(currentCountry?.cityCountry)
    }

    !countries?.length && dispatch(fetchCountries())
  }, [])

  if (!user?.id && !countries?.length && !currentCities?.length) {
    return <div />
  }

  return (
    <FormWrapper>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: md ? '1fr' : '1fr 1fr',
            gridColumnGap: 24,
          }}
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Фамилия</p>
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
              value={formik.values?.lastName}
              onChange={(e) =>
                formik.setFieldValue('lastName', e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''))
              }
              placeholder='Фамилия'
              variant='outlined'
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Имя</p>
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
              value={formik.values?.firstName}
              onChange={(e) =>
                formik.setFieldValue('firstName', e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, ''))
              }
              placeholder='Имя'
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
            gridTemplateColumns: md ? '1fr' : '1fr 1fr',
            gridColumnGap: 24,
          }}
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Дата рождения</p>
            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                toolbarTitle={'Выбрать дату'}
                cancelText={'Отмена'}
                disableCloseOnSelect={false}
                value={formik.values?.dateBirthday}
                onChange={(value) =>
                  formik.setFieldValue(
                    'dateBirthday',
                    !!(value instanceof Date && !isNaN(value.valueOf())) &&
                      format(value, 'yyyy-MM-dd'),
                  )
                }
                inputFormat='dd/MM/yyyy'
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                          borderColor:
                            formik.touched.dateBirthday &&
                            Boolean(formik.errors.dateBirthday) &&
                            '#d32f2f !important',
                        },
                      },
                    }}
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
            <p className='auth-title__input'>Номер телефона (не обязательно)</p>
            <InputMask
              name={'phoneNumber'}
              onChange={(e) =>
                formik.setFieldValue('phoneNumber', `+${e.target.value.replace(/\D/gi, '')}`)
              }
              value={`${formik.values?.phoneNumber}`.replace(/\D/gi, '')}
              mask='+7(999) 999 99 99'
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{
                    width: '100%',
                  }}
                  variant='outlined'
                  placeholder={'+7 (7'}
                  error={Boolean(formik.touched.phoneNumber) && formik.errors.phoneNumber}
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
            gridTemplateColumns: md ? '1fr' : '1fr 1fr',
            gridColumnGap: 24,
          }}
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Страна</p>
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
                  placeholder='Страна'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                  error={Boolean(formik.touched.country) && formik.errors.country}
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
            />
          </div>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Город</p>

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
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor:
                          formik.touched.city &&
                          Boolean(formik.errors.city) &&
                          '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  placeholder='Город'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <LocationIcon />,
                  }}
                  error={Boolean(formik.touched.city) && formik.errors.city}
                  helperText={formik.touched.city && formik.errors.city}
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
            margin: '0 !important',
            display: 'grid',
            gridTemplateColumns: md ? '1fr' : '1fr 1fr',
            gridColumnGap: 24,
          }}
          className='auth-wrapper__input'
        >
          <div style={{ margin: 0 }} className='auth-wrapper__input'>
            <p className='auth-title__input'>Пол</p>
            <Box sx={{ display: 'flex' }}>
              <RadioWrapper>
                <Radio
                  text={'Женский'}
                  checked={formik.values?.gender === 'female'}
                  onChange={() => formik.setFieldValue('gender', 'female')}
                />
              </RadioWrapper>
              <RadioWrapper>
                <Radio
                  text={'Мужской'}
                  checked={formik.values?.gender === 'male'}
                  onChange={() => formik.setFieldValue('gender', 'male')}
                />
              </RadioWrapper>
            </Box>
            {Boolean(formik.touched?.gender) && formik.errors?.gender && (
              <ErrorMessage>{formik.errors.gender}</ErrorMessage>
            )}
          </div>

          <div style={{ marginTop: 10 }} className='auth-wrapper__input'>
            {formik.dirty && (
              <ButtonWrapper>
                <CustomButton
                  borderRadius={md ? '4px' : '16px'}
                  height={md ? '40px' : '64px'}
                  type={'submit'}
                  typeButton={'primary'}
                >
                  Сохранить
                </CustomButton>
              </ButtonWrapper>
            )}
          </div>
        </Box>
      </form>
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`

const RadioWrapper = styled.div`
  display: flex;
  margin-right: 32px;
`

const ButtonWrapper = styled.div`
  max-width: 256px;
  width: 100%;
  margin: 0 32px 0 auto;
`
const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.75rem;
`

export default AthleteUserInfo
