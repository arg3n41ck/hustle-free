import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import styled from "styled-components"
import {
  Box,
  TextField,
  Autocomplete,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { ru } from "date-fns/locale"
import { DatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import Radio from "../../../../ui/Radio"
import InputMask from "react-input-mask"
import CustomButton from "../../../../ui/CustomButton"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import CalendarIcon from "../../../../../public/svg/calendar-edit-profile.svg"
import PhoneIcon from "../../../../../public/svg/profile-phone.svg"
import EmailIcon from "../../../../../public/svg/profile-email-edit.svg"
import { saveUser } from "../../../../../redux/components/user"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { PasswordIcon } from "../../../../../pages/reset-password"
import { theme } from "../../../../../styles/theme"
import {
  fetchCountries,
  selectCountriesAndCities,
} from "../../../../../redux/components/countriesAndCities"
import useQuery from "../../../../../hooks/useQuery"
import { fetchUser } from "../../../../../redux/components/user"
import { LocationIcon } from "../../../Events/EventsCatalog/EventsFilter"
import { decamelizeKeys } from "humps"
import { formDataHttp } from "../../../../../helpers/formDataHttp"

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
  firstName: yup.string().required("Обязательное поле"),
  lastName: yup.string().required("Обязательное поле"),
  phoneNumber: yup.string().min(12).required("Обязательное поле"),
  gender: yup.mixed(),
  dateBirthday: yup.mixed().nullable(),
  country: yup.string().required("Обязательное поле"),
  city: yup.string().required("Обязательное поле"),
})

const emptyInitialValues = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: "",
  dateBirthday: "",
  age: "",
  role: "",
  country: "",
  city: "",
  avatar: "",
  nameOrganization: "",
  address: "",
  old_password: "",
  new_password: "",
  type_profile: "",
}

