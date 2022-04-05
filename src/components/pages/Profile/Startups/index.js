import React, { useEffect, useState } from "react"
import $api from "../../../../services/axios"
import { useSelector } from "react-redux"
import EmptyStartups from "./EmptyStartups"
import MyStartups from "./MyStartups"

const Startups = ({ startups }) => {
  return (
    <>
      {startups.length ? (
        <MyStartups startups={startups} />
      ) : (
        <EmptyStartups />
      )}
    </>
  )
}

export default Startups
