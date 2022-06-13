import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { TextField } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { theme } from "../../../../styles/theme"
import { toast } from "react-toastify"
import $api from "../../../../services/axios"
import AuthInfo from "../../../../components/ui/modals/AuthInfo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const variants = {
  open: { opacity: 1, transaction: 5 },
  closed: { opacity: 0, transaction: 5 },
}

function Reset() {
  const [toggleInfoModal, setToggleInfoModal] = useState(false)
  const { values, errors, touched, handleSubmit, isValid, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        // language: typeof window !== "undefined" ? window.localStorage.getItem("locale") : "ru"
      },
      validationSchema: yup.object({
        email: yup.string().required("Обязательное поле!"),
      }),
      onSubmit: async (values) => {
        try {
          await $api.post(`/accounts/auth/users/reset_password/`, values)
          setToggleInfoModal(true)
        } catch (e) {
          toast.error("Что-то пошло не так")
        }
      },
    })
  return (
    <div className="auth-container">
      <ModalWrapperAnimate
        animate={toggleInfoModal ? "open" : "closed"}
        variants={variants}
      >
        {toggleInfoModal && (
          <AuthInfo
            title="Отлично"
            text={`Отлично на ваш электронный адрес ${values.email} отправлено сообщение со ссылкой для восстановления пароля!`}
            toggleShow={setToggleInfoModal}
          />
        )}
      </ModalWrapperAnimate>
      <div className="auth-wrapper">
        <h3 className="auth-title">Восстановление пароля</h3>
        <p className="auth-description">
          Заполните поле, чтобы восстановить пароль.
        </p>
        <Form onSubmit={handleSubmit}>
          <div className="auth-wrapper__input">
            <p className="auth-title__input">Электронная почта</p>
            <TextField
              sx={{ width: "100%" }}
              value={values.email}
              name="email"
              onChange={handleChange}
              placeholder="Введите ваш email"
              variant="outlined"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </div>
          <AuthButton disabled={!isValid} active={isValid} type="submit">
            Отправить
          </AuthButton>
        </Form>
      </div>
    </div>
  )
}

export default Reset

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "header",
      "common",
      "auth",
      "footer",
    ])),
  },
})

const Form = styled(motion.form)``

export const AuthButton = styled.button`
  width: 100%;
  background: ${({ active }) => {
    return active
      ? "linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)"
      : "#F2F2F2"
  }};
  border-radius: 12px;
  height: 64px;

  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #${(p) => (p.active ? "fff" : "828282")};
  ${theme.mqMax("lg")} {
    margin-bottom: 20px;
  }
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
