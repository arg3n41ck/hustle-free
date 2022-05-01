import React, { useState } from "react"
import styled from "styled-components"
import Sidebar from "../ui/Sidebar"

function LkLayout({ tabs, children }) {
  const [openSidebar, setOpenSidebar] = useState(false)

  const toggleSidebarHandler = () => {
    setOpenSidebar((prev) => !prev)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onToggleSidebar: toggleSidebarHandler,
      })
    }
    return child
  })

  return (
    <Container>
      <Wrapper>
        <SidebarWrapper open={openSidebar}>
          <Sidebar open={openSidebar} array={tabs} />
        </SidebarWrapper>
        <Content>{childrenWithProps}</Content>
      </Wrapper>
    </Container>
  )
}

export default LkLayout

const Container = styled.div`
  max-width: 1489px;
  margin: 64px auto;
  overflow: hidden;
`
const Wrapper = styled.div`
  border: 1px solid #333333;
  border-radius: 24px;
  background: #1b1c22;
  display: flex;
`
const SidebarWrapper = styled.div`
  border-right: 1px solid #333333;
  padding: ${(p) => (p.open ? "32px" : "32px 8px")};
`
const Content = styled.div`
  flex-grow: 1;
`
