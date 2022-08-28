import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TextField, Autocomplete } from '@mui/material'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { LocationIcon } from '../Events/EventsSlider'
import { fetchTeams, teamsSelector } from '../../../redux/components/teams'
import {
  categoriesSelector,
  fetchCategories,
  fetchLevel,
} from '../../../redux/components/categories'
import $api from '../../../services/axios'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { fetchCountries } from '../../../redux/components/countriesAndCities'

const emptyInitialValues = {
  team: '',
  category: '',
  level: '',
  weight: '',
}

const checkIsUserInfoFull = (user) => {
  return ['firstName', 'lastName', 'gender', 'country', 'city'].some((key) => !user[key])
}

function getWeights(fromWeight, toWeight) {
  const weightsArr = []

  for (let i = fromWeight; i <= toWeight; i++) {
    weightsArr.push(i)
  }

  return weightsArr
}

function RegistrationAthleteToEvent({ data }) {
  const {
    push: routerPush,
    query: { id: eventId },
  } = useRouter()
  const {
    user: { user },
  } = useSelector((state) => state)
  const [categories, levels] = useSelector(categoriesSelector)
  const [, teams] = useSelector(teamsSelector)
  const dispatch = useDispatch()

  const { current: validationSchema } = useRef(
    yup.object({
      team: yup.string().required('Обязательное поле'),
      category: yup.string().required('Обязательное поле'),
      level: yup.string().required('Обязательное поле').nullable(),
      weight: yup.string().required('Обязательное поле'),
    }),
  )

  const formik = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!checkIsUserInfoFull(user)) {
          const { category, level, team, weight } = values

          await $api.post(`/events/registration/`, {
            event_part_category: +category,
            event: +eventId,
            team,
            level,
            weight,
          })
          routerPush('/lk-ah/profile/events')
        } else {
          toast.error('Заполните все поля участника!', { autoClose: 2000 })
        }
      } catch (e) {
        throw e
      }
    },
  })

  useEffect(() => {
    user && dispatch(fetchTeams({ athletes: user?.athleteId }))
    dispatch(fetchLevel())
    dispatch(fetchCountries())
  }, [user])

  useEffect(() => {
    dispatch(
      fetchCategories({
        event: eventId,
        level: formik.values.level || '',
        weight: formik.values.weight || '',
      }),
    )
  }, [eventId, formik.values])

  return (
    <form onSubmit={formik.handleSubmit}>
      <RegistrationAthleteToEventHeroInfo>
        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>Выберите команду</p>
          <Autocomplete
            noOptionsText={'Вы не зачислены ни в одну команду'}
            onChange={(_, value) => formik.setFieldValue('team', value?.id)}
            options={(teams?.length && teams?.map((option) => option)) || []}
            getOptionLabel={(option) => option?.name || null}
            value={teams?.length && teams?.find(({ id }) => id === formik?.values?.team)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.category &&
                        Boolean(formik.errors.category) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                placeholder='Команды'
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                InputProps={{
                  ...params.InputProps,
                  endAdortment: <LocationIcon />,
                }}
              />
            )}
          />
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>Уровень</p>
          <Autocomplete
            noOptionsText={'Ничего не найдено'}
            onChange={(_, value) => formik.setFieldValue('level', value?.id)}
            options={levels.map((option) => option)}
            getOptionLabel={(option) => option?.name}
            value={levels.find(({ id }) => id === formik?.values?.level) || null}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.level &&
                        Boolean(formik.errors.level) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                placeholder='Уровень'
                error={formik.touched.level && Boolean(formik.errors.level)}
                helperText={formik.touched.level && formik.errors.level}
              />
            )}
          />
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>Вес</p>
          <Autocomplete
            noOptionsText={'Ничего не найдено'}
            onChange={(_, value) => formik.setFieldValue('weight', value)}
            options={getWeights(25, 140)}
            getOptionLabel={(option) => `${option}`}
            value={formik?.values?.weight}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.weight &&
                        Boolean(formik.errors.weight) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                placeholder='Вес'
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            )}
          />
        </div>

        <div className='auth-wrapper__input'>
          <p className='auth-title__input'>Выберите категорию</p>
          <Autocomplete
            noOptionsText={'Не найдено категорий по выбранным весу и уровню'}
            onChange={(_, value) => formik.setFieldValue('category', value?.id)}
            options={categories.map((option) => option) || []}
            getOptionLabel={(option) => option?.name}
            value={categories.find(({ id }) => id === formik?.values?.category)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& > fieldset': {
                      borderColor:
                        formik.touched.category &&
                        Boolean(formik.errors.category) &&
                        '#d32f2f !important',
                    },
                  },
                }}
                fullWidth
                placeholder='Категории'
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
            )}
          />
        </div>
      </RegistrationAthleteToEventHeroInfo>
      <Line />
      <RegistrationAthleteToEventBottomButtons>
        <Link href={`/events/${data?.id}/`}>
          <RegistrationAthleteToEventBottomButton type='button'>
            Отмена
          </RegistrationAthleteToEventBottomButton>
        </Link>
        <RegistrationAthleteToEventBottomButton
          type={'submit'}
          background={'linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)'}
        >
          Зарегистрироваться
        </RegistrationAthleteToEventBottomButton>
      </RegistrationAthleteToEventBottomButtons>
    </form>
  )
}

export default RegistrationAthleteToEvent

const RegistrationAthleteToEventBottomButtons = styled.div`
  padding: 32px;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const RegistrationAthleteToEventBottomButton = styled.button`
  background: ${({ background }) => (!!background ? background : '#828282')};
  border-radius: 16px;
  max-width: 256px;
  width: 100%;
  height: 64px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  margin-left: 32px;

  &:first-child {
    margin-left: 0;
  }
`

const RegistrationAthleteToEventHeroInfo = styled.div`
  padding: 32px;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
