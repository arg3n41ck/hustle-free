import React, { useMemo } from "react"
import LkLayout from "../../../../components/layouts/LkLayout"
import { teamProfileTabs } from "../../../../components/pages/Team/tabConstants"
import { useRouter } from "next/router"
import Statistics from "../../../../components/pages/Team/Statistics"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function StatisticsPage() {
  const {
    query: { id: teamId },
  } = useRouter()
  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <Statistics />
    </LkLayout>
  )
}

export default StatisticsPage

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "lkTm", "footer"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}
