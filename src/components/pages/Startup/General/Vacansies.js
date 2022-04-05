import React, { useEffect, useState } from "react"
import VacanciesAndTasksItem from "./VacanciesAndTasksItem"
import styled from "styled-components"
import $api from "../../../../services/axios"
import ScrollerBlock from "./ScrollerBlock"
import CardTemplate from "../../../ui/CardTemplate"

const Vacansies = ({ id }) => {
  const [data, setData] = useState([])

  useEffect(async () => {
    const { data } = await $api.get(
      `/startup/startups/${id}/startup_vacancies/`
    )
    setData(data)
  }, [id])

  return !!data.length ? (
    <ScrollerBlock title={"Вакансии"}>
      <div>
        {data?.map(({ id, title, priceFrom, views, responders }) => (
          <VacanciesAndTasksItem
            key={id}
            title={title}
            price={priceFrom}
            responders={responders}
            views={views}
          />
        ))}
        {data?.length > 4 && (
          <AllButton>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5 12L19.2071 11.2929L19.9142 12L19.2071 12.7071L18.5 12ZM6.5 13C5.94771 13 5.5 12.5523 5.5 12C5.5 11.4477 5.94771 11 6.5 11V13ZM15.2071 7.29289L19.2071 11.2929L17.7929 12.7071L13.7929 8.70711L15.2071 7.29289ZM19.2071 12.7071L15.2071 16.7071L13.7929 15.2929L17.7929 11.2929L19.2071 12.7071ZM18.5 13H6.5V11H18.5V13Z"
                fill="#27ae60"
              />
            </svg>
            <a href={"#"}>Посмотреть все</a>
          </AllButton>
        )}
      </div>
    </ScrollerBlock>
  ) : (
    <CardTemplate
      title={"Вакансии"}
      content={"Добавьте активные вакансии"}
      buttonContent={"Добавить вакансию"}
      section="vacancies"
      path={"#"}
      isStartup={true}
    />
  )
}

const AllButton = styled.div`
  min-width: 240px;
  border-radius: 12px;
  max-height: 152px;
  min-height: 152px;
  padding: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(111, 207, 151, 0.1);
  a {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #27ae60;
  }
`

export default Vacansies
