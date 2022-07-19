import React, { useEffect, useState, useRef } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventDefaults from '../../../../../../components/pages/LkOg/Tabs/Events/EventDefaults'
import { useRouter } from 'next/router'
import { getEventDefaultValues } from './location'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { formDataHttp } from '../../../../../../helpers/formDataHttp'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

const emptyInitialValues = {
  name: '',
  typeSport: null,
  dateStart: null,
  dateEnd: null,
  timezone: null,
  statusPublish: 'draft',
}

function Index() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [eventDefaultValues, setEventDefaultValues] = useState(null)

  const { push: routerPush } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')

  const { current: validationSchema } = useRef(
    yup.object({
      name: yup.string().required(tLkOg('validation.required')).nullable(),
      typeSport: yup.number().required(tLkOg('validation.required')).nullable(),
      dateStart: yup
        .date()
        .nullable()
        .required(tLkOg('validation.fillInTheField'))
        .test({
          message: tLkOg('validation.eventStartDate'),
          test: function (value) {
            return (
              this.parent.dateEnd &&
              new Date(this.parent.dateEnd).getTime() > new Date(value).getTime()
            )
          },
        })
        .test({
          message: tLkOg('validation.validDate'),
          test: function (value) {
            return new Date().getTime() < new Date(value).getTime()
          },
        }),
      dateEnd: yup.date().nullable().required(tLkOg('validation.fillInTheField')),
      timezone: yup.string().required(tLkOg('validation.required')).nullable(),
      // ?? Event Format Validation
      // formatEvent: yup.string().required(tLkOg('validation.required')).nullable(),
    }),
  )

  useEffect(() => {
    eventId &&
      getEventDefaultValues(`/organizer/events/${eventId}/`).then((data) => {
        setEventDefaultValues(data)
      })
  }, [eventId])

  const formik = useFormik({
    initialValues: eventDefaultValues || emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await formDataHttp(
          {
            ...values,
            allFieldsFilled: true,
            dateStart: new Date(values.dateStart).toISOString(),
            dateEnd: new Date(values.dateEnd).toISOString(),
          },
          `organizer/events/${eventId}/`,
          'post',
        )
        routerPush(`/lk-og/profile/events/edit/${data.id}/location`)
      } catch ({ response: { data } }) {
        if (data['Wrong date']) {
          toast.error('Указаны неправильные даты!')
        }
      }
    },
  })

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        {eventDefaultValues && <EventDefaults formik={formik} />}
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Index

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkOg', 'footer'])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}
