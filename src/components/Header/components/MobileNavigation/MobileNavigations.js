import { Close } from '@mui/icons-material'
// import { Avatar } from '@mui/material'
// import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectIsUserAuth } from '../../../../redux/components/user'
import { theme } from '../../../../styles/theme'
import Notifications from '../Notifications/Notifications'
import MobilePopover, { getPathByRole } from './MobilePopover'

const MobileNavigations = () => {
  const [open, setOpen] = useState(false)
  const [userAuthenticated] = useSelector(selectIsUserAuth)
  // const { user } = useSelector((state) => state.user)

  useEffect(() => {
    document.querySelector('html').style.overflowY = open ? 'hidden' : ''
  }, [open])

  return (
    <MobileRightWrapper>
      {/* {!!user?.id && (
        <Link href={getPathByRole(user?.role)} passHref>
          <a onClick={() => setOpen(false)}>
            <Avatar
              src={user?.avatar}
              sx={{
                height: 38,
                width: 38,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid #828282',
                margin: '0 8px',
              }}
              alt='userAva'
            />
          </a>
        </Link>
      )} */}
      {userAuthenticated && <Notifications />}
      <MobilePopover open={open} setOpen={setOpen} />
      {!open && (
        <Menu onClick={() => setOpen(true)} style={{ width: 32, height: 32, cursor: 'pointer' }} />
      )}
      {open && (
        <Close
          sx={{ width: 32, height: 32, color: '#828282 !important' }}
          onClick={() => setOpen(false)}
        />
      )}
    </MobileRightWrapper>
  )
}

export default MobileNavigations

const MobileRightWrapper = styled.div`
  display: none;
  ${theme.mqMax('xl')} {
    display: flex;
  }
  grid-column-gap: 8px;
`

const Menu = (props) => (
  <svg
    {...props}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.75 12H20.25'
      stroke='#828282'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.75 6H20.25'
      stroke='#828282'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.75 18H20.25'
      stroke='#828282'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
