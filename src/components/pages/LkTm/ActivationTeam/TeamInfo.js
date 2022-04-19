import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import styled from "styled-components"
import { TextField, MenuItem, Checkbox, Box } from "@mui/material"
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import $api from "../../../../services/axios"
import { useDispatch, useSelector } from "react-redux"
import { saveUserItem } from "../../../../redux/components/user"
import { setCookie } from "../../../../services/JWTService"
import { toast } from "react-toastify"
import { styled as styl } from "@mui/material/styles"
import { useRadioGroup } from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import { useRouter } from "next/router"
import { selectCountries } from "../../../../redux/components/countriesAndCities"
import { theme } from "../../../../styles/theme"

const StyledFormControlLabel = styl((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  })
)

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup()

  let checked = false

  if (radioGroup) {
    checked = radioGroup.value === props.value
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

const validationSchema = yup.object({
  sports: yup
    .string()
    .test(
      "sports",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  description: yup
    .string()
    .test(
      "description",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  avatar: yup
    .string()
    .test(
      "avatar",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
})

const TeamInfo = ({ dataPersonal, data, sportTypes }) => {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      sports: !!data?.sports ? data.sports : 1,
      description: !!data?.description ? data.description : "",
      avatar: !!data?.avatar ? data.avatar : "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.sports &&
        !Boolean(formik.errors.sports) &&
        formik.values.description &&
        !Boolean(formik.errors.description) &&
        formik.values.avatar &&
        !Boolean(formik.errors.avatar)
      ) {
        toast.info("Ожидайте ответа от сервера")
        try {
          const data = {
            ...dataPersonal,
            sports: [values.sports],
            description: values.description,
            avatar: values.avatar,
          }

          for (let key in data) {
            if (!data[key]) delete data[key]
          }

          dispatch(
            saveUserItem({ userItem: "password", value: values.password })
          )
          try {
            let formData = new FormData()

            await Object.keys(data).forEach((key) => {
              const value = values[key]
              if (key === "avatar") {
                formData.append(key, value, value.name)
              } else {
                formData.append(key, value)
              }
            })

            const { data: _data } = await $api.post(
              "/accounts/team/",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            setCookie("token", _data.access, 999)
            setCookie("refresh", _data.refresh, 999999)
            toast.success("Вы успешно активировали свои учетные данные!")
            router.push("/login")
          } catch (e) {}
        } catch (e) {}
      }
    },
    validationSchema,
  })

  console.log(formik.errors)

  const uploadImageToClient = (event) => {
    if (event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Вид спорта</p>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ width: "100%", color: "white" }}
          name="sports"
          value={formik.values.sports}
          onChange={formik.handleChange}
          error={formik.touched.sports && Boolean(formik.errors.sports)}
          helperText={formik.touched.sports && formik.errors.sports}
        >
          {!!sportTypes &&
            sportTypes.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </TextField>
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">Описание</p>
        <TextArea
          placeholder="Описание"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </div>

      <h3 className="auth-title">Фотография профиля</h3>
      <Description>
        Фотография показывается, например, рядом с вашими профилем{" "}
      </Description>
      <AvatarWrapper>
        <FileUploadLabel
          htmlFor={"startup-logo"}
          hasAvatar={formik.values.avatar}
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

            {!!formik.values.avatar && (
              <AvatarText>Изменить фотографию</AvatarText>
            )}
          </AvatarInfo>
          {!!formik.values.avatar && (
            <ImageS
              src={
                typeof formik.values.avatar === "string"
                  ? formik.values.avatar
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
                formik.touched.logo && Boolean(formik.errors.logo)
                  ? "#EB5757"
                  : "#828282",
            }}
          >
            Размер файла – не более 4 МБ.
          </Description>
        </div>
      </AvatarWrapper>

      <Line />

      <CheckboxText>Предварительная модерация атлета</CheckboxText>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 10fr",
          alignItems: "start",
          marginBottom: 7,
          marginLeft: -2,
        }}
      >
        <Checkbox
          checked={checked}
          name="moderation"
          onClick={() => setChecked(!checked)}
          sx={{
            color: "#6D4EEA",
            "&.Mui-checked": {
              color: "#6D4EEA",
            },
          }}
        />
        <CheckboxDescriptions>
          <CheckboxDescription>
            Включить опцию предварительной модерации атлета
          </CheckboxDescription>
          <CheckboxDescription2>
            например, когда атлет выбирает команду в профиле, команда одобряет
            атлета как участник выбранной команды
          </CheckboxDescription2>
        </CheckboxDescriptions>
      </Box>

      <AuthButton
        active={
          formik.values.sports &&
          !Boolean(formik.errors.sports) &&
          formik.values.description &&
          !Boolean(formik.errors.description) &&
          formik.values.avatar &&
          !Boolean(formik.errors.avatar) &&
          checked
        }
        type="submit"
      >
        Дальше
      </AuthButton>
    </Form>
  )
}

const Form = styled(motion.form)``

const Error = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`

const CheckboxDescriptions = styled.div`
  margin-top: 7px;
`

const CheckboxText = styled.p`
  color: #f2f2f2;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
`

const CheckboxDescription = styled.p`
  color: #f2f2f2;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const CheckboxDescription2 = styled.p`
  color: #828282;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const Description = styled.p`
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-bottom: 16px;
`

const ImageS = styled.img`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`

const AvatarWrapper = styled.div`
  display: flex;
  ${theme.mqMax("md")} {
    flex-direction: column-reverse;
    align-items: center;
  }
`

const Line = styled.div`
  border: 1px solid #333333;
  opacity: 0.5;
  width: 100%;
  margin: 35px 0;
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

const TextArea = styled.textarea`
  min-height: 327px;
  width: 100%;
  background: none;
  border: 1.5px solid #333333;
  border-radius: 16px;
  padding: 20px;
  font-size: 18px;
  color: #f2f2f2;
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
  border: ${(p) => (p.hasAvatar ? "none" : "2px dashed #6D4EEA")};
  border-radius: 8px;
  width: 100%;
  max-width: 128px;
  height: 128px;
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
  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`

export default TeamInfo
