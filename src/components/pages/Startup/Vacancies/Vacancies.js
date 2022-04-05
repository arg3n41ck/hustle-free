import React, { useState } from "react"
import HorizontalTabs from "../../../ui/tabs/HorizontalTabs"
import VacancyItem from "./VacancyItem"
import styled from "styled-components"

const tabs = [
  {
    value: "all",
    name: "Все",
  },
  {
    value: "archive",
    name: "Архив",
  },
]

const Vacancies = ({ vacancies }) => {
  const [view, setView] = useState("all") // all | archive

  return (
    <Wrapper>
      <HorizontalTabs arrayTab={tabs} valueTab={view} onChangeHandler={setView}>
        {!!vacancies.length &&
          vacancies.map((vacancy) => (
            <VacancyItem key={vacancy.id} vacancy={vacancy} />
          ))}
      </HorizontalTabs>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
`

export default Vacancies
