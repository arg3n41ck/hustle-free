import React from 'react'
import { Box, Popover } from '@mui/material'
import styled from 'styled-components'
import NotificationItems from './NotificationItems'
import { theme } from '../../../../styles/theme'

function NotificationModal({ notifications, anchorNotifications, setAnchorNotifications }) {
  const idNotifications = !!anchorNotifications ? 'simple-popover' : undefined

  return (
    <CustomPopover
      id={idNotifications}
      open={!!anchorNotifications}
      anchorEl={anchorNotifications}
      onClose={() => setAnchorNotifications(null)}
      anchorOrigin={{
        vertical: 58,
        horizontal: 'left',
      }}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: 480,
          width: '100%',
          borderRadius: '12px',
          background: '#1B1C22',
        },
      }}
    >
      <Box sx={{ p: 0 }}>
        <Wrapper>
          <Header>
            <HeaderTitle>Уведомление</HeaderTitle>
          </Header>
          <List>
            {!!notifications?.length ? (
              notifications.map(
                (n) =>
                  n?.text && (
                    <NotificationItems key={`user-notifications-${n.id}`} notification={n} />
                  ),
              )
            ) : (
              <EmptyText>У вас пока нет уведомлений</EmptyText>
            )}
          </List>
        </Wrapper>
      </Box>
    </CustomPopover>
  )
}

export default NotificationModal

const CustomPopover = styled(Popover)`
  ${theme.mqMax('xl')} {
    & .MuiPaper-root {
      /* left: 5px !important; */
      right: 5px !important;
    }
  }
  ${theme.mqMax('sm')} {
    & .MuiPaper-root {
      max-width: calc(100vw - 10px);
      left: 5px !important;
      right: 5px !important;
    }
  }
`

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

const EmptyText = styled.p`
  height: 50px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  padding: 16px;
  color: #d2d2d2;
`
