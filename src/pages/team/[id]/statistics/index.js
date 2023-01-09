import React, { useEffect } from 'react'
import Statistics from '../../../../components/pages/PublicTeam/Statistics'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PublicTeamWrapper from '../../../../components/pages/PublicTeam/general/PublicTeamWrapper'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { fetchTeam } from '../../../../redux/components/teams'

function StatisticsPage() {
  const {
    query: { id: teamId },
  } = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (teamId) {
      dispatch(fetchTeam({ teamId }))
    }
  }, [teamId])

  return (
    <PublicTeamWrapper>
      <Statistics />
    </PublicTeamWrapper>
  )
}

export default StatisticsPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkTm', 'footer'])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}
