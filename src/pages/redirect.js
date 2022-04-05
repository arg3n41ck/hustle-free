import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import styled from "styled-components"
import {
  changeStartUp,
  changeTeamMembers,
} from "../redux/components/navigations"

export async function getServerSideProps(context) {
  return {
    props: {
      type: context.query.type || null,
      startup: context.query.startup || null,
    },
  }
}

const Redirect = ({ type, startup }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const redirectsList = [
    {
      type: "user_access",
      change: async () => {
        dispatch(changeStartUp("staff"))
        dispatch(changeTeamMembers("apply"))
        await router.push(`/profile/startups/${startup}/`)
      },
    },
    {
      type: "user_kick",
      change: async () => {
        dispatch(changeStartUp("staff"))
        dispatch(changeTeamMembers("apply"))
        await router.push(`/profile/startups/${startup}/`)
      },
    },
    {
      type: "startup_member_added",
      change: async () => {
        dispatch(changeStartUp("staff"))
        dispatch(changeTeamMembers("all"))
        await router.push(`/profile/startups/${startup}/`)
      },
    },
    {
      type: "startup_activity_lack",
      change: async () => {
        dispatch(changeStartUp(""))
        await router.push(`/profile/startups/${startup}/#active`)
      },
    },
    {
      type: "user_promoted",
      change: async () => {
        dispatch(changeStartUp("staff"))
        dispatch(changeTeamMembers("A"))
        await router.push(`/profile/startups/${startup}/`)
      },
    },
  ]

  useEffect(async () => {
    const redirectObj = redirectsList.find((redirect) => redirect.type === type)

    if (redirectObj) {
      await redirectObj.change()
    }
  }, [])

  return (
    <Wrapper>
      <div>
        <CircularProgress size={50} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  height: 80vh;
  width: calc(100vw - 80px);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Redirect
