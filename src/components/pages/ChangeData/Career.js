import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material"
import { Formik, Form, FieldArray, getIn } from "formik"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import * as yup from "yup"

import { AuthButton } from "../Authorization/Authorization"
import { useDispatch, useSelector } from "react-redux"
import {
  changeUserItemThunk,
  saveUserItem,
} from "../../../redux/components/user"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { theme } from "../../../styles/theme"
import $api from "../../../services/axios"
import SelectUI from "../../ui/Selects/Select"

const validationSchema = yup.object().shape({
  careers: yup.array().of(
    yup.object({
      startup: yup.string().nullable(),
      placeOfWork: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      country: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      city: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      untilNow: yup.boolean(),
      endDate: yup
        .date()
        .nullable()
        .when("untilNow", {
          is: (untilNow) => !untilNow,
          then: yup.date().required("Заполните поле"),
        })
        .test({
          test: function (value) {
            return !(
              !this.parent.untilNow &&
              new Date(this.parent.startDate).getTime() >
                new Date(value).getTime()
            )
          },
        }),
      startDate: yup
        .date()
        .required("Заполните поле")
        .test({
          test: function (value) {
            return !(
              !this.parent.untilNow &&
              new Date(this.parent.endDate).getTime() <
                new Date(value).getTime()
            )
          },
        }),
      position: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
    })
  ),
})

