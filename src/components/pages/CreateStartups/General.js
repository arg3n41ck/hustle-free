import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useFormik } from "formik"
import { Box, TextField } from "@mui/material"
import * as yup from "yup"
import SelectUI from "../../ui/Selects/Select"
import $api from "../../../services/axios"
import AnimateToggleScaleHeight from "../../ui/animation/AnimateToggleScaleHeight"
import { AuthButton } from "../Authorization/Authorization"
import { useBoolean } from "react-use"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { ru } from "date-fns/locale"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { MobileDatePicker } from "@mui/lab"
import { theme } from "../../../styles/theme"
import { Description } from "../ChangeData/General"
import { camelizeKeys, decamelizeKeys } from "humps"
import { changeFormatDataThunk } from "../../../redux/components/startups"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import { getCookie } from "../../../services/JWTService"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const validationSchema = yup.object({
  title: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  shortDescription: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  longDescription: yup.string(),
  link: yup.string().url(),
  industries: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  technologies: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  stages: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  fundings: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  salesModel: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  region: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  businessModel: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required()
    .test("other check", "", (value) => value !== "other"),
  startWork: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  presentation: yup.string().url(),
  logo: yup
    .mixed()
    .test("FILE_SIZE", "Размер файла должен быть – не более 4 МБ.", (value) => {
      if (!value) return true
      if (typeof value !== "string") {
        return !!value && (value.size / 1024 / 1024).toFixed(2) <= 4
      }
      return true
    }),
})

const selectPaths = [
  {
    name: "industries",
    path: "/startup/industries/",
  },
  {
    name: "technologies",
    path: "/startup/technologies/",
  },
  {
    name: "stages",
    path: "/startup/stages/",
  },
  {
    name: "fundings",
    path: "/startup/funding_rounds/",
  },
  {
    name: "salesModel",
    path: "/startup/sales_model/",
  },
  {
    name: "region",
    path: "/startup/headquarters_region/",
  },
  {
    name: "businessModel",
    path: "/startup/business_model/",
  },
]

