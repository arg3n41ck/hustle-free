import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  Checkbox,
  Box,
  TextField,
  Autocomplete,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material"
import Link from "next/link"
import { selectCountriesAndCities } from "../../../redux/components/countriesAndCities"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import useQuery from "../../../hooks/useQuery"
import { useFormik } from "formik"
import { theme } from "../../../styles/theme"
import { LocalizationProvider } from "@mui/lab"
import { MobileDatePicker } from "@mui/x-date-pickers"
import { ru } from "date-fns/locale"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import CalendarIcon from "../../../public/svg/calendar-edit-profile.svg"
import InputMask from "react-input-mask"
import PhoneIcon from "../../../public/svg/profile-phone.svg"
import EmailIcon from "../../../public/svg/profile-email-edit.svg"
import CustomButton from "../../ui/CustomButton"
import { LocationIcon } from "../Events/EventsSlider"
import { format, parseISO } from "date-fns"
import Radio from "../../ui/Radio"
import { fetchUser } from "../../../redux/components/user"
import {
  fetchAthleteTeams,
  teamsSelector,
} from "../../../redux/components/teams"
import {
  categoriesSelector,
  fetchCategories,
  fetchLevel,
} from "../../../redux/components/categories"
import { decamelizeKeys } from "humps"
import $api from "../../../services/axios"

const emptyInitialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: "",
  dateBirthday: "",
  age: "",
  role: "",
  country: "",
  city: "",
  team: "",
  category: "",
  level: "",
  weight: "",
}

