import React, { useEffect } from 'react'
import { Checkbox, Modal, TextField } from '@mui/material'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { EventMatsClient } from '../../../../../../services/apiClients/eventMatsClient'
import { fetchDaysByParams } from '../../../../../../redux/components/daysAndMats'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const eventMatsClient = new EventMatsClient()

function MatModal({ editMat, day, onClose }) {
  const { t: tLkOg } = useTranslation('lkOg')
  const {
    query: { id: eventId },
  } = useRouter()

  const dispatch = useDispatch()

  const formik = useFormik({
    validationSchema: yup.object({
      name: yup.string().required(tLkOg('validation.required')).nullable(),
      prefix: yup.string().required(tLkOg('validation.required')).nullable(),
    }),
    initialValues: {
      name: '',
      prefix: null,
    },
    onSubmit: async (values) => {
      const body = {
        day: day?.id,
        name: values?.name,
        prefix: values?.prefix,
      }
      try {
        if (editMat && day) {
          body.order = editMat?.order
          await eventMatsClient.editMat(editMat?.id, body).then(() => {
            dispatch(fetchDaysByParams({ event: eventId }))
          })
        } else {
          body.order = (day?.mats?.length || 0) + 1
          await eventMatsClient.createMat(body).then(() => {
            dispatch(fetchDaysByParams({ event: eventId }))
          })
        }
        formik.resetForm()
        onClose()
      } catch (error) {
        onClose()
        throw error
      }
    },
  })

  useEffect(() => {
    if (editMat && day) {
      const { id, ...matValues } = editMat
      const initialValues = {
        day: day.id,
        ...matValues,
      }
      formik.setValues(initialValues)
    }
  }, [editMat])

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={!!day || !!editMat}
      onClose={handleClose}
    >
      <Wrapper>
        <Title>Создать мат</Title>
        <Content>
          <Field>
            <p className='auth-title__input'>Название</p>
            <TextField
              name='name'
              fullWidth
              value={formik.values.name}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.name && Boolean(formik.errors.name) && '#d32f2f !important',
                  },
                },
              }}
              placeholder='Название'
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>Префикс</p>
            <TextField
              name='prefix'
              fullWidth
              value={formik.values.prefix}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': {
                    borderColor:
                      formik.touched.prefix &&
                      Boolean(formik.errors.prefix) &&
                      '#d32f2f !important',
                  },
                },
              }}
              placeholder='Префикс'
              onChange={formik.handleChange}
              error={formik.touched.prefix && Boolean(formik.errors.prefix)}
              helperText={formik.touched.prefix && formik.errors.prefix}
            />
          </Field>

          <Field>
            <Checkboxes>
              <ChekboxWrapper>
                <Checkbox />
                <p>Скрыть из расписания</p>
              </ChekboxWrapper>
              <ChekboxWrapper>
                <Checkbox />
                <p>Скрыть из поиска / Поиска матчей</p>
              </ChekboxWrapper>
              <ChekboxWrapper>
                <Checkbox />
                <p>Скрыть из аккаунта атлета</p>
              </ChekboxWrapper>
            </Checkboxes>
          </Field>
        </Content>
        <Footer>
          <Button onClick={handleClose}>{tLkOg('editEvent.back')}</Button>
          <Button type='button' onClick={formik.handleSubmit} className='primary'>
            {tLkOg('editEvent.save')}
          </Button>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default MatModal

const Wrapper = styled.div`
  height: min-content;
  max-width: 688px;
  width: 100%;
  border-radius: 16px;
  background: #1b1c22;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
  margin: 0 5px;
`

const Title = styled.p`
  padding: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  border-bottom: 1px solid #333333;
`

const Content = styled.div`
  padding: 24px;

  display: flex;
  flex-direction: column;
  grid-gap: 16px;
`

const Dates = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 16px;
`

const Footer = styled.div`
  padding: 24px;
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-column-gap: 16px;
  border-top: 1px solid #333333;
`

const Button = styled.button`
  border-radius: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #828282;
  border: 1px solid #333;

  &.primary {
    background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
    color: #ffffff;
  }
`

const Field = styled.div``

const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ChekboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 16px;

  & .MuiCheckbox-root {
    padding: 0 !important;
  }
`
