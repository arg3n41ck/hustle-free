import React, { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ParticipantCategoriesModal from './Modal'
import $api from '../../../../../../services/axios'
import styled from 'styled-components'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PCFieldName } from './Name'

const getLevelsBySportType = async (sportType) => {
  try {
    const { data } = await $api.get('/directory/discipline_level/')

    return data.filter(({ typeSport }) => sportType === typeSport)
  } catch (e) {
    console.log(e)
  }
}

function Levels({
  open,
  edit,
  submit,
  onClose,
  sportType,
  name,
  onBack,
  defaultValues = initialEmptyValues,
}) {
  const { t: tLkOg } = useTranslation('lkOg')

  const validationSchema = yup.object({
    levels: yup.mixed().test({
      test: (array) => array.some((value) => value),
      message: tLkOg('validation.chooseAtLeastOneLevel'),
    }),
  })
  const [levels, setLevels] = useState(null)
  const [fieldError, setFieldError] = useState(null)
  const [newLevel, setNewLevel] = useState('')
  const { handleSubmit, setFieldValue, touched, errors, values } = useFormik({
    initialValues: {
      levels: defaultValues,
    },
    validationSchema,
    onSubmit: (values) => submit(values),
  })

  useEffect(() => {
    getLevelsBySportType(sportType).then(setLevels)
  }, [sportType, defaultValues])

  const handleOnBlurNewLevel = useCallback(
    async (name) => {
      await $api.post('/directory/discipline_level/', {
        name,
        type_sport: sportType,
      })
      setNewLevel('')
      await getLevelsBySportType(sportType).then(setLevels)
    },
    [levels, open],
  )

  const handleOnDeleteLevel = useCallback(
    async (id) => {
      await $api.delete(`/directory/discipline_level/${id}/`)
      const newLevels = levels.filter((level) => id !== id)
      setFieldValue('levels', newLevels)
      await getLevelsBySportType(sportType).then(setLevels)
    },
    [levels],
  )

  return (
    <ParticipantCategoriesModal
      open={open}
      title={name}
      onClose={onClose}
      onBack={onBack}
      edit={edit}
      onSubmit={handleSubmit}
    >
      <PCFieldName>{tLkOg('categoriesOfParticipants.levelsCategories')}</PCFieldName>
      <FormWrapper>
        <LevelsUl>
          {!!levels?.length &&
            levels.map(({ name, id, isManual }) => {
              return (
                <LevelLi key={`PCCreateLevels_${id}`}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!values?.levels?.length && values.levels.includes(id)}
                        onChange={({ target: { checked } }) =>
                          setFieldValue(
                            'levels',
                            checked
                              ? [...values.levels, id]
                              : values.levels.filter((item) => item !== id),
                          )
                        }
                      />
                    }
                    label={name}
                  />
                  {!isManual && (
                    <LevelClearIcon>
                      <ClearIcon onClick={() => handleOnDeleteLevel(id)} />
                    </LevelClearIcon>
                  )}
                </LevelLi>
              )
            })}

          <LevelLi>
            <div>
              <LevelForm
                onSubmit={(e) => {
                  e.preventDefault()
                  if ((newLevel || '').split(' ').join('')) {
                    return handleOnBlurNewLevel(newLevel).then(() => setNewLevel(''))
                  }
                  setFieldError('Заполните поле!')
                }}
              >
                <AddButton
                  onClick={async () => {
                    if ((newLevel || '').split(' ').join('')) {
                      await handleOnBlurNewLevel(newLevel)
                      setNewLevel('')
                      return
                    }
                    setFieldError('Заполните поле!')
                  }}
                  type='button'
                >
                  {add}
                </AddButton>
                <TextField
                  sx={{
                    '& .MuiInputBase-colorPrimary': {
                      color: '#828282',
                      '&::before': { borderBottomColor: '#828282' },
                    },
                  }}
                  onChange={({ target: { value } }) => {
                    setNewLevel(value)
                    setFieldError(null)
                  }}
                  variant='standard'
                  value={newLevel}
                  placeholder={tLkOg('categoriesOfParticipants.addNewLevel')}
                  fullWidth
                />
              </LevelForm>
              {<Error>{fieldError || (touched.levels && errors.levels)}</Error>}
            </div>
          </LevelLi>
        </LevelsUl>
      </FormWrapper>
    </ParticipantCategoriesModal>
  )
}

export default Levels

const FormWrapper = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`

const LevelsUl = styled.ul``

const LevelClearIcon = styled.div`
  display: none;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  margin: 0 9px 0 -3px;
  svg {
    height: 100%;
    width: 100%;
  }
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

const LevelForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Error = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin: 5px 0 0;
`

const ClearIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18'
      stroke='#F2F2F2'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M6 6L18 18'
      stroke='#F2F2F2'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const add = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z'
      fill='#6D4EEA'
    />
  </svg>
)
