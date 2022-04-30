import React, { useState } from "react"
import EdMainLayout from "../../../components/pages/Event/EDMainLayout"
import $api from "../../../services/axios"
import DropdownData from "../../../components/ui/DropdownData"

function Participants({ event }) {
  const [test, setTest] = useState(false)
  return (
    <EdMainLayout event={event}>
      <DropdownData
        active={test}
        setActive={setTest}
        title={"Сеньор мужчины / Белый / 25-35 лет / 60 кг - 75 кг"}
      >
        <h1>data</h1>
      </DropdownData>
      participants
    </EdMainLayout>
  )
}

export default Participants

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/events/events/${query.id}/`)
  return {
    props: { event: data }, // will be passed to the page component as props
  }
}
