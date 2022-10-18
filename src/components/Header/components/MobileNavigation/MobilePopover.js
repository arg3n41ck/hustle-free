import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { truncateString } from '../../../../helpers/helpers'
import { useRouter } from 'next/router'
import HeaderLocalizationPopover from '../HeaderLocalizationPopover'
import clearCookies from '../../../../utils/clearCookies'
import { exitUser } from '../../../../redux/components/user'

export const getPathByRole = (role) => {
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
  const { user, userAuthenticated } = useSelector((state) => state.user)
  const { push: routerPush } = useRouter()
  const dispatch = useDispatch()

  const outHandler = async () => {
    dispatch(exitUser())
    clearCookies()
    setOpen(false)
    await routerPush('/login')
  }

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
                <a onClick={() => setOpen(false)}>
                  <NavbarText>{tHeader('navLinks.events')}</NavbarText>
                </a>
              </Link>
              <Link href={'/'} passHref>
                <a onClick={() => setOpen(false)}>
                  <NavbarText>{tHeader('navLinks.more')}</NavbarText>
                </a>
              </Link>
              <Link href={'/communities/athletes/'} passHref>
                <a onClick={() => setOpen(false)}>
                  <NavbarText>{tHeader('navLinks.community')}</NavbarText>
                </a>
              </Link>
            </Nav>
            {userAuthenticated ? (
              <>
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
                        : truncateString(user?.fullNameCoach || '', 15, false)}
                    </UserName>
                    <UserRole>{tCommon(`userRoles.${user?.role}`)}</UserRole>
                  </UserInfo>
                </UserWrapper>
                <LoginButton style={{ color: '#828282' }} onClick={() => outHandler()}>
                  {tHeader('userTabs.exit')}
                </LoginButton>
              </>
            ) : (
              <LoginButton onClick={() => outHandler()}>{tHeader('userTabs.login')}</LoginButton>
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

  position: fixed;
  overflow: hidden;
  top: 80px;
  right: 0;
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

const LoginButton = styled.button`
  width: min-content;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
  color: #f2f2f2;
`
