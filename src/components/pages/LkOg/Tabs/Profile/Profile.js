import React, { useState } from "react"
import Info from "./Info"
import Edits from "./Edits"

const ProfileOg = ({ onToggleSidebar }) => {
  const [view, setView] = useState("general") // general | edit

  const viewHandler = (value) => {
    setView(value)
  }

  return (
    <>
      {view === "general" ? (
        <Info onView={viewHandler} onToggleSidebar={onToggleSidebar} />
      ) : (
        <Edits onView={viewHandler} />
      )}
    </>
  )
}

export default ProfileOg
