import React from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import EventCategories from "../../../components/pages/Event/Categories/EventCategories"

function Categories({ event }) {
  return <EdMainLayout event={event}>
    <EventCategories/>
  </EdMainLayout>
}

export default Categories

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: { event: data }, // will be passed to the page component as props
  }
}
