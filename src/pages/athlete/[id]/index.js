import React from "react"
import $api from "../../../services/axios"
import PublicAthlete from "../../../components/pages/PublicAthlete/PublicAthlete"

function Athlete({ athlete }) {
  return <PublicAthlete athleteData={athlete} />
}

export default Athlete

export async function getServerSideProps(context) {
  const { query } = context
  const { data } = await $api.get(`/athlete/public-profile/${query.id}/`)
  return {
    props: {
      athlete: data || null,
    },
  }
}
