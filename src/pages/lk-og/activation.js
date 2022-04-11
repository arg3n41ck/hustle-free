import React, { useEffect, useState } from "react"
import InputPersonalData from "../../components/pages/Registration/InputPersonalData"
import InputSkillsData from "../../components/pages/Registration/inputSkillsData"
import { fetchSkills } from "../../redux/components/skills"
import { fetchTechnologies } from "../../redux/components/technologies"
import { fetchUser } from "../../redux/components/user"
import { fetchStartups } from "../../redux/components/startups"
import { useDispatch } from "react-redux"

const InputData = ({ query }) => {
  const [view, setView] = useState("personal") // personal | skills
  const dispatch = useDispatch()

  const viewHandler = (type) => {
    setView(type)
  }

  useEffect(() => {
    return () => {
      // dispatch(fetchSkills())
      // dispatch(fetchTechnologies())
      dispatch(fetchUser())
      // dispatch(fetchStartups())
    }
  }, [])

  console.log(query)

  return (
    <>
      {(view === "personal" && (
        <InputPersonalData query={query} onView={viewHandler} />
      )) ||
        (view === "skills" && <InputSkillsData />)}
    </>
  )
}

export default InputData

export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  }
}
