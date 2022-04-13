import React from "react"
import { useSelector } from "react-redux"
import HeaderContent, { TitleHeader } from "../../../LkOg/Tabs/HeaderContent"
import styled from "styled-components"

const Info = ({ onToggleSidebar, onView }) => {
  const { user } = useSelector((state) => state.user)
  const { countries } = useSelector((state) => state.locations)

  return (
    <>
      <HeaderWrapper>
        <HeaderContent onToggle={onToggleSidebar}>
          <TitleHeader>Профиль</TitleHeader>
        </HeaderContent>
      </HeaderWrapper>
    </>
  )
}
const HeaderWrapper = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`

export default Info
