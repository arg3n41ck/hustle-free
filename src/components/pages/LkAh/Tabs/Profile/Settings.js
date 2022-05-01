import React from "react"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"

function Settings({ onToggleSidebar }) {
  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>Настройки</TitleHeader>
      </LkDefaultHeader>
    </div>
  )
}

export default Settings
