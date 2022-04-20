import React from "react"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import styled from "styled-components"
import { useRouter } from "next/router"

function EventsContent({ onToggleSidebar }) {
  const { push: routerPush } = useRouter()
  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Мои турниры</TitleHeader>
          <CreateEventBTN
            onClick={() => routerPush("/lk-og/profile/events/create")}
          >
            Создать новое мероприятие
          </CreateEventBTN>
        </HeaderWrapper>
      </LkDefaultHeader>
      Тут список моих турниров
    </div>
  )
}

export default EventsContent

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const CreateEventBTN = styled.button`
  padding: 0 20px;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`
