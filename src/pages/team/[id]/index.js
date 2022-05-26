import React, { useCallback, useEffect, useMemo, useState } from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { useRouter } from "next/router"
import { teamProfileTabs } from "../../../components/pages/Team/tabConstants"
import TeamInfo from "../../../components/pages/Team/TeamProfile"
import $api from "../../../services/axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getIsUserInTeam = async (teamId) => {
  const { data } = await $api.get(`/teams/check_athlete_team/${teamId}/`)
  return data
}

function TeamProfile() {
  const {
    query: { id: teamId },
  } = useRouter()
  const [userStatusInTeam, setUserStatusInTeam] = useState(null)
  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  const checkUserStatus = useCallback(() => {
    teamId && getIsUserInTeam(teamId).then(setUserStatusInTeam)
  }, [teamId])

  useEffect(() => {
    checkUserStatus()
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <TeamInfo
        teamId={teamId}
        userStatusInTeam={userStatusInTeam}
        checkUserStatus={checkUserStatus}
      />
    </LkLayout>
  )
}

export default TeamProfile

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}
