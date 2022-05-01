import React from "react"
import HeaderContent, { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import styled from "styled-components"

const Statistics = ({ onToggleSidebar }) => {
  return (
    <>
      <HeaderContent onToggle={onToggleSidebar}>
        <TitleHeader>Статистика</TitleHeader>
      </HeaderContent>
      <Awards>

      </Awards>
    </>
  )
}

const Awards = styled.div`
  padding: 32px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
`

export default Statistics
