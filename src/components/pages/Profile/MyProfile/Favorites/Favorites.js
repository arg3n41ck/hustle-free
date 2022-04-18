import React, { useState } from "react"
import HorizontalTabs from "../../../../ui/tabs/HorizontalTabs"
import styled from "styled-components"
import ServicesList from "./ServicesList"

const tabs = [
  {
    value: "services",
    name: "Услуги",
  },
  {
    value: "vacancies",
    name: "Вакансии",
  },
  {
    value: "tasks",
    name: "Задачи",
  },
]

const Favorites = () => {
  const [view, setView] = useState("services") // service | vacancies | tasks

  return (
    <FavoritesWrapper>
      <HorizontalTabs arrayTab={tabs} valueTab={view} onChangeHandler={setView}>
        {view === "services" && <ServicesList />}
      </HorizontalTabs>
    </FavoritesWrapper>
  )
}

const FavoritesWrapper = styled.div`
  margin-top: -32px;
`

export default Favorites
