import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
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
import {
  fetchBracketsByParams,
  fetchBracketsFightsByParams,
  fetchParticipantAthletes,
  setSelectedBracket,
} from '../../../../../redux/components/eventBrackets'
import EPFormDaysAndMats from './EPFormDaysAndMats'
import EPFormOtherConfigs from './EPFormOtherConfigs'
import { format } from 'date-fns'

const createBracket = async (body) => {
  try {
    const { data } = await $api.post('/brackets/brackets/', body)
    return data
  } catch (e) {
    console.log(e)
    toast.error(`Something went wrong!!!`)
  }
}

function EPForm({ onClose, open, selectedEPCDetailed, selectedEPC: selectedEPCIDS }) {
  const { t: tCommon } = useTranslation('common')
  const {
    query: { id: eventId },
    push: routerPush,
    pathname,
  } = useRouter()
  const [bracketError, setBracketError] = useState(null)
  const dispatch = useDispatch()
  const { current: validationSchema } = useRef(
    yup.object({
      epc: yup.array().test({
        message: tCommon('validation.required'),
        test: (value) => !!value?.length,
      }),
      brackets: yup.string().required(tCommon('validation.required')).nullable(),
      day: yup.string().required(tCommon('validation.required')).nullable(),
      mat: yup.string().required(tCommon('validation.required')).nullable(),
      roundsAmount: yup.number().required(tCommon('validation.required')).nullable(),
      roundTime: yup
        .string()
        .test({
          message: 'Время одного раунда не может длиться больше часа!',
          test: (value) => !isNaN(new Date(value)),
        })
        .nullable()
        .required(tCommon('validation.required')),
      estimateRoundTime: yup
        .string()
        .test({
          message: 'Расчетное время на раунд не может длиться больше часа!',
          test: (value) => !isNaN(new Date(value)),
        })
        .nullable()
        .required(tCommon('validation.required')),
    }),
  )

  useEffect(() => {
    onClose()
  }, [pathname])

  const formik = useFormik({
    initialValues: {
      epc: selectedEPCIDS,
      brackets: null,
      day: null,
      mat: null,
      roundsAmount: 1,
      roundTime: null,
      estimateRoundTime: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const { epc, brackets } = values
      const reqBody = {
        event: eventId,
        bracketType: brackets,
        eventDay: values?.day,
        mat: values?.mat,
        roundsAmount: +values?.roundsAmount,
        roundTime: format(new Date(values?.roundTime), 'HH:mm:ss'),
        estimateRoundTime: format(new Date(values?.estimateRoundTime), 'HH:mm:ss'),
      }

      if (!!values?.qualifyLoserBracketType) {
        reqBody.qualifyLoserBracketType = values.qualifyLoserBracketType
      }

      await Promise.all(
        epc.map((id) => createBracket({ ...reqBody, participationCategory: id })),
      ).then((responses) => {
        dispatch(setSelectedBracket(null))
        const bracket = responses[(responses?.length || 1) - 1]
        if (bracket) {
          const title =
            selectedEPCDetailed.find(({ id }) => id == bracket?.participationCategory)?.title || ''
          dispatch(
            setSelectedBracket({
              ...bracket,
              title,
            }),
          )
          dispatch(fetchBracketsFightsByParams({ bracket: bracket?.id, type: brackets }))
          dispatch(
            fetchParticipantAthletes({
              participation_category: bracket?.participationCategory,
            }),
          )
        }
      })

      dispatch(fetchBracketsByParams({ event: eventId }))
      routerPush(`/events/${eventId}/brackets/?day=${values?.day}`)
      onClose()
    },
    enableReinitialize: true,
  })

  const onBracketError = ({ text }) => {
    setBracketError(text)
  }

  useEffect(() => {
    formik.validateForm()
  }, [formik.values])

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
            <EPFormDaysAndMats formik={formik} />
            <EPFormBrackets
              bracketError={bracketError}
              onBracketError={onBracketError}
              formik={formik}
              selectedEPCDetailed={selectedEPCDetailed}
            />
            <EPFormOtherConfigs formik={formik} />
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
