import React from "react"
import HeaderContent, { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import Events from "./Events"
import Awards from "./Awards"
import { useSelector } from "react-redux"

const Statistics = ({ onToggleSidebar }) => {
  const user = useSelector((state) => state.user.user)

  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>Статистика</TitleHeader>
      </HeaderContent>
      {user && <Awards teamId={user.teamId} />}
      {user && <Events teamId={user.teamId} />}
    </>
  )
}

export default Statistics
