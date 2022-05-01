import React, { useCallback, useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import ParticipantCategoriesModal from "./Modal"
import { Form } from "../EventDefaults"
import $api from "../../../../../../services/axios"
import styled from "styled-components"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"

const getLevelsBySportType = async (sportType) => {
  try {
    const { data } = await $api.get("/directory/discipline_level/")

    return data.filter(({ typeSport }) => sportType === typeSport)
  } catch (e) {
    console.log(e)
  }
}

const initialEmptyValues = {
  levels: [],
}

const validationSchema = yup.object({
  levels: yup.mixed().test({
    test: (array) => array.some((value) => value),
    message: "Выберите хотя бы один уровень!",
  }),
})

function Levels({
  open,
  edit,
  submit,
  onClose,
  sportType,
  defaultValues = initialEmptyValues,
}) {
  const [levels, setLevels] = useState(null)
  const [selectedLevels, setSelectedLevels] = useState(
    defaultValues?.levels || []
  )
  const { handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values)
    },
  })

  useEffect(() => {
    getLevelsBySportType(sportType).then(setLevels)
  }, [sportType])

  const onSelectLevel = useCallback(
    (checked, id) => {
      let ids = selectedLevels
      if (checked) {
        ids.push(id)
      } else ids = ids.filter((_id) => _id !== id)
      setSelectedLevels(ids)
      setFieldValue("levels", ids)
    },
    [selectedLevels, levels]
  )

  const handleOnBlurNewLevel = useCallback(
    async (name) => {
      await $api.post("/directory/discipline_level/", {
        name,
        type_sport: sportType,
      })
      await getLevelsBySportType(sportType).then(setLevels)
    },
    [levels]
  )

  const handleOnDeleteLevel = useCallback(
    async (id) => {
      await $api.delete(`/directory/discipline_level/${id}/`)
      setSelectedLevels((s) => s.filter((_id) => _id !== id))
      await getLevelsBySportType(sportType).then(setLevels)
    },
    [levels]
  )

  return (
    <ParticipantCategoriesModal
      open={open}
      title="Уровни категории"
      onClose={onClose}
      edit={edit}
      onSubmit={handleSubmit}
    >
      <Form>
        <LevelsUl>
          {!!levels?.length &&
            levels.map(({ name, id }) => {
              return (
                <LevelLi key={`PCCreateLevels_${id}`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedLevels.includes(id)}
                        onChange={(e) => onSelectLevel(e.target.checked, id)}
                      />
                    }
                    label={name}
                  />
                  <LevelClearIcon>
                    <ClearIcon onClick={() => handleOnDeleteLevel(id)} />
                  </LevelClearIcon>
                </LevelLi>
              )
            })}

          <LevelLi style={{ padding: "0 0 0 33px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-colorPrimary": {
                  color: "#828282",
                  "&::before": { borderBottomColor: "#828282" },
                },
              }}
              onBlur={({ target: { value } }) =>
                value && handleOnBlurNewLevel(value)
              }
              variant="standard"
              placeholder="Добавить новый уровень"
              error={touched.levels && Boolean(errors.levels)}
              helperText={touched.levels && errors.levels}
              fullWidth
            />
          </LevelLi>
        </LevelsUl>
      </Form>
    </ParticipantCategoriesModal>
  )
}

export default Levels

const LevelsUl = styled.ul``

const LevelClearIcon = styled.div`
  display: none;
`

const LevelLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    ${LevelClearIcon} {
      display: block;
    }
  }
`

const ClearIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