const GeneralCreateStartup = ({
  initialValues,
  onChangeStartup,
  onView,
  id,
}) => {
  const { user } = useSelector((state) => state.user)
  const router = useRouter()
  const [sendChecker, setSendChecker] = useState(false)
  const [selectValues, setSelectValues] = useState({
    industries: false,
    technologies: false,
    stages: false,
    fundings: false,
    salesModel: false,
    region: false,
    businessModel: false,
  })
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      if (!sendChecker) {
        setSendChecker(true)
        const newValues = (() => {
          const obj = { ...values }
          const wasteKeys = [
            "teamMembers",
            "legalEntities",
            "businessPrograms",
            "legalEntitiesChecker",
            "companyName",
            "innBin",
            "galleries",
            "media",
            "numberOfTeam",
          ]
          for (const key in initialValues) {
            if (wasteKeys.includes(key)) delete obj[key]
          }

          return obj
        })()

        for (let key in values) {
          if (values[key] === null) {
            delete values[key]
          }
        }

        if (!values.logo || typeof values.logo === "string")
          delete newValues.logo

        for (const key of Object.keys(selectValues)) {
          if (!!newValues[key] && isNaN(+newValues[key])) {
            const select = selectPaths.find(
              (selectItem) => selectItem.name === key
            )
            const { data } = await $api.post(
              `${select.path}`,
              {
                title: newValues[key],
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            )
            newValues[key] = data?.id
          }
        }

        try {
          const newDecamelizeKeys = {
            ...decamelizeKeys(newValues),
            logo: newValues.logo,
            created_at: format(new Date(), "yyyy-MM-dd"),
            email: user.email,
          }
          if (typeof newDecamelizeKeys.logo === "string") {
            delete newDecamelizeKeys.logo
          }
          const { payload } = await dispatch(
            changeFormatDataThunk({
              itemData: newDecamelizeKeys,
              path: "startup/startups/",
            })
          )
          const newCamelizeKeys = camelizeKeys({ ...payload.data })
          for (let key in newCamelizeKeys) {
            if (Array.isArray(newCamelizeKeys[key])) {
              newCamelizeKeys[key] = `${newCamelizeKeys[key][0]}`
            }
          }
          formik.setValues(newCamelizeKeys)
          onChangeStartup(newCamelizeKeys)
          window.scrollTo(0, 0)
          onView(`details`)
          await router.push(`/profile/startups/create?id=${newCamelizeKeys.id}`)
        } catch (e) {
          throw e
        }
      }
    },
    validationSchema,
  })
  const [industries, setIndustries] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [stages, setStages] = useState([])
  const [fundings, setFundings] = useState([])
  const [salesModels, setSalesModels] = useState([])
  const [businessModels, setBusinessModels] = useState([])
  const [regions, setRegions] = useState([])

  const [checker, setChecker] = useBoolean(false)
  const [imageUrl, setImageUrl] = useState(initialValues.logo)

  const uploadImageToClient = (event) => {
    if (event.target.files[0]) {
      setImageUrl(event.target.files[0])
    }
  }

  function shallowEqual(object1, object2, setState) {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
      setState(false)
      return
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        setState(false)
        return
      }
    }
    setState(true)
  }

  useEffect(async () => {
    try {
      const {
        data: { results: resIndustries },
      } = await $api.get("/startup/industries/")
      setIndustries(resIndustries)

      const {
        data: { results: resTechnologies },
      } = await $api.get("/startup/technologies/")
      setTechnologies(resTechnologies)

      const {
        data: { results: resStages },
      } = await $api.get("/startup/stages/")
      setStages(resStages)

      const {
        data: { results: resFundings },
      } = await $api.get("/startup/funding_rounds/")
      setFundings(resFundings)

      const {
        data: { results: resSalesModel },
      } = await $api.get("/startup/sales_model/")
      setSalesModels(resSalesModel)

      const {
        data: { results: resBusinessModel },
      } = await $api.get("/startup/business_model/")
      setBusinessModels(resBusinessModel)

      const {
        data: { results: resRegion },
      } = await $api.get("/startup/headquarters_region/")
      setRegions(resRegion)
    } catch (e) {}
  }, [])

  useEffect(() => {
    shallowEqual(initialValues, formik.values, setChecker)
  }, [formik.values])

  useEffect(() => {
    return () => {}
  }, [])

  useEffect(() => {
    formik.setValues(initialValues)
  }, [initialValues])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Wrapper>
        <Header>
          <Title>Основные данные</Title>
        </Header>
        <Content>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Название стартапа</p>
            <TextField
              sx={{ width: "100%" }}
              name={"title"}
              value={formik.values.title}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Название стартапа"
              variant="outlined"
              error={formik.touched.title && !!formik.errors.title}
            />
          </div>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Короткое описание</p>
            <TextareaWrapper>
              <CountHint>
                {formik.values.shortDescription
                  ? formik.values.shortDescription.length
                  : 0}
                /500
              </CountHint>
              <TextareaS
                value={formik.values.shortDescription}
                name={"shortDescription"}
                onChange={formik.handleChange}
                rows={4}
                placeholder={"Короткое описание"}
                maxLength={500}
                error={
                  formik.touched.shortDescription &&
                  !!formik.errors.shortDescription
                }
              />
            </TextareaWrapper>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Полное описание</p>
            <TextareaWrapper>
              <CountHint>
                {formik.values.longDescription
                  ? formik.values.longDescription.length
                  : 0}
                /500
              </CountHint>
              <TextareaS
                value={formik.values.longDescription}
                name={"longDescription"}
                onChange={formik.handleChange}
                rows={4}
                placeholder={"Полное описание"}
                maxLength={500}
                error={
                  formik.touched.longDescription &&
                  !!formik.errors.longDescription
                }
              />
            </TextareaWrapper>
          </Box>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Ссылка на сайт</p>
            <TextField
              sx={{ width: "100%" }}
              name={"link"}
              value={formik.values.link}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Ссылка на сайт"
              variant="outlined"
              error={formik.touched.link && !!formik.errors.link}
            />
          </div>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Индустрия</p>
            <SelectUI
              name={"industries"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={formik.touched.industries && !!formik.errors.industries}
            >
              <option selected={!formik.values.industries} disabled value="">
                Индустрия
              </option>
              <option value="other">Другое</option>
              {industries.map((industry) => (
                <option
                  selected={+formik.values.industries === industry.id}
                  value={industry.id}
                >
                  {industry.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.industries}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"industries"}
                error={
                  !!(formik.touched.industries && formik.errors.industries)
                }
                helperText={
                  formik.touched.industries && formik.errors.industries
                }
                value={
                  typeof +formik.values.industries === "number" &&
                  formik.values.industries !== "other"
                    ? formik.values.industries
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "industries",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                placeholder="Введите индустрию"
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Технология</p>
            <SelectUI
              name={"technologies"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={
                formik.touched.technologies && !!formik.errors.technologies
              }
            >
              <option selected={!formik.values.technologies} disabled value="">
                Технология
              </option>
              <option value="other">Другое</option>
              {technologies.map((technology) => (
                <option
                  selected={+formik.values.technologies === technology.id}
                  value={technology.id}
                >
                  {technology.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.technologies}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"technologies"}
                placeholder="Введите Технологию"
                error={
                  !!(formik.touched.technologies && formik.errors.technologies)
                }
                helperText={
                  formik.touched.technologies && formik.errors.technologies
                }
                value={
                  typeof +formik.values.technologies === "number" &&
                  formik.values.technologies !== "other"
                    ? formik.values.technologies
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "technologies",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Стадия</p>
            <SelectUI
              name={"stages"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={formik.touched.stages && !!formik.errors.stages}
            >
              <option selected={!formik.values.stages} disabled value="">
                Стадия
              </option>
              <option value="other">Другое</option>
              {stages.map((stage) => (
                <option
                  selected={+formik.values.stages === stage.id}
                  value={stage.id}
                >
                  {stage.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.stages}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"stages"}
                placeholder="Введите стадию"
                error={!!(formik.touched.stages && formik.errors.stages)}
                helperText={formik.touched.stages && formik.errors.stages}
                value={
                  typeof +formik.values.stages === "number" &&
                  formik.values.stages !== "other"
                    ? formik.values.stages
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "stages",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Раунд финансирования</p>
            <SelectUI
              name={"fundings"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={formik.touched.fundings && !!formik.errors.fundings}
            >
              <option selected={!formik.values.fundings} disabled value="">
                Регион штаб квартиры стартапа
              </option>
              <option value="other">Другое</option>
              {fundings.map((funding) => (
                <option
                  selected={+formik.values.fundings === funding.id}
                  value={funding.id}
                >
                  {funding.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.fundings}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"fundings"}
                placeholder="Введите раунд финансирования"
                error={!!(formik.touched.fundings && formik.errors.fundings)}
                helperText={formik.touched.fundings && formik.errors.fundings}
                value={
                  typeof +formik.values.fundings === "number" &&
                  formik.values.fundings !== "other"
                    ? formik.values.fundings
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "fundings",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Модель продаж</p>
            <SelectUI
              name={"salesModel"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={formik.touched.salesModel && !!formik.errors.salesModel}
            >
              <option selected={!formik.values.salesModel} disabled value="">
                Модель продаж
              </option>
              <option value="other">Другое</option>
              {salesModels.map((salesModel) => (
                <option
                  selected={+formik.values.salesModel === salesModel.id}
                  value={salesModel.id}
                >
                  {salesModel.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.salesModel}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"salesModel"}
                placeholder="Введите модель продаж"
                error={
                  !!(formik.touched.salesModel && formik.errors.salesModel)
                }
                helperText={
                  formik.touched.salesModel && formik.errors.salesModel
                }
                value={
                  typeof +formik.values.salesModel === "number" &&
                  formik.values.salesModel !== "other"
                    ? formik.values.salesModel
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "salesModel",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Регион штаб квартиры стартапа</p>
            <SelectUI
              name={"region"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={formik.touched.region && !!formik.errors.region}
            >
              <option selected={!formik.values.region} disabled value="">
                Регион штаб квартиры стартапа
              </option>
              <option value="other">Другое</option>
              {regions.map((region) => (
                <option
                  selected={+formik.values.region === region.id}
                  value={region.id}
                >
                  {region.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.region}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"region"}
                placeholder="Введите регион штаб квартиры стартапа"
                error={!!(formik.touched.region && formik.errors.region)}
                helperText={formik.touched.region && formik.errors.region}
                value={
                  typeof +formik.values.region === "number" &&
                  formik.values.region !== "other"
                    ? formik.values.region
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "region",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box sx={{ marginBottom: "24px" }}>
            <p className="auth-title__input">Бизнес модель</p>
            <SelectUI
              name={"businessModel"}
              onChange={(e) => {
                setSelectValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value === "other",
                }))
                formik.handleChange(e)
              }}
              error={
                formik.touched.businessModel && !!formik.errors.businessModel
              }
            >
              <option selected={!formik.values.businessModel} disabled value="">
                Бизнес модель
              </option>
              <option value="other">Другое</option>
              {businessModels.map((businessModel) => (
                <option
                  selected={+formik.values.businessModel === businessModel.id}
                  value={businessModel.id}
                >
                  {businessModel.title}
                </option>
              ))}
            </SelectUI>
            <AnimateToggleScaleHeight value={selectValues.businessModel}>
              <TextField
                sx={{ marginTop: 2 }}
                name={"businessModel"}
                placeholder="Введите бизнес модель"
                error={
                  !!(
                    formik.touched.businessModel && formik.errors.businessModel
                  )
                }
                helperText={
                  formik.touched.businessModel && formik.errors.businessModel
                }
                value={
                  typeof +formik.values.businessModel === "number" &&
                  formik.values.businessModel !== "other"
                    ? formik.values.businessModel
                    : ""
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "businessModel",
                    e.target.value.replace(/[^\sa-zA-ZА-Яa-z]/gi, "")
                  )
                }
                fullWidth
              />
            </AnimateToggleScaleHeight>
          </Box>

          <Box
            sx={{
              "& .MuiFormControl-root": {
                display: "flex",
              },
            }}
            className="auth-wrapper__input"
          >
            <p className="auth-title__input">Начало работы стартапа</p>
            <LocalizationProvider locale={ru} dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                toolbarTitle={"Выбрать дату"}
                cancelText={"Отмена"}
                value={formik.values.startWork}
                onChange={(value) => {
                  if (value) {
                    formik.setFieldValue(
                      "startWork",
                      format(value, "yyyy-MM-dd")
                    )
                  }
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.startWork &&
                      Boolean(formik.errors.startWork)
                    }
                    defaultValue={formik.values.startWork}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: formik.values.startWork
                        ? "ДД/ММ/ГГГГ"
                        : "Начало работы стартапа",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">Ссылка на презентацию</p>
            <TextField
              sx={{ width: "100%" }}
              name={"presentation"}
              value={formik.values.presentation}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Ссылка на презентацию"
              variant="outlined"
              error={
                formik.touched.presentation && !!formik.errors.presentation
              }
            />
          </div>

          <LogoFieldWrapper
            error={formik.touched.logo && Boolean(formik.errors.logo)}
          >
            <Title>Логотип стартапа</Title>
            <Description>
              Логотип профиля показывается, например, рядом с вашими профилем
              или Реестр предприятий
            </Description>
            <AvatarWrapper>
              <FileUploadLabel
                htmlFor={"startup-logo"}
                hasAvatar={formik.values.logo}
              >
                <input
                  id={"startup-logo"}
                  name={"logo"}
                  accept="image/png"
                  onChange={(e) => {
                    uploadImageToClient(e)
                    const file = e.target.files[0]
                    formik.setFieldValue("logo", file)
                  }}
                  type="file"
                />
                <AvatarInfo>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.6035 17.5H34.6465V12.0056H40V9.07531H34.6465V3.75H31.6035V9.07531H26.25V12.0056H31.6035V17.5Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M32.0832 24.7028V19.5H35V30.625C35 33.0371 33.0371 35 30.625 35H4.375C2.22248 35 0.437393 33.4339 0.0771713 31.3834C0.0130844 31.217 0.00427246 31.0405 0.0248337 30.8656C0.0228398 30.8297 0.0178063 30.7947 0.0127882 30.7598C0.00638189 30.7152 0 30.6708 0 30.625V13.125C0 10.7129 1.96293 8.75 4.375 8.75H24.25V11.6668H4.375C3.57151 11.6668 2.91676 12.3215 2.91676 13.125V27.6193L8.39993 22.1362C9.39594 21.1385 11.0192 21.1385 12.0166 22.1362L13.8543 23.9736L20.7959 17.0319C21.792 16.0343 23.415 16.0343 24.4126 17.0319L32.0832 24.7028Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M10.2082 16.0418C10.2082 17.6525 8.90247 18.9582 7.29176 18.9582C5.68077 18.9582 4.375 17.6525 4.375 16.0418C4.375 14.4308 5.68077 13.125 7.29176 13.125C8.90247 13.125 10.2082 14.4308 10.2082 16.0418Z"
                      fill="#27AE60"
                    />
                  </svg>
                  {!!formik.values.logo && (
                    <AvatarText>Изменить фотографию</AvatarText>
                  )}
                </AvatarInfo>
                {!!formik.values.logo && (
                  <ImageS
                    src={
                      typeof formik.values.logo === "string"
                        ? formik.values.logo
                        : URL.createObjectURL(imageUrl)
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
                      formik.touched.logo && Boolean(formik.errors.logo)
                        ? "#EB5757"
                        : "#828282",
                  }}
                >
                  Размер файла – не более 4 МБ.
                </Description>
              </div>
            </AvatarWrapper>
          </LogoFieldWrapper>
        </Content>
      </Wrapper>
      <AuthButton
        style={{ marginBottom: 70, marginTop: 30 }}
        active={!checker}
        disabled={checker}
        onClick={() => {
          const firstError = Object.keys(formik.errors || {})[0]
          if (firstError)
            toast.error(`Упс... какое-то поле неправильно заполнено.`, {
              autoClose: 4000,
            })
        }}
        type="submit"
      >
        {id ? "Сохранить" : "Далее"}
      </AuthButton>
    </form>
  )
}

const LogoFieldWrapper = styled.div`
  margin: 32px 0 0;
  padding: ${({ error }) => (error ? "5px" : "0")};
  border: ${({ error }) => (error ? "1px" : "0")} solid #eb5757;
  border-radius: 8px;
`

const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
`
const Header = styled.div`
  padding: 30px;
  border-bottom: 1px solid #e5e5e5;
`
const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const Content = styled.div`
  padding: 30px;
`
const TextareaWrapper = styled.div`
  position: relative;
`
const CountHint = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
`
const TextareaS = styled.textarea`
  background: #ffffff;
  border: 1.5px solid ${(p) => (p.error ? "red" : "#e0e0e0")};
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 187px;
  padding: 20px;
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 24px;

  &::placeholder {
    color: #bdbdbd;
  }
`

const AvatarInfo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
const AvatarWrapper = styled.div`
  display: flex;
  ${theme.mqMax("md")} {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const ImageS = styled.img`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const AvatarText = styled.p`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
`
const FileUploadLabel = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: ${(p) => (p.hasAvatar ? "none" : "2px dashed #27ae60")};
  border-radius: 8px;
  width: 100%;
  max-width: 200px;
  height: 200px;
  margin-right: 24px;
  overflow: hidden;
  ${theme.mqMax("md")} {
    margin-top: 30px;
  }
  div {
    display: ${(p) => (p.hasAvatar ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    div {
      display: flex;
      background: ${(p) =>
        p.hasAvatar
          ? "rgba(0, 0, 0, .3)"
          : "linear-gradient(0deg, #f1fbf5, #f1fbf5), #ffffff"};
    }
    div {
      svg * {
        fill: ${(p) => (!p.hasAvatar ? "#27AE60" : "#fff")};
      }
    }
  }
  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`

export default GeneralCreateStartup
