import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { truncateString } from '../../../../helpers/helpers'
import { useRouter } from 'next/router'
import HeaderLocalizationPopover from '../HeaderLocalizationPopover'

const getPathByRole = (role) => {
  switch (role) {
    case 'organizer':
      return '/lk-og/profile'
    case 'team':
      return '/lk-tm/profile'
    case 'athlete':
      return '/lk-ah/profile'
    default:
      return '/'
  }
}

function MobilePopover({ open, setOpen }) {
  const { t: tHeader } = useTranslation('header')
  const { t: tCommon } = useTranslation('common')
  const user = useSelector((state) => state.user.user)
  const { push: routerPush } = useRouter()

  return (
    <MainWrapper>
      <AnimatePresence>
        {open && (
          <Popover
            initial={{ width: 0 }}
            animate={{
              width: '100vw',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.1, duration: 0.2 },
            }}
          >
            <Nav>
              <Link href={'/events'} passHref>
                <a>
                  <NavbarText>{tHeader('navLinks.events')}</NavbarText>
                </a>
              </Link>
              <Link href={'/'} passHref>
                <a>
                  <NavbarText>{tHeader('navLinks.more')}</NavbarText>
                </a>
              </Link>
              <Link href={'/communities'} passHref>
                <a>
                  <NavbarText>{tHeader('navLinks.community')}</NavbarText>
                </a>
              </Link>
            </Nav>
            {!!user && (
              <UserWrapper
                onClick={() => {
                  routerPush(getPathByRole(user?.role))
                  setOpen(false)
                }}
              >
                <Avatar
                  src={user?.avatar}
                  sx={{ marginRight: 1.2, objectFit: 'cover' }}
                  alt='userAva'
                />
                <UserInfo>
                  <UserName>
                    {user?.role !== 'team'
                      ? `${truncateString(user?.lastName || '', 1, false)}. ${
                          user?.firstName || ''
                        }`
                      : truncateString(user?.fullNameCoach || '', 15)}
                  </UserName>
                  <UserRole>{tCommon(`userRoles.${user?.role}`)}</UserRole>
                </UserInfo>
              </UserWrapper>
            )}
            <HeaderLocalizationPopover />
          </Popover>
        )}
      </AnimatePresence>
    </MainWrapper>
  )
}

export default MobilePopover

const MainWrapper = styled.div`
  position: relative;
`

const Popover = styled(motion.div)`
  height: calc(100vh - 80px);
  background: #0f0f10;

  position: absolute;
  overflow: hidden;
  top: 57px;
  right: -16px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`

const NavbarText = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  cursor: pointer;
`

const UserInfo = styled.div`
  max-width: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 15px;
  grid-row-gap: 2px;
`

const UserName = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #f2f2f2;
`

const UserRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #828282;
`

const UserWrapper = styled.div`
  display: flex;
  padding: 16px;
  /* Page 3 */
  cursor: pointer;

  background: #141519;
  border-radius: 16px;
`
