import React, { useEffect, useState } from 'react'
import LkLayout from '../../../../../../components/layouts/LkLayout'
import { lkOgTabs } from '../../../../../../components/pages/LkOg/Tabs/tabConstants'
import EventsCreateLayout from '../../../../../../components/layouts/EventsCreateLayout'
import EventContacts from '../../../../../../components/pages/LkOg/Tabs/Events/EventContacts'
import { useRouter } from 'next/router'
import { getEventDefaultValues } from './location'
import { useSelector } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const emptyInitialValues = {
  nameOrganization: '',
  firstName: '',
  lastName: '',
  telegram: '',
  instagram: '',
  youtube: '',
  tiktok: '',
  facebook: '',
  linkedin: '',
  twitter: '',
  vk: '',
  email: '',
  webSite: '',
}

function Contacts() {
  const user = useSelector((state) => state.user.user)
  const {
    query: { id: eventId },
  } = useRouter()
  const [contactsId, setContactsId] = useState(null)
  const [eventDefaultValues, setEventDefaultValues] = useState(null)
  useEffect(() => {
    if (eventId) {
      getEventDefaultValues(`/events/contacts/?event=${eventId}`).then((data) => {
        const currentContacts = !!data?.length && data.find(({ event }) => event == eventId)
        if (currentContacts) {
          const { id, event, ...rest } = currentContacts
          setContactsId(id)
          !!data?.length && setEventDefaultValues(rest || emptyInitialValues)
        }
      })
    }
  }, [eventId])

  return (
    <LkLayout tabs={lkOgTabs}>
      <EventsCreateLayout>
        <EventContacts
          defaultValue={{
            ...eventDefaultValues,
            ...user,
            phoneNumber: eventDefaultValues?.phoneNumber || user?.phoneNumber,
          }}
          eventId={eventId}
          contactsId={contactsId}
        />
      </EventsCreateLayout>
    </LkLayout>
  )
}

export default Contacts

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkOg', 'footer'])),
  },
})
