import React from "react"
import HorizontalTabs from "../../../ui/tabs/HorizontalTabs"
import OrganizerLegalData from "./OrganizerLegalData"
import OrganizerPersonalData from "./OrganizerPersonalData"

const tabs = [
  {
    value: "contactInfo",
    name: "Контактные данные",
  },
  {
    value: "legalInfo",
    name: "Юридические данные",
  },
]

function OrganizerTabs() {
  const [view, setView] = React.useState("contactInfo") // contactInfo | legalInfo

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h3 className="auth-title">Добро пожаловать!</h3>
        <p className="auth-description">
          Создайте аккаунт, чтобы пользоваться сервисами и было проще.
        </p>
        <HorizontalTabs
          arrayTab={tabs}
          valueTab={view}
          onChangeHandler={setView}
        >
          {view === "contactInfo" && <OrganizerPersonalData />}
          {view === "legalInfo" && <OrganizerLegalData />}
        </HorizontalTabs>
      </div>
    </div>
  )
}

export default OrganizerTabs
