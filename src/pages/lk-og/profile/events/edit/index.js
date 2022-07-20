import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import LkLayout from '../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../components/layouts/EventsCreateLayout'
import EventDefaults from '../../../../../components/pages/LkOg/Tabs/Events/EventDefaults'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
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
  const { push: routerPush } = useRouter()
  const { t: tLkOg } = useTranslation('lkOg')
  const [isDraft, setIsDraft] = React.useState(false)

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

  const formik = useFormik({
    initialValues: emptyInitialValues,
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
          `organizer/events/`,
          'post',
        )
        routerPush(
          isDraft ? '/lk-og/profile/events' : `/lk-og/profile/events/edit/${data.id}/location`,
        )
        setIsDraft(false)
      } catch ({ response: { data } }) {
        setIsDraft(false)
        if (data['Wrong date']) {
          toast.error('Указаны неправильные даты!')
        }
      }
    },
  })

  const onDraft = async () => {
    setIsDraft(true)
    formik.submitForm()
  }

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout onDraft={onDraft}>
        <EventDefaults formik={formik} />
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
