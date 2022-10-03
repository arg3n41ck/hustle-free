import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TextField, Autocomplete, useMediaQuery, Modal, Box } from '@mui/material'
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
import TeamModeration from '../LkAh/Tabs/Profile/Teams/TeamModeration'

const dateKeys = [
  {
    start: 'earlyRegStart',
    end: 'earlyRegEnd',
    type: 'early_reg',
  },
  {
    start: 'lateRegStart',
    end: 'lateRegEnd',
    type: 'late_reg',
  },
  {
    start: 'standartRegStart',
    end: 'standartRegEnd',
    type: 'standart_reg',
  },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '688px',
  width: '100%',
  bgcolor: '#1B1C22',
  border: '1px solid #333333;',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.5);',
  p: 0,
  borderRadius: '16px',
}

const getRegDates = (start, end) => {
  const startDate = new Date(start).setHours(0, 0, 0, 0)
  const endDate = new Date(end).setHours(0, 0, 0, 0)
  const today = new Date().setHours(0, 0, 0, 0)
  return { startDate, endDate, today }
}

const getRegistrationType = (registration) => {
  return dateKeys.find(({ start, end }) => {
    if (registration[start] && registration[end]) {
      const { today, endDate, startDate } = getRegDates(registration[start], registration[end])
      return startDate <= today && today <= endDate
    }
  })
}

const emptyInitialValues = {
  team: '',
  category: '',
  level: '',
  weight: '',
}

const checkIsUserInfoFull = (user) => {
  return ['firstName', 'lastName', 'gender', 'country', 'city'].some((key) => !user[key])
}

const wadeInTeam = async (body) => {
  await $api.post('/teams/athlete_requests/', body)
}

function RegistrationAthleteToEvent({ eventRegistration }) {
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
  const md = useMediaQuery('(max-width: 768px)')
  const [modalWadeInTeam, setModalWadeInTeam] = useState(null)

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
          const typeRegistration = eventRegistration
            ? getRegistrationType(eventRegistration)?.type
            : ''
          await $api.post(`/events/registration/`, {
            event_part_category: +category,
            event: +eventId,
            team,
            level,
            weight,
            typeRegistration,
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
    user && dispatch(fetchTeams())
    user && dispatch(fetchLevel({ event: eventId, gender: user?.gender }))
    dispatch(fetchCountries())
  }, [user])

  useEffect(() => {
    user &&
      dispatch(
        fetchCategories({
          event: eventId,
          level: formik.values.level || '',
          weight: formik.values.weight || '',
          gender: user?.gender,
        }),
      )
  }, [eventId, formik.values, user])

  return (
    <>
      {!!modalWadeInTeam?.id && (
        <Modal open={modalWadeInTeam} onClose={() => setModalWadeInTeam(null)}>
          <Box sx={style}>
            <TeamModeration
              onClose={() => setModalWadeInTeam(null)}
              onSubmit={async () => {
                await wadeInTeam({ team: modalWadeInTeam?.id, athlete: user?.athleteId })
                formik.setFieldValue('team', modalWadeInTeam?.id)
                setModalWadeInTeam(null)
              }}
              isTeamWithModeration={!!modalWadeInTeam?.preliminaryModeration}
              text={'Вступить'}
            />
          </Box>
        </Modal>
      )}
      <form onSubmit={formik.handleSubmit}>
        <RegistrationAthleteToEventHeroInfo>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Выберите команду</p>
            <Autocomplete
              noOptionsText={'Не найдено'}
              onChange={(_, value) => {
                !user?.teams?.includes(value?.id)
                  ? setModalWadeInTeam({
                      id: value?.id,
                      preliminaryModeration: value?.preliminaryModeration,
                    })
                  : formik.setFieldValue('team', value?.id)
              }}
              options={(teams?.length && teams?.map((option) => option)) || []}
              getOptionLabel={(option) => option?.name || 'Выберите команду'}
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
                          formik.touched.team &&
                          Boolean(formik.errors.team) &&
                          '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  placeholder='Команды'
                  error={formik.touched.team && Boolean(formik.errors.team)}
                  helperText={formik.touched.team && formik.errors.team}
                  InputProps={{
                    ...params.InputProps,
                    endAdortment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>

          <LevelWeightCategoryContainer>
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
              <TextField
                name='weight'
                placeholder='Вес'
                variant='outlined'
                fullWidth
                type='number'
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
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
                onChange={formik.handleChange}
                value={formik.values.weight}
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
          </LevelWeightCategoryContainer>
        </RegistrationAthleteToEventHeroInfo>
        {!md && <Line />}
        <RegistrationAthleteToEventBottomButtons>
          <Link href={`/events/${eventId}/`}>
            <RegistrationAthleteToEventBottomButton background={md && 'none'} type='button'>
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
    </>
  )
}

export default RegistrationAthleteToEvent

const LevelWeightCategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`

const RegistrationAthleteToEventBottomButtons = styled.div`
  padding: 32px;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0;
    height: auto;
  }
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

  @media screen and (max-width: 768px) {
    border-radius: 4px;
    height: 40px;
    max-width: auto;

    &:last-child {
      padding: 0 15px;
    }
  }
`

const RegistrationAthleteToEventHeroInfo = styled.div`
  padding: 32px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