const Career = ({ user, onTabs, countries }) => {
  const [careers, setCareers] = useState(null)
  const [checker, setChecker] = useState(true)
  const [deleteIds, setDeleteIds] = useState([])

  const formRef = React.useRef()
  const dispatch = useDispatch()
  const { skills } = useSelector((state) => state.skills)
  const { startups } = useSelector((state) => state.startups)
  const [cities, setCities] = useState([])

  useEffect(() => {
    const newArr = user.careers.map((career) => {
      if (career.startup) {
        const startup = startups.find((item) => career.startup === item.id)
        return { ...career, placeOfWork: startup?.title, startup: null }
      }
      return career
    })
    setCareers(newArr)
    formRef.current.setFieldValue(`careers`, newArr)
  }, [user])

  const checkerHandler = () => {
    if (
      JSON.stringify(careers) !==
      JSON.stringify(formRef.current?.values.careers)
    ) {
      setChecker(false)
    } else {
      setChecker(true)
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      if (skills.some((item) => item.title === e.target.value)) {
        formRef.current.setFieldValue(
          `careers[${index}].startup`,
          e.target.value
        )
      }
    }
  }

  const disableKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }

  const countryHandler = async (value) => {
    const {
      data: { results: citiesRes },
    } = await $api.get(`/accounts/countries/?search=${value}`)

    setCities(citiesRes[0].city)
  }

  return (
    <Formik
      initialValues={{
        careers: user.careers.length
          ? user.careers.map((career) => {
              if (career.startup) {
                const startup = startups.find(
                  (item) => career.startup === item.id
                )
                return { ...career, placeOfWork: startup?.title, startup: null }
              }
              return career
            })
          : [
              {
                startup: null,
                placeOfWork: "",
                position: "",
                country: "",
                city: "",
                startDate: null,
                endDate: null,
                untilNow: false,
                user: user.id,
              },
            ],
      }}
      onSubmit={async (values) => {
        if (!checker) {
          try {
            const newArr = values?.careers.map((item) => {
              const startupChecker = startups.find(
                (itemStartup) => itemStartup.title === item.placeOfWork
              )
              if (startupChecker) {
                return {
                  ...item,
                  startup: startupChecker.id,
                  placeOfWork: null,
                }
              }
              return item
            })
            for (let careerId of deleteIds) {
              await $api.delete(`/accounts/careers/${careerId}/`)
            }
            dispatch(
              changeUserItemThunk({ pathItem: "careers", values: newArr })
            )
            dispatch(saveUserItem({ userItem: "careers", value: newArr }))
            onTabs("education")
          } catch (e) {}
        }
      }}
      validationSchema={validationSchema}
      innerRef={formRef}
    >
      {({ values, touched, errors, handleChange, setFieldValue }) => (
        <Form onKeyDown={disableKeyDown} noValidate autoComplete="off">
          <Wrapper>
            <Title>Карьера</Title>
            <Line />
            <FieldArray name="careers">
              {({ push, remove }) => {
                checkerHandler()
                return (
                  <>
                    {values.careers.map((c, index) => {
                      const country = `careers[${index}].country`,
                        touchedCountry = getIn(touched, country),
                        errorCountry = getIn(errors, country),
                        city = `careers[${index}].city`,
                        touchedCity = getIn(touched, city),
                        errorCity = getIn(errors, city),
                        startDate = `careers[${index}].startDate`,
                        touchedStartDate = getIn(touched, startDate),
                        errorStartDate = getIn(errors, startDate),
                        endDate = `careers[${index}].endDate`,
                        touchedEndDate = getIn(touched, endDate),
                        errorEndDate = getIn(errors, endDate),
                        placeOfWork = `careers[${index}].placeOfWork`,
                        touchedPlaceOfWork = getIn(touched, placeOfWork),
                        errorPlaceOfWork = getIn(errors, placeOfWork),
                        untilNow = `careers[${index}].untilNow`,
                        position = `careers[${index}].position`,
                        touchedPosition = getIn(touched, position),
                        errorPosition = getIn(errors, position)

                      return (
                        <Box key={index} sx={{ padding: 2.2 }}>
                          <div className="auth-wrapper__input">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="auth-title__input">
                                Место работы №{index + 1}
                              </p>
                              {index !== 0 && (
                                <DeleteWrapper
                                  onClick={() => {
                                    if (c.id)
                                      setDeleteIds((prev) => [...prev, c.id])
                                    remove(index)
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 15L10 12"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M14 15L14 12"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                                      stroke="#EB5757"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                    />
                                  </svg>

                                  <span style={{ marginLeft: 11 }}>
                                    Удалить
                                  </span>
                                </DeleteWrapper>
                              )}
                            </Box>
                            <Autocomplete
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  width: 0,
                                },
                              }}
                              onChange={(e, value) =>
                                setFieldValue(
                                  `careers[${index}].placeOfWork`,
                                  value
                                )
                              }
                              value={c.placeOfWork}
                              noOptionsText={"Ничего не найдено"}
                              fullWidth
                              options={startups.map((option) => option.title)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  name={placeOfWork}
                                  value={c.placeOfWork}
                                  onChange={handleChange}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  id="outlined-basic"
                                  placeholder="Введите название стартапа или компании"
                                  variant="outlined"
                                  error={
                                    !!(touchedPlaceOfWork && errorPlaceOfWork)
                                  }
                                  InputProps={{
                                    ...params.InputProps,
                                  }}
                                />
                              )}
                            />
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">Страна</p>
                            {/*<TextField*/}
                            {/*  error={!!(touchedCountry && errorCountry)}*/}
                            {/*  onChange={handleChange}*/}
                            {/*  value={c.country}*/}
                            {/*  name={country}*/}
                            {/*  fullWidth*/}
                            {/*/>*/}
                            <SelectUI
                              error={!!(touchedCountry && errorCountry)}
                              onChange={(e) => {
                                countryHandler(e.target.value)
                                setFieldValue(city, "")
                                setFieldValue(country, e.target.value)
                              }}
                              value={c.country}
                              name={country}
                            >
                              <option
                                style={{ color: "#BDBDBD" }}
                                disabled
                                selected
                                value={values.careers[index].country ?? ""}
                              >
                                {!!values.careers[index].country
                                  ? values.careers[index].country
                                  : "Страна"}
                              </option>
                              {countries
                                .filter(
                                  (country) =>
                                    country.title !==
                                    values.careers[index].country
                                )
                                .map((country) => (
                                  <option value={country.title}>
                                    {country.title}
                                  </option>
                                ))}
                            </SelectUI>
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">Город</p>
                            {/*<TextField*/}
                            {/*  error={!!(touchedCity && errorCity)}*/}
                            {/*  value={c.city}*/}
                            {/*  onChange={handleChange}*/}
                            {/*  name={city}*/}
                            {/*  fullWidth*/}
                            {/*/>*/}
                            <SelectUI
                              error={!!(touchedCity && errorCity)}
                              value={c.city}
                              onChange={handleChange}
                              name={city}
                            >
                              <option
                                style={{ color: "#BDBDBD" }}
                                disabled
                                selected
                                value={values.careers[index].city ?? ""}
                              >
                                {!!values.careers[index].city
                                  ? values.careers[index].city
                                  : "Город"}
                              </option>
                              {cities
                                .filter(
                                  (cityItem) =>
                                    cityItem.title !==
                                    values.careers[index].city
                                )
                                .map((cityItem) => (
                                  <option value={cityItem.title}>
                                    {cityItem.title}
                                  </option>
                                ))}
                            </SelectUI>
                          </div>

                          <Box
                            sx={{
                              "& .MuiFormControl-root": {
                                display: "flex",
                              },
                            }}
                            className="auth-wrapper__input"
                          >
                            <p className="auth-title__input">
                              Год начала работы
                            </p>
                            <LocalizationProvider
                              locale={ru}
                              dateAdapter={AdapterDateFns}
                            >
                              <MobileDatePicker
                                toolbarTitle={"Выбрать дату"}
                                cancelText={"Отмена"}
                                value={c.startDate}
                                onChange={(value) =>
                                  setFieldValue(
                                    `careers[${index}].startDate`,
                                    format(new Date(value), "yyyy-MM-dd")
                                  )
                                }
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={
                                      !!(touchedStartDate && errorStartDate)
                                    }
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "ДД/ММ/ГГГГ",
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Box>

                          <Box
                            sx={{
                              "& .MuiFormControl-root": {
                                display: "flex",
                              },
                            }}
                            className="auth-wrapper__input"
                          >
                            <p className="auth-title__input">
                              Год окончания работы
                            </p>
                            <Box
                              component={"label"}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                margin: "24px 0",
                                cursor: "pointer",
                              }}
                            >
                              <Checkbox
                                checked={c.untilNow}
                                name={untilNow}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldValue(
                                      `careers[${index}].endDate`,
                                      null
                                    )
                                    setFieldValue(
                                      `careers[${index}].untilNow`,
                                      e.target.checked
                                    )
                                  } else {
                                    setFieldValue(
                                      `careers[${index}].untilNow`,
                                      e.target.checked
                                    )
                                  }
                                }}
                                sx={{
                                  color: "#27AE60",
                                  borderRadius: 2,
                                  width: 16,
                                  height: 16,
                                  marginRight: 0.8,
                                  "&.Mui-checked": {
                                    color: "primary",
                                  },
                                }}
                              />
                              <p>По настоящее время</p>
                            </Box>
                            <LocalizationProvider
                              locale={ru}
                              dateAdapter={AdapterDateFns}
                            >
                              <MobileDatePicker
                                toolbarTitle={"Выбрать дату"}
                                cancelText={"Отмена"}
                                disabled={c.untilNow}
                                value={c.endDate}
                                onChange={(value) =>
                                  setFieldValue(
                                    `careers[${index}].endDate`,
                                    format(new Date(value), "yyyy-MM-dd")
                                  )
                                }
                                inputFormat="dd/MM/yyyy"
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={!!(touchedEndDate && errorEndDate)}
                                    inputProps={{
                                      ...params.inputProps,
                                      placeholder: "ДД/ММ/ГГГГ",
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Box>

                          {!!(touchedEndDate && errorEndDate) &&
                            !!(touchedStartDate && errorStartDate) && (
                              <ErrorMessage>Неверная дата</ErrorMessage>
                            )}

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">Должность</p>
                            <TextField
                              sx={{ width: "100%" }}
                              name={position}
                              onChange={handleChange}
                              value={c.position}
                              id="outlined-basic"
                              placeholder="Должность"
                              variant="outlined"
                              error={!!(touchedPosition && errorPosition)}
                            />
                          </div>
                        </Box>
                      )
                    })}
                    <AddBtnWrapper>
                      <AddBtn
                        onClick={() =>
                          push({
                            startup: "",
                            placeOfWork: "",
                            position: "",
                            country: "",
                            city: "",
                            startDate: null,
                            endDate: null,
                            untilNow: false,
                            user: user.id,
                          })
                        }
                        type={"button"}
                      >
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5 6L12.5 18"
                            stroke="#27AE60"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M18.5 12L6.5 12"
                            stroke="#27AE60"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        {" Добавить место работы"}
                      </AddBtn>
                    </AddBtnWrapper>
                  </>
                )
              }}
            </FieldArray>
          </Wrapper>
          <AuthButton
            style={{ marginBottom: 70 }}
            active={!checker}
            type="submit"
          >
            Сохранить
          </AuthButton>
        </Form>
      )}
    </Formik>
  )
}
const Wrapper = styled.div`
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 16px;
  max-width: 832px;
  margin-bottom: 32px;
  ${theme.mqMax("xl")} {
    max-width: none;
  }
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
  padding: 32px;
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
`
export const AddBtnWrapper = styled.div`
  border-top: 1px solid #d8d8d8;
  padding: 32px;
`
export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: rgba(111, 207, 151, 0.1);
  border-radius: 12px;
  padding: 20px 0;
  text-align: center;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
`
const ErrorMessage = styled.p`
  color: #eb5757;
  margin-top: -5px;
  margin-bottom: 24px;
`
export const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    color: #eb5757;
  }
`

export default Career
