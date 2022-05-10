import React, { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box, Checkbox, TextField } from "@mui/material"
import { motion } from "framer-motion"
import styled from "styled-components"
import {
  AuthButton,
  Form,
} from "../../components/pages/Authorization/Authorization"
import AuthInfo from "../../components/ui/modals/AuthInfo"
import Link from "next/link"
import $api from "../../services/axios"
import { localStorageGetItem } from "../../helpers/helpers"
import { useRouter } from "next/router"

const variants = {
  open: { opacity: 1, transaction: 5 },
  closed: { opacity: 0, transaction: 5 },
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите поле почты корректно")
    .required("Заполните поле почты"),
})

const Index = () => {
  const [agreement, setAgreement] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toggleInfoModal, setToggleInfoModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const role = localStorageGetItem("role")
  const { push: routerPush } = useRouter()

  useEffect(() => {
    if (!role) {
      routerPush && routerPush("/#user-roles")
    }
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      role,
    },
    onSubmit: async (values) => {
      setLoading(true)
      if (agreement && formik.values.email && !Boolean(formik.errors.email)) {
        try {
          await $api
            .post("/accounts/auth/users/", { ...values })
            .then(() => setToggleInfoModal(true))
        } catch (e) {
          setErrorMessage(
            "Пользователь с таким адресом электронной почты уже существует."
          )
        }
        setLoading(false)
      }
    },
    validationSchema,
  })

  useEffect(() => {
    setErrorMessage(null)
  }, [formik.values.email])

  return (
    <>
      <Form
        animate={{ translateX: ["20%", "0%"] }}
        transition={{ duration: 0.5 }}
        onSubmit={formik.handleSubmit}
      >
        <div className="auth-container">
          <ModalWrapperAnimate
            animate={toggleInfoModal ? "open" : "closed"}
            variants={variants}
          >
            {toggleInfoModal && (
              <AuthInfo
                title="Отлично"
                text={`на ваш электронный адрес ${formik.values.email} отправлено сообщение со ссылкой для подтверждения!`}
                toggleShow={setToggleInfoModal}
              />
            )}
          </ModalWrapperAnimate>
          <div className="auth-wrapper">
            <div className="auth-title">Регистрация</div>
            <p className="auth-description">
              Создайте аккаунт, чтобы пользоваться сервисами и было проще.
            </p>
            <div className="auth-wrapper__input">
              <p className="auth-title__input">Электронный адрес</p>
              <TextField
                sx={{ width: "100%" }}
                name="email"
                onChange={formik.handleChange}
                placeholder="Электронный адрес"
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  endAdornment: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="6"
                        width="16"
                        height="12"
                        rx="2"
                        stroke="#828282"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
                        stroke="#828282"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ),
                }}
              />
            </div>
            {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <AuthButton
              active={
                formik.values.email &&
                !Boolean(formik.errors.email) &&
                agreement &&
                !errorMessage
              }
              disabled={
                !formik.values.email ||
                Boolean(formik.errors.email) ||
                !agreement ||
                loading ||
                errorMessage
              }
              type="submit"
            >
              Отправить
            </AuthButton>
            <Box sx={{ display: "flex", marginTop: 2.4 }}>
              <Checkbox
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                sx={{
                  paddingTop: 1.6,
                  color: "#27AE60",
                  borderRadius: 2,
                  width: 16,
                  height: 16,
                  marginRight: 2,
                  "&.Mui-checked": {
                    color: "primary",
                  },
                }}
              />
              <Box
                component="p"
                sx={{ color: "#828282 !important" }}
                className="auth-additionally__text"
              >
                Регистрируясь, вы подтверждаете, что принимаете наши{" "}
                <a href="" className="auth-link">
                  Условия использования
                </a>{" "}
                и{" "}
                <a
                  href="/docs/privacy_policy.pdf"
                  className="auth-link"
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  Политику конфиденциальности.
                </a>
              </Box>
            </Box>
            <Box
              sx={{ textAlign: "center", marginTop: 3 }}
              className="auth-additionally__text"
              component="p"
            >
              Уже есть аккаунт?{" "}
              <Link href="/login" passHref>
                <a className="auth-link">Войти</a>
              </Link>
            </Box>
          </div>
        </div>
      </Form>
    </>
  )
}

const ErrorMessage = styled.p`
  color: #eb5757;
  text-align: center;
  padding-bottom: 16px;
`
const ModalWrapperAnimate = styled(motion.div)`
  width: 100%;
  margin-top: 60vh;
  max-width: 592px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
`

export default Index
