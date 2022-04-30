import React from "react"
import HeaderContent  from "./HeaderContent"
import styled from "styled-components"

function LkDefaultHeader({ onToggleSidebar, children }) {
  return (
    <HeaderWrapper>
      <HeaderContent onToggle={onToggleSidebar}>
        {children}
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default LkDefaultHeader

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
