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

const createBracket = async ({ eventId, pcID, bracketType }) => {
  try {
    console.log({ eventId, pcID, bracketType })
    await $api.post('/brackets/brackets/', {
      event: eventId,
      participationCategory: pcID,
      bracketType,
    })
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
      await Promise.all(
        epc.map((id) => createBracket({ eventId, pcID: id, bracketType: brackets })),
      )
      onClose()
      toast.info('Создается сетка!')
    },
  })

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
            <EPFormBrackets formik={formik} />
            <EPFrormFooter onClose={onClose} formik={formik} />
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
