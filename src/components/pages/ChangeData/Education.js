import React, { useState } from "react"
import styled from "styled-components"
import { Box, Checkbox, TextField } from "@mui/material"
import { FieldArray, Form, Formik, getIn } from "formik"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import * as yup from "yup"
import { ru } from "date-fns/locale"
import { AuthButton } from "../Authorization/Authorization"
import { format } from "date-fns"
import { useDispatch } from "react-redux"
import {
  changeUserItemThunk,
  saveUserItem,
} from "../../../redux/components/user"
import { theme } from "../../../styles/theme"
import $api from "../../../services/axios"
import { DeleteWrapper } from "./Career"
import SelectUI from "../../ui/Selects/Select"

const validationSchema = yup.object().shape({
  educations: yup.array().of(
    yup.object({
      title: yup
        .string()
        .test(
          "title",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      profession: yup
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
      country: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      degreeOfEducation: yup
        .string()
        .test(
          "",
          "Заполните поле",
          (value) => !!(value || " ").replace(/\s/g, "")
        )
        .required("Заполните поле"),
      untilNow: yup.boolean(),
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
      // endDate: yup.date().required("Заполните поле"),
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
    })
  ),
})

const Education = ({ user, onTabs, countries }) => {
  const [educations, setEducations] = useState(null)
  const [deleteIds, setDeleteIds] = useState([])
  const [checker, setChecker] = useState(true)
  const [cities, setCities] = useState([])
  const formRef = React.useRef()
  const dispatch = useDispatch()

  React.useEffect(() => {
    setEducations(
      user.educations.length
        ? user.educations
        : [
            {
              degreeOfEducation: "",
              endDate: null,
              logo: "",
              placeOfStudy: "",
              profession: "",
              startDate: null,
              title: "",
              user: user.id,
              untilNow: false,
            },
          ]
    )
  }, [user])

  const checkerHandler = () => {
    if (
      JSON.stringify(educations) !==
      JSON.stringify(formRef.current?.values.educations)
    ) {
      setChecker(false)
    } else {
      setChecker(true)
    }
  }

  const countryHandler = async (value) => {
    const {
      data: { results: citiesRes },
    } = await $api.get(`/accounts/countries/?search=${value}`)

    setCities(citiesRes[0].city)
  }

  return (
    <>
      <Formik
        innerRef={formRef}
        onSubmit={async (values) => {
          if (!checker) {
            for (let careerId of deleteIds) {
              await $api.delete(`/accounts/educations/${careerId}/`)
            }
            dispatch(
              changeUserItemThunk({
                pathItem: "educations",
                values: values.educations,
              })
            )
            dispatch(
              saveUserItem({ userItem: "educations", value: values.educations })
            )
            onTabs("skills")
          }
        }}
        initialValues={{
          educations: user.educations.length
            ? [...user.educations]
            : [
                {
                  degreeOfEducation: "",
                  endDate: null,
                  logo: "",
                  placeOfStudy: "",
                  profession: "",
                  startDate: null,
                  title: "",
                  user: user.id,
                  untilNow: false,
                },
              ],
        }}
        validationSchema={validationSchema}
      >
        {({ values, touched, errors, handleChange, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <Wrapper>
              <Title>Образование</Title>
              <Line />
              <FieldArray name="educations">
                {({ push, remove }) => (
                  <>
                    {values.educations.map((e, index) => {
                      checkerHandler()
                      const country = `educations[${index}].country`,
                        touchedCountry = getIn(touched, country),
                        errorCountry = getIn(errors, country),
                        city = `educations[${index}].city`,
                        touchedCity = getIn(touched, city),
                        errorCity = getIn(errors, city),
                        title = `educations[${index}].title`,
                        touchedTitle = getIn(touched, title),
                        errorTitle = getIn(errors, title),
                        profession = `educations[${index}].profession`,
                        touchedProfession = getIn(touched, profession),
                        errorProfession = getIn(errors, profession),
                        degreeOfEducation = `educations[${index}].degreeOfEducation`,
                        touchedDegreeOfEducation = getIn(
                          touched,
                          degreeOfEducation
                        ),
                        errorDegreeOfEducation = getIn(
                          errors,
                          degreeOfEducation
                        ),
                        startDate = `educations[${index}].startDate`,
                        touchedStartDate = getIn(touched, startDate),
                        errorStartDate = getIn(errors, startDate),
                        endDate = `educations[${index}].endDate`,
                        touchedEndDate = getIn(touched, endDate),
                        errorEndDate = getIn(errors, endDate),
                        untilNow = `educations[${index}].untilNow`

                      return (
                        <Box sx={{ padding: "20px" }}>
                          <div className="auth-wrapper__input">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="auth-title__input">
                                Страна №{index + 1}
                              </p>
                              {index !== 0 && (
                                <DeleteWrapper
                                  onClick={() => {
                                    if (e.id)
                                      setDeleteIds((prev) => [...prev, e.id])
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
                            <SelectUI
                              error={!!(touchedCountry && errorCountry)}
                              onChange={(e) => {
                                countryHandler(e.target.value)
                                setFieldValue(city, "")
                                setFieldValue(country, e.target.value)
                              }}
                              value={e.country}
                              name={country}
                            >
                              <option
                                style={{ color: "#BDBDBD" }}
                                disabled
                                selected
                                value={values.educations[index].country ?? ""}
                              >
                                {!!values.educations[index].country
                                  ? values.educations[index].country
                                  : "Страна"}
                              </option>
                              {countries
                                .filter(
                                  (country) =>
                                    country.title !==
                                    values.educations[index].country
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
                            {/*  onChange={handleChange}*/}
                            {/*  value={e.city}*/}
                            {/*  name={city}*/}
                            {/*  fullWidth*/}
                            {/*/>*/}
                            <SelectUI
                              error={!!(touchedCity && errorCity)}
                              value={e.city}
                              onChange={handleChange}
                              name={city}
                            >
                              <option
                                style={{ color: "#BDBDBD" }}
                                disabled
                                selected
                                value={values.educations[index].city ?? ""}
                              >
                                {!!values.educations[index].city
                                  ? values.educations[index].city
                                  : "Город"}
                              </option>
                              {cities
                                .filter(
                                  (cityItem) =>
                                    cityItem.title !==
                                    values.educations[index].city
                                )
                                .map((cityItem) => (
                                  <option value={cityItem.title}>
                                    {cityItem.title}
                                  </option>
                                ))}
                            </SelectUI>
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">ВУЗ</p>
                            <TextField
                              sx={{ width: "100%" }}
                              name={title}
                              required
                              onChange={handleChange}
                              value={e.title}
                              id="outlined-basic"
                              placeholder="ВУЗ"
                              variant="outlined"
                              error={!!(touchedTitle && errorTitle)}
                            />
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">Специальность</p>
                            <TextField
                              sx={{ width: "100%" }}
                              name={profession}
                              value={e.profession}
                              onChange={handleChange}
                              id="outlined-basic"
                              placeholder="Специальность"
                              variant="outlined"
                              required
                              error={!!(touchedProfession && errorProfession)}
                            />
                          </div>

                          <div className="auth-wrapper__input">
                            <p className="auth-title__input">
                              Степень образование
                            </p>
                            <TextField
                              sx={{ width: "100%" }}
                              name={degreeOfEducation}
                              value={e.degreeOfEducation}
                              onChange={handleChange}
                              id="outlined-basic"
                              placeholder="Степень образование"
                              variant="outlined"
                              required
                              error={
                                !!(
                                  touchedDegreeOfEducation &&
                                  errorDegreeOfEducation
                                )
                              }
                            />
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
                              Дата начала обучения
                            </p>
                            <LocalizationProvider
                              locale={ru}
                              dateAdapter={AdapterDateFns}
                            >
                              <MobileDatePicker
                                toolbarTitle={"Выбрать дату"}
                                cancelText={"Отмена"}
                                onChange={(value) =>
                                  setFieldValue(
                                    `educations[${index}].startDate`,
                                    format(new Date(value), "yyyy-MM-dd")
                                  )
                                }
                                value={e.startDate}
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
                              Дата окончания обучения
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
                                checked={e.untilNow}
                                name={untilNow}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFieldValue(
                                      `educations[${index}].endDate`,
                                      null
                                    )
                                    setFieldValue(
                                      `educations[${index}].untilNow`,
                                      e.target.checked
                                    )
                                  } else {
                                    setFieldValue(
                                      `educations[${index}].untilNow`,
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
                                disabled={e.untilNow}
                                name={endDate}
                                value={e.endDate}
                                onChange={(value) =>
                                  setFieldValue(
                                    `educations[${index}].endDate`,
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
                        </Box>
                      )
                    })}
                    <AddBtnWrapper>
                      <AddBtn
                        onClick={() =>
                          push({
                            degreeOfEducation: "",
                            endDate: null,
                            logo: "http://localhost:5000/media/education/logo/Ellipse_3.png",
                            placeOfStudy: "",
                            profession: "",
                            startDate: null,
                            untilNow: false,
                            title: "",
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
                        {" Добавить ВУЗ"}
                      </AddBtn>
                    </AddBtnWrapper>
                  </>
                )}
              </FieldArray>
            </Wrapper>
            <AuthButton
              style={{ marginBottom: 70 }}
              active={!checker}
              disabled={checker}
              type="submit"
            >
              Сохранить
            </AuthButton>
          </Form>
        )}
      </Formik>
    </>
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
const AddBtnWrapper = styled.div`
  border-top: 1px solid #d8d8d8;
  padding: 32px;
`
const AddBtn = styled.button`
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
export default Education
