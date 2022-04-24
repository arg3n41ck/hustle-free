import React, { useState } from "react"
import { Box, Popover } from "@mui/material"
import styled from "styled-components"
import NotificationItems from "./NotificationItems"

function NotificationModal({ anchorNotifications, setAnchorNotifications }) {
  const idNotifications = !!anchorNotifications ? "simple-popover" : undefined
  const [notification] = useState([])

  return (
    <Popover
      id={idNotifications}
      open={!!anchorNotifications}
      anchorEl={anchorNotifications}
      onClose={() => setAnchorNotifications(null)}
      anchorOrigin={{
        vertical: 58,
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: 480,
          width: "100%",
          borderRadius: "12px",
          background: "#1B1C22",
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        <Wrapper>
          <Header>
            <HeaderTitle>Уведомление</HeaderTitle>
          </Header>
          <List>
            <NotificationItems notifications={notification} />
          </List>
        </Wrapper>
      </Box>
    </Popover>
  )
}

export default NotificationModal

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  max-height: 548px;
`
const Header = styled.div`
  display: flex;
  padding: 16px;
`
const HeaderTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #f2f2f2;
`

const List = styled.ul`
  & li:last-child {
    border-bottom: none;
  }
`
