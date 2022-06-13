import React from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventCategories from "../../../components/pages/Event/Categories/EventCategories"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Categories({ event }) {
  return (
    <EdMainLayout event={event}>
      <EventCategories />
    </EdMainLayout>
  )
}

export default Categories

export async function getServerSideProps(context) {
  const { query, locale } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: {
      event: data,
      ...(await serverSideTranslations(locale, [
        "header",
        "common",
        "eventDetail",
        "lkTm",
        "lkOg",
        "footer",
      ])),
    }, // will be passed to the page component as props
  }
}
