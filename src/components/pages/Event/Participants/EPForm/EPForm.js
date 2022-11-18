import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import EPFormBrackets from './EPFormBrackets'
import EPFormHeader from './EPFormHeader'
import EPFormPCField from './EPFormPCField'
import EPFrormFooter from './EPFrormFooter'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'
import $api from '../../../../../services/axios'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchBracketsByParams } from '../../../../../redux/components/eventBrackets'

const createBracket = async (body) => {
  try {
    await $api.post('/brackets/brackets/', body)
  } catch (e) {
    console.log(e)
    toast.error('Походу что-то пошло не так!')
  }
}

function EPForm({ onClose, open, selectedEPCDetailed, selectedEPC: selectedEPCIDS }) {
  const { t: tCommon } = useTranslation('common')
  const {
    query: { id: eventId },
  } = useRouter()
  const [bracketError, setBracketError] = useState(null)
  const dispatch = useDispatch()
  const { current: validationSchema } = useRef(
    yup.object({
      epc: yup.array().test({
        message: tCommon('validation.required'),
        test: (value) => !!value?.length,
      }),
      brackets: yup.mixed().required(tCommon('validation.required')),
    }),
  )

  const formik = useFormik({
    initialValues: {
      epc: selectedEPCIDS,
      brackets: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const { epc, brackets } = values
      const reqBody = {
        event: eventId,
        bracketType: brackets,
      }
      if (!!values?.qualifyLoserBracketType) {
        reqBody.qualifyLoserBracketType = values.qualifyLoserBracketType
      }
      await Promise.all(epc.map((id) => createBracket({ ...reqBody, participationCategory: id })))

      dispatch(fetchBracketsByParams({ event: eventId }))
      onClose()
      toast.info('Создается сетка!')
    },
  })

  const onBracketError = ({ text }) => {
    setBracketError(text)
  }

  return (
    <AnimatePresence>
      {open && (
        <FormWrapper
          initial={{ right: `-100vw` }}
          animate={{
            right: 0,
            transition: { delay: 0.1, duration: 0.2 },
          }}
          exit={{ right: `-100vw`, transition: { delay: 0.15, duration: 0.2 } }}
        >
          <ContentWrapper>
            <EPFormHeader onClose={onClose} formik={formik} />
            <EPFormPCField selectedEPCDetailed={selectedEPCDetailed} formik={formik} />
            <EPFormBrackets
              bracketError={bracketError}
              onBracketError={onBracketError}
              formik={formik}
              selectedEPCDetailed={selectedEPCDetailed}
            />
            <EPFrormFooter onClose={onClose} formik={formik} customError={!!bracketError} />
          </ContentWrapper>
        </FormWrapper>
      )}
    </AnimatePresence>
  )
}

export default EPForm

const FormWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;

  overflow-y: auto;
  overflow-x: hidden;
  background: #0f0f10;

  z-index: 12;
`

const ContentWrapper = styled.div`
  max-width: 1489px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px 16px 40px;
  margin: 0 auto;
`
