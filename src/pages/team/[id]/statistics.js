import React, { useMemo } from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { useRouter } from "next/router"
import { teamProfileTabs } from "../../../components/pages/Team/tabConstants"
import LkDefaultHeader from "../../../components/ui/LKui/LKDefaultHeader"
import { HeaderWrapper } from "../../../components/pages/LkOg/Tabs/Events/Events/Events"
import { TitleHeader } from "../../../components/ui/LKui/HeaderContent"

function Statistics({ onToggleSidebar }) {
  const {
    query: { id: teamId },
  } = useRouter()

  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Статистика</TitleHeader>
        </HeaderWrapper>
      </LkDefaultHeader>
    </LkLayout>
  )
}

export default Statistics