const Edits = ({ onToggleSidebar }) => {
  const {
    user: { user },
    countries: {
      countries: { data: countries },
    },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { push: routerPush } = useRouter()
  const [currentCities, setCurrentCities] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [, cities] = useSelector(selectCountriesAndCities)

  const formik = useFormik({
    initialValues: !!user?.id
      ? { ...emptyInitialValues, ...user }
      : emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { avatar, ...rstValues } = values
        const currentCountry = countries.find(
            (country) => country.id === values.country
          ),
          currentCity = currentCountry?.cityCountry?.find(
            (country) => country.id === values.city
          )
        const newValues = {
          ...decamelizeKeys({
            ...rstValues,
            dateBirthday:
              values.dateBirthday &&
              format(new Date(values.dateBirthday), "yyyy-MM-dd"),
            country: currentCountry.id,
            city: currentCity.id,
          }),
          avatar,
        }

        for (let key in newValues) {
          if (!newValues[key]) delete newValues[key]
        }

        if (typeof newValues.avatar === "string") delete newValues.avatar
        const { data } = await formDataHttp(
          newValues,
          `athlete/profile/edit/`,
          "patch"
        )

        dispatch(saveUser({ ...newValues, ...data }))
        dispatch(fetchUser())
        routerPush("/lk-ah/profile")
      } catch (e) {
        throw e
      }
    },
  })

  useEffect(() => {
    if (user) formik.setValues(user)
  }, [user])

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const changeCurrentCities = (changeCountry) => {
    const findObj = countries.find((country) => country.id === changeCountry.id)
    if (findObj) setCurrentCities(findObj.cityCountry)
  }

  useEffect(() => {
    if (typeof formik.values?.country === "number") {
      const currentCountry = countries.find(
        (country) => country.id === formik.values?.country
      )
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
        <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
          <TitleHeader>Редактирование профиля</TitleHeader>
        </LkDefaultHeader>
      </Header>
      <Content>
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
              value={formik.values?.lastName}
              onChange={(e) =>
                formik.setFieldValue(
                  "lastName",
                  e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                )
              }
              placeholder="Фамилия"
              variant="outlined"
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Имя</p>
            <TextField
              sx={{ width: "100%" }}
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
            <p className="auth-title__input">Дата рождения (не обязательно)</p>
            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
              <MobileDatePicker
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
                    fullWidth
                    error={
                      Boolean(formik.touched.dateBirthday) &&
                      formik.errors.dateBirthday
                    }
                    helperText={
                      formik.touched.dateBirthday && formik.errors.dateBirthday
                    }
                    inputProps={{
                      ...params.inputProps,
                      placeholder: "ДД/ММ/ГГГГ",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Номер телефона (не обязательно)</p>
            <InputMask
              name={"phoneNumber"}
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
              options={
                countries.find(({ id }) => id === formik.values?.country)
                  ?.cityCountry || []
              }
              getOptionLabel={(option) => option?.name}
              value={cities.find(({ id }) => id === formik.values.city) || null}
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
                  checked={formik.values?.gender === "female"}
                  onChange={() => formik.setFieldValue("gender", "female")}
                />
              </RadioWrapper>
              <RadioWrapper>
                <Radio
                  text={"Мужской"}
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
          <p className="auth-title__input">Электронный адрес</p>
          <TextField
            sx={{ width: "100%" }}
            name="email"
            value={formik.values?.email}
            onChange={() => {}}
            id="outlined-basic"
            placeholder="Электронный адрес"
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: <EmailIcon />,
            }}
          />
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Старый пароль</p>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              placeholder="Старый пароль"
              name="old_password"
              value={formik.values?.old_password}
              onChange={formik.handleChange}
              error={
                formik.touched?.old_password &&
                Boolean(formik.errors?.old_password)
              }
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <PasswordIcon show={showPassword} />
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched?.old_password && (
              <Error>{formik.errors?.old_password}</Error>
            )}
          </FormControl>
        </div>

        <div className="auth-wrapper__input">
          <p className="auth-title__input">Новый пароль</p>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
              placeholder="Новый пароль"
              name="new_password"
              value={formik.values?.new_password}
              onChange={formik.handleChange}
              error={
                formik.touched?.new_password &&
                Boolean(formik.errors?.new_password)
              }
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <PasswordIcon show={showPassword} />
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched?.new_password && (
              <Error>{formik.errors?.new_password}</Error>
            )}
          </FormControl>
        </div>
      </Content>
      <Footer>
        <ButtonWrapper onClick={() => routerPush("/lk-ah/profile")}>
          <CustomButton type={"button"} typeButton={"secondary"}>
            Отмена
          </CustomButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <CustomButton type={"submit"} typeButton={"primary"}>
            Сохранить
          </CustomButton>
        </ButtonWrapper>
      </Footer>

      <Footer>
        <div className="auth-wrapper__input">
          <h3 className="auth-title">Фотография профиля</h3>
          <Description>
            Фотография показывается, например, рядом с вашими профилем{" "}
          </Description>
          <AvatarWrapper>
            <FileUploadLabel
              htmlFor={"startup-logo"}
              hasAvatar={formik.values?.avatar}
            >
              <input
                id={"avatar"}
                name={"avatar"}
                accept="image/png"
                onChange={(e) => {
                  uploadImageToClient(e)
                  const file = e.target.files[0]
                  formik.setFieldValue("avatar", file)
                }}
                type="file"
              />
              {!formik.values?.avatar && (
                <AvatarInfo>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.2828 14H27.7172V9.60451H32V7.26025H27.7172V3H25.2828V7.26025H21V9.60451H25.2828V14Z"
                      fill="#6D4EEA"
                    />
                    <path
                      d="M25.6666 19.7623V15.6H28V24.5C28 26.4297 26.4297 28 24.5 28H3.5C1.77798 28 0.349915 26.7471 0.061737 25.1067C0.0104675 24.9736 0.00341797 24.8324 0.0198669 24.6925C0.0182718 24.6638 0.014245 24.6357 0.0102305 24.6078C0.00510551 24.5722 0 24.5367 0 24.5V10.5C0 8.57034 1.57034 7 3.5 7H19.4V9.3334H3.5C2.85721 9.3334 2.3334 9.85721 2.3334 10.5V22.0955L6.71994 17.7089C7.51675 16.9108 8.81537 16.9108 9.61325 17.7089L11.0834 19.1789L16.6367 13.6255C17.4336 12.8274 18.732 12.8274 19.5301 13.6255L25.6666 19.7623Z"
                      fill="#6D4EEA"
                    />
                    <path
                      d="M8.1666 12.8334C8.1666 14.122 7.12198 15.1666 5.8334 15.1666C4.54462 15.1666 3.5 14.122 3.5 12.8334C3.5 11.5446 4.54462 10.5 5.8334 10.5C7.12198 10.5 8.1666 11.5446 8.1666 12.8334Z"
                      fill="#6D4EEA"
                    />
                  </svg>
                </AvatarInfo>
              )}
              {!!formik.values?.avatar && (
                <ImageS
                  src={
                    typeof formik.values?.avatar === "string"
                      ? formik.values?.avatar
                      : imageUrl
                  }
                />
              )}
            </FileUploadLabel>

            <div>
              <Description style={{ margin: 0 }}>
                Рекомендуем использовать изображение размером не менее 600х600
                пикселей в формате PNG.
              </Description>

              <Description
                style={{
                  margin: 0,
                  color:
                    formik.touched?.logo && Boolean(formik.errors?.logo)
                      ? "#EB5757"
                      : "#828282",
                }}
              >
                Размер файла – не более 4 МБ.
              </Description>
            </div>
          </AvatarWrapper>
          {formik.touched?.avatar && Boolean(formik.errors?.avatar) && (
            <Error>Заполните поле</Error>
          )}
        </div>
      </Footer>
    </form>
  )
}

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
  max-width: 256px;
  width: 100%;
  &:first-child {
    margin-right: 32px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  ${theme.mqMax("md")} {
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

  input[type="file"] {
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

export default Edits
