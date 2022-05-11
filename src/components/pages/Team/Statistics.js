import React from "react"
import { useRouter } from "next/router"
import Events from "../LkTm/Tabs/Statistics/Events"
import Awards from "../LkTm/Tabs/Statistics/Awards"
import HeaderContent, { TitleHeader } from "../../ui/LKui/HeaderContent"

const Statistics = ({ onToggleSidebar }) => {
  const {
    query: { id: teamId },
  } = useRouter()

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>Статистика</TitleHeader>
      </HeaderContent>
      {teamId && <Awards teamId={teamId} />}
      {teamId && <Events teamId={teamId} isPublic/>}
    </>
  )
}

export default Statistics
