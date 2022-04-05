import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import $api from "../../../../services/axios"
import { AuthButton } from "../../Authorization/Authorization"
import { useDispatch, useSelector } from "react-redux"
import {
  changeChangeService,
  changeChangeServiceId,
} from "../../../../redux/components/startups"
import { toast } from "react-toastify"

const validationSchema = yup.object({
  title: yup
    .string()
    .max(255, "Слишком длинное название услуги")
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  description: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  condition: yup
    .string()
    .test("", "Заполните поле", (value) => !!(value || " ").replace(/\s/g, ""))
    .required(),
  priceFrom: yup.string(),
  priceTo: yup
    .string()
    .test(
      "",
      "Конечная цена должна быть больше начальной цены",
      function (value) {
        if (!value || !this.parent.priceFrom) return true
        return (
          !!this.parent.priceFrom &&
          Math.floor(+this.parent.priceFrom) < Math.floor(+value)
        )
      }
    ),
})

const CreateService = ({ startupId, setServices, onView }) => {
  const dispatch = useDispatch()
  const { changeService, changeServiceId } = useSelector(
    (state) => state.startups
  )
  const formik = useFormik({
    initialValues: {
      ...changeService,
      priceFrom: Math.floor(+changeService.priceFrom)
        ? Math.floor(+changeService.priceFrom)
        : "",
      priceTo: Math.floor(+changeService.priceTo)
        ? Math.floor(+changeService.priceTo)
        : "",
    },
    onSubmit: async (values, { resetForm }) => {
      const sendData = {
        ...values,
        startup: startupId,
        priceTo: values.priceTo ? `${Math.floor(values.priceTo)}` : null,
        priceFrom: values.priceFrom ? `${Math.floor(values.priceFrom)}` : null,
      }
      toast.info("Ожидайте ответа от сервера", { autoClose: 5000 })
      try {
        if (!changeServiceId) {
          const { data } = await $api.post("/services/", sendData)
          setServices((prev) => (prev ? [...prev, data] : [data]))
          resetForm()
        } else {
          const { data } = await $api.put(
            `/services/${changeServiceId}/`,
            sendData
          )
          setServices((prev) => {
            const index = prev.findIndex(
              (service) => service.id === changeServiceId
            )
            return [...prev.slice(0, index), data, ...prev.slice(index + 1)]
          })
        }
        dispatch(changeChangeService(formik.values))
        onView()
        toast.success("Создание услуги прошло успешно!")
      } catch (e) {
        throw e
      }
    },
    validationSchema,
  })

  useEffect(async () => {
    window.scrollTo(0, 0)
    if (changeServiceId) {
      const { data } = await $api.get(`/services/${changeServiceId}/`)
      const newObj = {
        ...data,
        priceFrom: Math.floor(+data.priceFrom)
          ? Math.floor(+data.priceFrom)
          : "",
        priceTo: Math.floor(+data.priceTo) ? Math.floor(+data.priceTo) : "",
      }
      dispatch(changeChangeService(newObj))
      await formik.setValues(newObj)
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(
        changeChangeService({
          title: "",
          description: "",
          condition: "",
          priceFrom: "",
          priceTo: "",
        })
      )
      dispatch(changeChangeServiceId(null))
    }
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Wrapper>
        <Header>
          <Title>Основная информация</Title>{" "}
        </Header>
        <Content>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Название услуги</p>
            <TextField
              sx={{ width: "100%" }}
              name={"title"}
              value={formik.values.title}
              onChange={formik.handleChange}
              id="outlined-basic"
              placeholder="Введите полное название"
              variant="outlined"
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
          </div>

          <Box sx={{ marginBottom: 2.4 }}>
            <p className="auth-title__input">Короткое описание</p>
            <TextareaWrapper>
              <CountHint>
                {formik.values.description
                  ? formik.values.description.length
                  : 0}
                /500
              </CountHint>
              <TextareaS
                name={"description"}
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={4}
                placeholder={"Короткое описание"}
                maxLength={500}
                error={
                  formik.touched.description && !!formik.errors.description
                }
              />
            </TextareaWrapper>
          </Box>

          <Box sx={{ marginBottom: 2.4 }}>
            <p className="auth-title__input">Условия для коммюнити JAS</p>
            <TextareaWrapper>
              <CountHint>
                {formik.values.condition ? formik.values.condition.length : 0}
                /500
              </CountHint>
              <TextareaS
                name={"condition"}
                value={formik.values.condition}
                onChange={formik.handleChange}
                rows={4}
                placeholder={"Условия для коммюнити JAS"}
                maxLength={500}
                error={formik.touched.condition && !!formik.errors.condition}
              />
            </TextareaWrapper>
          </Box>

          <div className="auth-wrapper__input">
            <p className="auth-title__input">
              Стоимость{" "}
              <Box component={"span"} color={"#BDBDBD"}>
                (не обязательно)
              </Box>
            </p>
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{
                  width: "100%",
                  "& fieldset": {
                    borderBottomRightRadius: "0!important",
                    borderTopRightRadius: 0,
                  },
                }}
                name={"priceFrom"}
                value={formik.values.priceFrom}
                onChange={(e) =>
                  formik.setFieldValue(
                    "priceFrom",
                    e.target.value.replace(/\D/gi, "")
                  )
                }
                id="outlined-basic"
                placeholder="От"
                variant="outlined"
                error={formik.touched.priceFrom && !!formik.errors.priceFrom}
                helperText={formik.touched.priceFrom && formik.errors.priceFrom}
                InputProps={{
                  endAdornment: (
                    <svg
                      width="11"
                      height="14"
                      viewBox="0 0 11 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.0222 3.36364V14H4.43697V3.36364H6.0222ZM10.1387 3.36364V4.76989H0.32049V3.36364H10.1387ZM10.1387 0.909091V2.31534H0.32049V0.909091H10.1387Z"
                        fill="#828282"
                      />
                    </svg>
                  ),
                }}
              />
              <TextField
                sx={{
                  width: "100%",
                  "& fieldset": {
                    borderBottomLeftRadius: "0!important",
                    borderTopLeftRadius: 0,
                    borderLeftWidth: 0,
                  },
                  "&:hover fieldset": {
                    border: "1px solid red",
                  },
                }}
                name={"priceTo"}
                value={formik.values.priceTo}
                onChange={(e) =>
                  formik.setFieldValue(
                    "priceTo",
                    e.target.value.replace(/\D/gi, "")
                  )
                }
                id="outlined-basic"
                placeholder="До"
                variant="outlined"
                error={formik.touched.priceTo && !!formik.errors.priceTo}
                helperText={formik.touched.priceTo && formik.errors.priceTo}
                InputProps={{
                  endAdornment: (
                    <svg
                      width="11"
                      height="14"
                      viewBox="0 0 11 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.0222 3.36364V14H4.43697V3.36364H6.0222ZM10.1387 3.36364V4.76989H0.32049V3.36364H10.1387ZM10.1387 0.909091V2.31534H0.32049V0.909091H10.1387Z"
                        fill="#828282"
                      />
                    </svg>
                  ),
                }}
              />
            </Box>
          </div>
        </Content>
      </Wrapper>

      <Box sx={{ margin: "32px 0 86px 0" }}>
        <AuthButton
          active={formik.dirty}
          onClick={() => {
            const firstError = Object.keys(formik.errors || {})[0]
            if (firstError)
              toast.error(`Упс... какое-то поле неправильно заполнено.`, {
                autoClose: 4000,
              })
          }}
          disabled={!formik.dirty}
          type="submit"
        >
          {changeServiceId ? "Сохранить" : "Создать услугу"}
        </AuthButton>
      </Box>
    </form>
  )
}

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
  border: 1.5px solid #e0e0e0;
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

export default CreateService
