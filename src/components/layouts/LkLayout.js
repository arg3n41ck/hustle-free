import { useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import MobileSidebar from '../ui/MobileSidebar'
import Sidebar from '../ui/Sidebar'

function LkLayout({ tabs, children }) {
  const [openSidebar, setOpenSidebar] = useState(false)
  const xl = useMediaQuery('(max-width: 1200px)')

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

  useEffect(() => {
    document.querySelector('html').style.overflowY = openSidebar ? 'hidden' : ''
  }, [openSidebar])

  return (
    <Container>
      <Wrapper>
        {!xl ? (
          <SidebarWrapper open={openSidebar}>
            <Sidebar open={openSidebar} array={tabs} />
          </SidebarWrapper>
        ) : (
          openSidebar && <MobileSidebar open={openSidebar} onClose={setOpenSidebar} array={tabs} />
        )}
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

  ${theme.mqMax('xl')} {
    margin: 32px auto;
  }
`
const Wrapper = styled.div`
  border: 1px solid #333333;
  border-radius: 24px;
  background: #1b1c22;
  display: flex;
`
const SidebarWrapper = styled.div`
  border-right: 1px solid #333333;
  padding: ${(p) => (p.open ? '32px' : '32px 8px')};
`
const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`
