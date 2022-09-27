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

function EPForm({ onClose, open, selectedEPCDetailed, selectedEPC: selectedEPCIDS }) {
  const [selectedBracket, setSelectedBracket] = useState(null)
  const { t: tCommon } = useTranslation('common')

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
    onSubmit: () => {},
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

const Content = styled.div`
  height: 120vh;
  width: 100%;
  border-radius: 16px;
  background: #141519;
`
