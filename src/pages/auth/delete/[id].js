import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as yup from "yup"
import $api from "../../../services/axios"
import { useDispatch } from "react-redux"
import { exitUser } from "../../../redux/components/user"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Delete = () => {
  const {
    push: routerPush,
    query: { id: userId },
  } = useRouter()
  const dispatch = useDispatch()
  const { handleSubmit, isValid } = useFormik({
    initialValues: {
      // currentPassword: "",
    },
    validationSchema: yup.object({
      // currentPassword: yup.string().required("Обязательное поле!"),
    }),
    onSubmit: async () => {
      try {
        await $api.delete(`/accounts/delete/${userId}/`)
        dispatch(exitUser())
        toast.success(`Вы успешно удалили свой профиль!`)
        await routerPush("/")
      } catch ({ response }) {
        console.log(response)
        toast.error("Что-то пошло не так")
      }
    },
  })

  return (
    <Form
      animate={{ translateX: ["20%", "0%"] }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <div className="auth-container">
        <div className="auth-wrapper">
          <h3 className="auth-title">Удаление профиля</h3>
          <p className="auth-description">
            Вы действительно хотите безвозвратно удалить свой профиль?
          </p>
          {/*<p className="auth-title__input">Пароль</p>*/}
          {/*<TextField*/}
          {/*  type={showPassword ? "text" : "password"}*/}
          {/*  fullWidth*/}
          {/*  value={values.currentPassword}*/}
          {/*  name="currentPassword"*/}
          {/*  onChange={handleChange}*/}
          {/*  placeholder="Введите пароль"*/}
          {/*  variant="outlined"*/}
          {/*  error={touched.currentPassword && Boolean(errors.currentPassword)}*/}
          {/*  helperText={touched.currentPassword && errors.currentPassword}*/}
          {/*  InputProps={{*/}
          {/*    endAdornment: (*/}
          {/*      <InputAdornment position="end">*/}
          {/*        <IconButton*/}
          {/*          aria-label="toggle password visibility"*/}
          {/*          onClick={() => setShowPassword((prev) => !prev)}*/}
          {/*          onMouseDown={(e) => e.preventDefault()}*/}
          {/*          edge="end"*/}
          {/*        >*/}
          {/*          {showPassword ? show : hide}*/}
          {/*        </IconButton>*/}
          {/*      </InputAdornment>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}
          <Buttons>
            <AuthButton
              onClick={async () => await routerPush("/")}
              type="button"
              styleType="primary"
            >
              Отмена
            </AuthButton>
            <AuthButton
              disabled={!isValid}
              styleType={isValid ? "error" : ""}
              type="submit"
            >
              Подтвердить
            </AuthButton>
          </Buttons>
        </div>
      </div>
    </Form>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "auth"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

const Form = styled(motion.form)`
  min-height: 87vh;
`
export const AuthButton = styled.button`
  width: 100%;
  background: ${({ styleType }) =>
    styleType === "primary"
      ? "linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)"
      : styleType === "error"
      ? "#EB5757"
      : "#F2F2F2"};
  border-radius: 12px;
  height: 64px;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ styleType }) => (!styleType ? "#d8d8d8" : "#fff")};
`

const Buttons = styled.div`
  display: flex;
  grid-gap: 32px;
  margin-top: 32px;
`

export default Delete
