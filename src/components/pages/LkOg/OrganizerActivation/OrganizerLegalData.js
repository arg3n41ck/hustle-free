import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import styled from "styled-components"
import { TextField, MenuItem, Autocomplete } from "@mui/material"
import { motion } from "framer-motion"
import { AuthButton } from "../../Authorization/Authorization"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"
import { LocationIcon } from "../../Events/EventsCatalog/EventsFilter"

const validationSchema = yup.object({
  nameOrganizer: yup
    .string()
    .test(
      "nameOrganizer",
      "Заполните поле",
      (value) => !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  country: yup
    .string()
    .test(
      "country",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
  city: yup
    .string()
    .test(
      "city",
      "Заполните поле",
      (value) => value !== "default" && !!(value || "").replace(/\s/g, "")
    )
    .required("Заполните поле"),
})

const OrganizerLegalData = ({ dataPersonal, onSubmit, data }) => {
  const [countries, cities] = useSelector(selectCountriesAndCities)
  const formik = useFormik({
    initialValues: {
      nameOrganizer: !!data?.name_organization ? data.name_organization : "",
      country: !!data?.country ? data.country : null,
      city: !!data?.city ? data.city : null,
      actualAddress: !!data?.actual_address ? data.actual_address : "",
      legalName: !!data?.legal_name ? data.legal_name : "",
      legalAddress: !!data?.legal_address ? data.legal_address : "",
      bin: !!data?.bin ? data.bin : "",
      number: !!data?.number ? data.number : "",
      swift: !!data?.swift ? data.swift : "",
      bankName: !!data?.bank_name ? data.bank_name : "",
    },
    onSubmit: async (values) => {
      if (
        formik.values.nameOrganizer &&
        !Boolean(formik.errors.nameOrganizer) &&
        formik.values.country &&
        !Boolean(formik.errors.country) &&
        formik.values.city &&
        !Boolean(formik.errors.city)
      ) {
        toast.info("Ожидайте ответа от сервера")
        const data = {
          ...dataPersonal,
          name_organization: values.nameOrganizer,
          country: values.country,
          city: values.city,
          address: values.actualAddress,
          legal_name: values.legalName,
          legal_address: values.legalAddress,
          bin: values.bin,
          number: values.number,
          swift: values.swift,
          bank_name: values.bankName,
        }
        if (data.phone_number === "+") delete data.phone_number

        for (let key in data) {
          if (!data[key]) delete data[key]
        }

        await onSubmit({ ...data, ...dataPersonal })
      }
    },
    validationSchema,
  })


  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="auth-wrapper__input">
        <p className="auth-title__input">Название организации</p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.nameOrganizer}
          name="nameOrganizer"
          onChange={formik.handleChange}
          placeholder="Название организации"
          variant="outlined"
          error={
            formik.touched.nameOrganizer && Boolean(formik.errors.nameOrganizer)
          }
          helperText={
            formik.touched.nameOrganizer && formik.errors.nameOrganizer
          }
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">Страна</p>
        <Autocomplete
          noOptionsText={"Ничего не найдено"}
          onChange={(_, value) => [
            formik.setFieldValue("country", value?.id || null),
            formik.setFieldValue("city", ""),
          ]}
          options={countries.map((option) => option) || []}
          getOptionLabel={(option) => option.name}
          value={
            countries.find(({ id }) => id === formik.values?.country) || null
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
          onChange={(_, value) =>
            formik.setFieldValue("city", value?.id || null)
          }
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

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Фактический адрес{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.actualAddress}
          name="actualAddress"
          onChange={formik.handleChange}
          placeholder="Фактические адрес"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Юридическое название{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.legalName}
          name="legalName"
          onChange={formik.handleChange}
          placeholder="Юридическое название"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Юридический адрес{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%", marginBottom: 3 }}
          value={formik.values.legalAddress}
          name="legalAddress"
          onChange={formik.handleChange}
          placeholder="Юридический адрес"
          variant="outlined"
        />
      </div>

      <h3 className="auth-title">Реквизиты</h3>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          БИН <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.bin}
          name="bin"
          onChange={formik.handleChange}
          placeholder="БИН"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Номер счета (IBAN){" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.number}
          name="number"
          onChange={formik.handleChange}
          placeholder="Номер счета"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          SWIFT <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%" }}
          value={formik.values.swift}
          name="swift"
          onChange={formik.handleChange}
          placeholder="SWIFT"
          variant="outlined"
        />
      </div>

      <div className="auth-wrapper__input">
        <p className="auth-title__input">
          Название банка{" "}
          <span style={{ color: "#828282" }}>(не обязательно)</span>
        </p>
        <TextField
          sx={{ width: "100%", marginBottom: 5 }}
          value={formik.values.bankName}
          name="bankName"
          onChange={formik.handleChange}
          placeholder="Название банка"
          variant="outlined"
        />
      </div>

      <AuthButton
        active={
          formik.values.nameOrganizer &&
          !Boolean(formik.errors.nameOrganizer) &&
          formik.values.country &&
          !Boolean(formik.errors.country) &&
          formik.values.city &&
          !Boolean(formik.errors.city)
        }
        type="submit"
      >
        Дальше
      </AuthButton>
    </Form>
  )
}

const Form = styled(motion.form)``

export default OrganizerLegalData
