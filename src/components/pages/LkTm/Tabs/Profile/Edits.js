import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { fetchUser, saveUser } from '../../../../../redux/components/user'
import styled from 'styled-components'
import { Box, Checkbox, MenuItem, TextField } from '@mui/material'
import SelectUI from '../../../../ui/Selects/Select'
import CustomButton from '../../../../ui/CustomButton'
import Image from 'next/image'
import { decamelizeKeys } from 'humps'
import { normalizePhone } from '../../../../../helpers/phoneFormatter'

import { DefaultPhoneIcon } from '../../../../../assets/svg/icons'
import { DefaultEmailIcon } from '../../../../../assets/svg/icons'
import { UploadIcon } from '../../../../../assets/svg/icons'
import { selectCountriesAndCities } from '../../../../../redux/components/countriesAndCities'
import $api from '../../../../../services/axios'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Edits = ({ onView }) => {
  const {
    user: { user },
    sportTypes: {
      sportTypes: { data: sportTypes },
    },
  } = useSelector((state) => state)
  const [countries] = useSelector(selectCountriesAndCities)
  const dispatch = useDispatch()
  const [currentSportTypes, setCurrentSportTypes] = useState([])
  const { t: tCommon } = useTranslation('common')
  const validationSchema = yup.object({
    name: yup.string().nullable(),
    country: yup.mixed().required(tCommon('validation.required')),
    city: yup.mixed().required(tCommon('validation.required')),
    webSite: yup.string().required(tCommon('validation.required')),
    fullNameCoach: yup.string().required(tCommon('validation.required')),
    phoneCoach: yup
      .string()
      .nullable()
      .test({
        test: (value) => (normalizePhone(value) ? value.length === 12 : true),
        message: tCommon('validation.phoneNumberMin'),
      }),
    emailCoach: yup
      .string()
      .email(tCommon('validation.emailValid'))
      .required(tCommon('validation.required')),
    sports: yup.array().test({
      message: tCommon('validation.required'),
      test: () => !!currentSportTypes.length,
    }),
    avatar: yup.mixed().test('FILE_SIZE', tCommon('validation.imageSizeValid'), (value) => {
      if (!value) return true
      if (typeof value !== 'string') {
        return !!value && (value.size / 1024 / 1024).toFixed(2) <= 4
      }
      return true
    }),
  })

  const formik = useFormik({
    initialValues: {
      ...user,
      city: user?.city?.name || null,
      country: user?.country?.name || null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { country, avatar, city, ...rstValues } = values,
          currentCountry = countries.find((countryItem) => countryItem.name === country),
          currentCity = currentCountry?.cityCountry.find((cityItem) => cityItem.name === city)
        const newValues = {
          ...decamelizeKeys({
            ...rstValues,
            sports: currentSportTypes.map((CSportItem) => CSportItem.id),
            country: currentCountry.id,
            city: currentCity.id,
          }),
          avatar,
        }
        if (typeof newValues.avatar === 'string') delete newValues.avatar
        const avaRes =
          newValues.avatar &&
          (await formDataHttp({ avatar: newValues.avatar }, `accounts/users/me/`, 'patch'))
        const { avatar: waste, ...rest } = newValues
        const { data } = await $api.patch(`teams/teams/${user.teamId}/`, rest)
        dispatch(
          saveUser({
            ...values,
            ...data,
            avatar: avaRes?.data?.avatar || data.avatar,
          }),
        )
        dispatch(fetchUser())
        onView('general')
      } catch (e) {
        throw e
      }
    },
  })
  const [currentCities, setCurrentCities] = useState([])

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.name === changeCountry)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    const currentCountry = countries.find((country) => country.name === formik.values.country)
    setCurrentCities(currentCountry.cityCountry)
    const newSportTypes = []
    formik.values?.sports?.map(({ id: sportId }) => {
      const obj = sportTypes.find((sportType) => sportType.id === sportId)
      newSportTypes.push(obj)
    })

    setCurrentSportTypes(newSportTypes)
  }, [])

  const deleteSport = (value) => {
    const index = currentSportTypes.findIndex((CSportItem) => CSportItem.id === value.id)
    setCurrentSportTypes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Header>
        <Title>{tCommon('form.titles.profileEdit')}</Title>
      </Header>
      <Content>
        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.organizationName')}</p>
          <TextField
            sx={{ width: '100%' }}
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder={tCommon('form.fieldsNames.organizationName')}
            variant='outlined'
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.country')}</p>
          <SelectUI
            error={!!(formik.touched.country && formik.errors.country)}
            onChange={(e) => {
              formik.setFieldValue('city', '')
              changeCurrentCities(e.target.value)
              formik.setFieldValue('country', e.target.value)
            }}
            value={formik.values.country}
            name={'country'}
          >
            <option
              style={{ color: '#BDBDBD' }}
              disabled
              selected
              value={formik.values.country ?? ''}
            >
              {!!formik.values.country
                ? formik.values.country
                : tCommon('form.fieldsNames.country')}
            </option>
            {!!countries?.length &&
              countries
                .filter((country) => country.name !== formik.values.country)
                .map((country) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
          </SelectUI>
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>
            {tCommon('form.fieldsNames.city')}/{tCommon('form.fieldsNames.region')}
          </p>
          <SelectUI
            error={!!(formik.touched.city && formik.errors.city)}
            onChange={formik.handleChange}
            value={formik.values.city}
            name={'city'}
          >
            <option style={{ color: '#BDBDBD' }} disabled selected value={formik.values.city ?? ''}>
              {!!formik.values.city
                ? formik.values.city
                : `${tCommon('form.fieldsNames.city')}/${tCommon('form.fieldsNames.region')}`}
            </option>
            {currentCities
              .filter((city) => city.name !== formik.values.city)
              .map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
          </SelectUI>
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.website')}</p>
          <TextField
            sx={{ width: '100%' }}
            name='webSite'
            onChange={formik.handleChange}
            value={formik.values.webSite}
            placeholder={tCommon('form.fieldsNames.website')}
            variant='outlined'
            error={formik.touched.webSite && Boolean(formik.errors.webSite)}
            helperText={formik.touched.webSite && formik.errors.webSite}
          />
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.fullNameMainCoach')}</p>
          <TextField
            sx={{ width: '100%' }}
            name='fullNameCoach'
            onChange={formik.handleChange}
            value={formik.values.fullNameCoach}
            placeholder={tCommon('form.fieldsNames.fullNameMainCoach')}
            variant='outlined'
            error={formik.touched.fullNameCoach && Boolean(formik.errors.fullNameCoach)}
            helperText={formik.touched.fullNameCoach && formik.errors.fullNameCoach}
          />
        </div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: 24,
          }}
        >
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.phoneNumber')}</p>
            <InputMask
              name={'phoneCoach'}
              onChange={(e) => {
                console.log({ value: e.target.value })
                if (normalizePhone(e.target.value || '') === '7' || !normalizePhone(e.target.value || '')) {
                  formik.setFieldValue('phoneCoach', '')
                } else formik.setFieldValue('phoneCoach', `+${e.target.value.replace(/\D/gi, '')}`)
              }}
              error={Boolean(formik.touched.phoneCoach) && formik.errors.phoneCoach}
              value={`${formik.values.phoneCoach}`.replace(/\D/gi, '')}
              mask='+7(999) 999 99 99'
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  sx={{ width: '100%' }}
                  variant='outlined'
                  placeholder={tCommon('form.fieldsNames.contacts')}
                  InputProps={{
                    endAdornment: <DefaultPhoneIcon />,
                  }}
                />
              )}
            </InputMask>
          </div>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>{tCommon('form.fieldsNames.emailCoach')}</p>
            <TextField
              sx={{ width: '100%' }}
              name='emailCoach'
              value={formik.values.emailCoach}
              onChange={formik.handleChange}
              disabled
              placeholder={tCommon('form.fieldsNames.emailCoach')}
              variant='outlined'
              error={formik.touched.emailCoach && Boolean(formik.errors.emailCoach)}
              helperText={formik.touched.emailCoach && formik.errors.emailCoach}
              InputProps={{
                endAdornment: <DefaultEmailIcon />,
              }}
            />
          </div>
        </Box>

        <div style={{ marginBottom: 16 }} className='auth-wrapper__input'>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.typeSport')}</p>
          <TextField
            select
            sx={{ width: '100%', color: 'white' }}
            name='sports'
            value={'none'}
            onChange={(e) => {
              if (e.target.value) {
                console.log(e.target.value)
                const obj = sportTypes.find((sportType) => sportType.name === e.target.value)
                setCurrentSportTypes((prev) => [...prev, obj])
              }
            }}
            error={formik.touched.sports && Boolean(formik.errors.sports)}
            helperText={formik.touched.sports && formik.errors.sports}
          >
            <MenuItem value='none' sx={{ display: 'none' }}>
              {tCommon('form.fieldsNames.typeSport')}
            </MenuItem>
            {sportTypes
              .filter(
                (sportType) =>
                  !currentSportTypes.some((CSportType) => CSportType.id === sportType.id),
              )
              .map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
          </TextField>
        </div>

        {currentSportTypes.map((CSportType) => (
          <SportItem>
            <Checkbox
              defaultChecked
              onChange={() => deleteSport(CSportType)}
              sx={{
                padding: 0,
                '& .MuiSvgIcon-root': {
                  color: '#6D4EEA',
                },
              }}
            />
            <p>{CSportType?.name}</p>
          </SportItem>
        ))}

        <div className='auth-wrapper__input' style={{ marginTop: 32 }}>
          <p className='auth-title__input'>{tCommon('form.fieldsNames.description')}</p>
          <Textarea
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            placeholder={tCommon('form.fieldsNames.description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
          />
        </div>

        <Gallery>
          <Title>{tCommon('form.fieldsNames.profileAvatar.label')}</Title>
          <GrayText style={{ marginTop: 4 }}>
            {tCommon('form.fieldsNames.profileAvatar.description')}
          </GrayText>
          <GalleryBlock>
            <GalleryLabel error={formik.touched.avatar && Boolean(formik.errors.avatar)}>
              {!!formik.values.avatar ? (
                <ImageWrapper>
                  <Image
                    src={
                      typeof formik.values.avatar === 'string'
                        ? formik.values.avatar
                        : URL.createObjectURL(formik.values.avatar)
                    }
                    width={128}
                    height={128}
                    objectFit={'cover'}
                  />
                </ImageWrapper>
              ) : (
                <UploadIconWrapper>
                  <UploadIcon />
                </UploadIconWrapper>
              )}

              <GalleryInput
                name='avatar'
                type={'file'}
                accept='image/*'
                onChange={(e) => formik.setFieldValue('avatar', e.target.files[0])}
              />
            </GalleryLabel>
            <GrayText>{tCommon('form.fieldsNames.profileAvatar.rules4mb')}</GrayText>
          </GalleryBlock>
        </Gallery>
        <div className='auth-wrapper__independent' style={{ margin: '0 0 32px' }}>
          <Link href={'/auth/auth-reset-password'}>
            <a>
              <p className='auth-link'>{tCommon('form.fieldsNames.changePassword')}</p>
            </a>
          </Link>
        </div>
        <div className='auth-wrapper__independent border-top'>
          {tCommon('form.fieldsNames.deleteProfile.extra')}{' '}
          <Link href={`/auth/delete/${user?.user?.id}`}>
            <a>
              <span className='auth-link'>{tCommon('form.fieldsNames.deleteProfile.label')}</span>
            </a>
          </Link>
        </div>
      </Content>
      <Footer>
        <ButtonWrapper onClick={() => onView('general')}>
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

const Header = styled.div`
  padding: 32px;
  border-bottom: 1px solid #333333;
`
const Title = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`
const Content = styled.div`
  padding: 32px;
`
const Footer = styled.div`
  border-top: 1px solid #333333;
  padding: 32px;
  display: flex;
  justify-content: flex-end;
`
const ButtonWrapper = styled.div`
  max-width: 256px;
  width: 100%;
  &:first-child {
    margin-right: 32px;
  }
`
const SportItem = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  p {
    margin-left: 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #f2f2f2;
  }
`
const Textarea = styled.textarea`
  background: #1b1c22;
  box-sizing: border-box;
  padding: 20px;
  border: 1.5px solid #333333;
  border-radius: 16px;
  height: 160px;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
export const GrayText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`

export const Gallery = styled.div`
  padding-bottom: 32px;
  border-bottom: 1px solid #333333;
`
export const GalleryBlock = styled.div`
  display: flex;
  margin-top: 24px;
`
export const GalleryLabel = styled.div`
  min-width: 128px;
  margin-right: 24px;
  height: 128px;
  background: #1b1c22;
  border: 2px dashed ${(p) => (p.error ? '##EB5757' : '#6d4eea')};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`
export const GalleryInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`
export const UploadIconWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export default Edits