function RegistrationAthleteToEvent({ data }) {
  const {
    user: { user },
    countries: {
      countries: { data: countries },
    },
  } = useSelector((state) => state)

  const query = useQuery()
  const dispatch = useDispatch()
  const { push: routerPush } = useRouter()
  const [currentCities, setCurrentCities] = useState([])
  const [city, setCity] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [, cities] = useSelector(selectCountriesAndCities)
  const [categories, levels] = useSelector(categoriesSelector)
  const [athleteTeams] = useSelector(teamsSelector)
  const [currentLevels, setCurrentLevels] = useState([])
  const [currentWeights, setCurrentWeights] = useState(null)

  const formik = useFormik({
    initialValues: !!user?.id
      ? { ...emptyInitialValues, ...user }
      : emptyInitialValues,
    // validationSchema,
    onSubmit: async (values) => {
      try {
        const { category, level, team, weight } = values

        await $api.post(`/athlete/events/${data.id}/registration/`, {
          event_participant_category: category,
          team,
          level,
          weight,
        })
        routerPush("/lk-ah/profile/events")
      } catch (e) {
        throw e
      }
    },
  })

  function getWeights(fromWeight, toWeight) {
    const weightsArr = []

    for (let i = fromWeight; i <= toWeight; i++) {
      weightsArr.push(i)
    }

    return weightsArr
  }

  const changeCurrentLevels = (changeCategory) => {
    const findObj = categories.find(
      (category) => category.id === changeCategory
    )
    if (findObj) setCurrentLevels(findObj.levels)
  }

  const changeCurrentWeights = (changeCategory) => {
    const findObj = categories.find(
      (category) => category.id === changeCategory
    )
    if (findObj)
      setCurrentWeights({
        fromWeight: findObj.fromWeight,
        toWeight: findObj.toWeight,
      })
  }

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.id === changeCountry.id)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchAthleteTeams())
    dispatch(fetchUser())
    dispatch(fetchLevel())
  }, [])

  return (
    <RegistrationAthleteToEventContainer>
      <RegistrationAthleteToEventHeading>
        <RegistrationAthleteToEventHeadingText>
          Сведения о пользователе
        </RegistrationAthleteToEventHeadingText>
      </RegistrationAthleteToEventHeading>
      <Line />
      <form onSubmit={formik.handleSubmit}>
        <RegistrationAthleteToEventHeroInfo>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: 24,
            }}
          >
            <div className="auth-wrapper__input">
              <p className="auth-title__input">Фамилия</p>
              <TextField
                sx={{ width: "100%" }}
                name="lastName"
                disabled
                value={formik.values?.lastName}
                onChange={(e) =>
                  formik.setFieldValue(
                    "lastName",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                placeholder="Фамилия"
                variant="outlined"
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>

            <div className="auth-wrapper__input">
              <p className="auth-title__input">Имя</p>
              <TextField
                sx={{ width: "100%" }}
                disabled
                name="firstName"
                value={formik.values?.firstName}
                onChange={(e) =>
                  formik.setFieldValue(
                    "firstName",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                placeholder="Имя"
                variant="outlined"
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
          </Box>
          <Box
            sx={{
              "& .MuiFormControl-root": {
                display: "flex",
              },
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: 24,
            }}
            className="auth-wrapper__input"
          >
            <div className="auth-wrapper__input">
              <p className="auth-title__input">
                Дата рождения (не обязательно)
              </p>
              <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  disabled
                  toolbarTitle={"Выбрать дату"}
                  cancelText={"Отмена"}
                  value={formik.values?.dateBirthday}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "dateBirthday",
                      format(value, "yyyy-MM-dd")
                    )
                  }
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        Boolean(formik.touched.dateBirthday) &&
                        formik.errors.dateBirthday
                      }
                      helperText={
                        formik.touched.dateBirthday &&
                        formik.errors.dateBirthday
                      }
                      inputProps={{
                        ...params.inputProps,
                        endAdornment: <CalendarIcon />,
                        placeholder: "ДД/ММ/ГГГГ",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="auth-wrapper__input">
              <p className="auth-title__input">
                Номер телефона (не обязательно)
              </p>
              <InputMask
                name={"phoneNumber"}
                disabled
                onChange={(e) =>
                  formik.setFieldValue(
                    "phoneNumber",
                    `+${e.target.value.replace(/\D/gi, "")}`
                  )
                }
                value={`${formik.values?.phoneNumber}`.replace(/\D/gi, "")}
                mask="+7(999) 999 99 99"
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={"+7 (7"}
                    error={
                      Boolean(formik.touched.phoneNumber) &&
                      formik.errors.phoneNumber
                    }
                    // disabled
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
              "& .MuiFormControl-root": {
                display: "flex",
              },
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: 24,
            }}
            className="auth-wrapper__input"
          >
            <div className="auth-wrapper__input">
              <p className="auth-title__input">Страна</p>
              <Autocomplete
                noOptionsText={"Ничего не найдено"}
                disabled
                onChange={(_, value) => [
                  changeCurrentCities(value),
                  formik.setFieldValue("country", value.id),
                  formik.setFieldValue("city", ""),
                ]}
                options={countries.map((option) => option) || []}
                getOptionLabel={(option) => option.name}
                value={
                  countries.find(({ id }) => id === formik.values?.country) ||
                  null
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    disabled
                    placeholder="Страна"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <LocationIcon />,
                    }}
                  />
                )}
              />
            </div>

            <div className="auth-wrapper__input">
              <p className="auth-title__input">Город</p>

              <Autocomplete
                noOptionsText={"Ничего не найдено"}
                onChange={(_, value) => formik.setFieldValue("city", value.id)}
                disabled
                options={
                  countries.find(({ id }) => id === formik.values?.country)
                    ?.cityCountry || []
                }
                getOptionLabel={(option) => option?.name}
                value={
                  cities.find(({ id }) => id === formik.values.city) || null
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Город"
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
              "& .MuiFormControl-root": {
                display: "flex",
              },
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: 24,
            }}
            className="auth-wrapper__input"
          >
            <div className="auth-wrapper__input">
              <p className="auth-title__input">Пол</p>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <RadioWrapper>
                  <Radio
                    text={"Женский"}
                    disabled
                    checked={formik.values?.gender === "female"}
                    onChange={() => formik.setFieldValue("gender", "female")}
                  />
                </RadioWrapper>
                <RadioWrapper>
                  <Radio
                    text={"Мужской"}
                    disabled
                    checked={formik.values?.gender === "male"}
                    onChange={() => formik.setFieldValue("gender", "male")}
                  />
                </RadioWrapper>
              </Box>
            </div>

            {/* <div className="auth-wrapper__input">
            <p className="auth-title__input">Тип профиля</p>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <RadioWrapper>
                <Radio
                  text={"Открытый"}
                  checked={formik.values?.type_profile === "open"}
                  onChange={() => formik.setFieldValue("typeProfile", "open")}
                />
              </RadioWrapper>
              <RadioWrapper>
                <Radio
                  text={"Закрытый"}
                  checked={formik.values?.type_profile === "closed"}
                  onChange={() => formik.setFieldValue("typeProfile", "closed")}
                />
              </RadioWrapper>
            </Box>
          </div> */}
          </Box>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Выберите команду</p>
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => formik.setFieldValue("team", value?.id)}
              options={athleteTeams.map((option) => option) || []}
              getOptionLabel={(option) => option?.name}
              value={athleteTeams.find(({ id }) => id === formik?.values?.team)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Команды"
                  InputProps={{
                    ...params.InputProps,
                    endAdortment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Выберите категорию</p>
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => [
                changeCurrentLevels(value?.id),
                changeCurrentWeights(value?.id),
                formik.setFieldValue("level", ""),
                formik.setFieldValue("category", value?.id),
              ]}
              options={categories.map((option) => option) || []}
              getOptionLabel={(option) => option?.name}
              value={categories.find(
                ({ id }) => id === formik?.values?.category
              )}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Категории"
                  InputProps={{
                    ...params.InputProps,
                    endAdortment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Уровень</p>
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => [
                formik.setFieldValue("level", value?.id),
              ]}
              options={
                !currentLevels?.length
                  ? levels.map((option) => option)
                  : currentLevels.map((option) => option)
              }
              getOptionLabel={(option) => option?.name}
              value={levels.find(({ id }) => id === formik?.values?.level)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Уровень"
                  InputProps={{
                    ...params.InputProps,
                    endAdortment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Вес</p>
            <Autocomplete
              noOptionsText={"Ничего не найдено"}
              onChange={(_, value) => formik.setFieldValue("weight", value)}
              options={
                !!currentWeights
                  ? getWeights(
                      currentWeights.fromWeight,
                      currentWeights.toWeight
                    )
                  : getWeights(40, 92)
              }
              getOptionLabel={(option) => `${option}`}
              value={formik?.values?.weight}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Вес"
                  InputProps={{
                    ...params.InputProps,
                    endAdortment: <LocationIcon />,
                  }}
                />
              )}
            />
          </div>
        </RegistrationAthleteToEventHeroInfo>
        <Line />
        <RegistrationAthleteToEventBottomButtons>
          <Link href={`/events/${data?.id}/`}>
            <RegistrationAthleteToEventBottomButton>
              Отмена
            </RegistrationAthleteToEventBottomButton>
          </Link>
          <RegistrationAthleteToEventBottomButton
            type={"submit"}
            background={"linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)"}
          >
            Зарегистрироваться
          </RegistrationAthleteToEventBottomButton>
        </RegistrationAthleteToEventBottomButtons>
      </form>
    </RegistrationAthleteToEventContainer>
  )
}

export default RegistrationAthleteToEvent

const RadioWrapper = styled.div`
  display: flex;
  margin-right: 32px;
`

const RegistrationAthleteToEventBottomButtons = styled.div`
  padding: 32px;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const RegistrationAthleteToEventBottomButton = styled.button`
  background: ${({ background }) => (!!background ? background : "#828282")};
  border-radius: 16px;
  max-width: 256px;
  width: 100%;
  height: 64px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #bdbdbd;
  margin-left: 32px;

  &:first-child {
    margin-left: 0;
  }
`

const RegistrationAthleteToEventContainer = styled.div`
  width: 100%;
  background-color: #1b1c22;
  border: 1px solid #333333;
  border-radius: 24px;
`
const RegistrationAthleteToEventHeading = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  padding: 32px;
`
const RegistrationAthleteToEventHeroInfo = styled.div`
  padding: 32px;
`

const RegistrationAthleteToEventHeadingText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
`
