import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TextField, Autocomplete, useMediaQuery, Modal, Box } from '@mui/material'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { LocationIcon } from '../Events/EventsSlider'
import { fetchAthleteTeams, fetchTeams, teamsSelector } from '../../../redux/components/teams'
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
import { calculateAge, truncateString } from '../../../helpers/helpers'

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
  const [athleteTeams] = useSelector(teamsSelector)
  const [categories, levels] = useSelector(categoriesSelector)
  const [, teams] = useSelector(teamsSelector)
  const dispatch = useDispatch()
  const md = useMediaQuery('(max-width: 768px)')
  const [modalWadeInTeam, setModalWadeInTeam] = useState(null)
  const [catAutoRefreshKey, setCatAutoRefreshKey] = useState('initital-event-reg-CARK')
  const [teamAutoRefreshKey, setTeamAutoRefreshKey] = useState('initital-event-reg-TARK')

  const { current: validationSchema } = useRef(
    yup.object({
      team: yup.string().required('Обязательное поле'),
      category: yup.string().required('Обязательное поле'),
      level: yup.string().required('Обязательное поле').nullable(),
      weight: yup.string().required('Обязательное поле'),
    }),
  )

  const { values, errors, touched, setFieldValue, handleSubmit, dirty, handleChange } = useFormik({
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
    dispatch(fetchTeams())
    if (user?.athleteId && user?.gender) {
      dispatch(fetchAthleteTeams({ athlete: user?.athleteId }))
      dispatch(fetchLevel({ event: eventId, gender: user?.gender }))
    }
    dispatch(fetchCountries())
  }, [user?.gender, eventId, user?.athleteId])

  useEffect(() => {
    setFieldValue('categoty', '')
    if (user) {
      dispatch(
        fetchCategories({
          event: eventId,
          level: values.level || '',
          weight: values.weight || '',
          gender: user?.gender,
          birth_date: !!user?.dateBirthday ? user?.dateBirthday : '',
        }),
      )
    }
  }, [values?.weight, values?.level, user?.gender, user?.dateBirthday])

  useEffect(() => {
    setCatAutoRefreshKey(Math.random())
  }, [categories])

  return (
    <>
      {!!modalWadeInTeam?.id && (
        <Modal open={!!modalWadeInTeam} onClose={() => setModalWadeInTeam(null)}>
          <Box sx={style}>
            <TeamModeration
              onClose={() => {
                setModalWadeInTeam(null)
                setFieldValue('team', '')
                setTeamAutoRefreshKey(Math.random())
              }}
              onSubmit={async () => {
                await wadeInTeam({ team: modalWadeInTeam?.id, athlete: user?.athleteId })
                setFieldValue('team', modalWadeInTeam?.id)
                setModalWadeInTeam(null)
              }}
              isTeamWithModeration={!!modalWadeInTeam?.preliminaryModeration}
              text={'Вступить'}
            />
          </Box>
        </Modal>
      )}
      <form onSubmit={handleSubmit}>
        <RegistrationAthleteToEventHeroInfo>
          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Выберите команду</p>
            <Autocomplete
              key={`form_field_${teamAutoRefreshKey ?? 'initital-event-reg-TARK'}`}
              noOptionsText={'Не найдено'}
              onChange={(_, value) => {
                if (!(athleteTeams || [])?.some((req) => req?.team?.id == value?.id)) {
                  setModalWadeInTeam({
                    id: value?.id,
                    preliminaryModeration: value?.preliminaryModeration,
                  })
                } else {
                  setFieldValue('team', value?.id)
                }
              }}
              options={(teams?.length && teams?.map((option) => option)) || []}
              getOptionLabel={(option) => option?.name || 'Выберите команду'}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor: touched.team && Boolean(errors.team) && '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  placeholder='Команды'
                  error={touched.team && Boolean(errors.team)}
                  helperText={touched.team && errors.team}
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
                key={'event-reg-level-autocomplete'}
                noOptionsText={'Ничего не найдено'}
                onChange={(_, value) => {
                  setFieldValue('level', value?.id)
                  setFieldValue('weight', '')
                }}
                options={levels.map((option) => option)}
                getOptionLabel={(option) => option?.name}
                value={levels.find(({ id }) => id === values?.level) || null}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                          borderColor:
                            touched.level && Boolean(errors.level) && '#d32f2f !important',
                        },
                      },
                    }}
                    fullWidth
                    placeholder='Уровень'
                    error={touched.level && Boolean(errors.level)}
                    helperText={touched.level && errors.level}
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
                      borderColor: touched.weight && Boolean(errors.weight) && '#d32f2f !important',
                    },
                  },
                }}
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
                onChange={handleChange}
                value={values.weight}
              />
            </div>
          </LevelWeightCategoryContainer>

          <div className='auth-wrapper__input'>
            <p className='auth-title__input'>Выберите категорию</p>
            <Autocomplete
              key={`form_field_${catAutoRefreshKey ?? 'initital-event-reg-CARK'}`}
              noOptionsText={'Не найдено категорий по указанным возрасту, весу и уровню'}
              onChange={(_, value) => setFieldValue('category', value?.id)}
              options={
                !!categories?.length && !!values?.level && !!values?.weight
                  ? categories.map((opt) => opt)
                  : []
              }
              getOptionLabel={(option) => {
                const { name, fromAge, levels, toAge, fromWeight, toWeight } = option
                const levelName = levels?.filter(({ id }) => id === values?.level)?.name ?? ''
                return `${truncateString(name, 20)} / ${levelName ? levelName + ' / ' : ' '}${
                  fromAge ? fromAge + ' - ' : ' '
                }${toAge ? toAge + ' лет' : ''} / ${fromWeight ? fromWeight + ' кг ' : ' '} - ${
                  toWeight ? toWeight + '  кг ' : ''
                }`
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor:
                          touched.category && Boolean(errors.category) && '#d32f2f !important',
                      },
                    },
                  }}
                  fullWidth
                  placeholder='Категории'
                  error={touched.category && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                />
              )}
            />
          </div>
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
            background={!dirty ? '#828282' : 'linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)'}
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
  grid-template-columns: 1fr 1fr;
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
