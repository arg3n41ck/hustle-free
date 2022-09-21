import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { exitUser } from '../../redux/components/user'
import { useTranslation } from 'next-i18next'

const variants = {
  open: { display: 'block', x: 0, pointerEvents: 'auto' },
  closed: { display: 'none', x: '100%', pointerEvents: 'auto' },
}

const contentVariants = {
  open: { gridGap: '18px', justifyContent: 'flex-start' },
  closed: { gridGap: '0px', justifyContent: 'center' },
}

const MobileSidebar = ({ open, onClose, array }) => {
  const { push: routerPush, pathname, asPath } = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const { t: tHeader } = useTranslation('header')

  const handleOnClickTab = (path) => {
    if (path === 'exit') {
      routerPush('/login').then(() => {
        dispatch(exitUser())
      })
    }
    onClose(false)
    routerPush(path)
  }

  return (
    <Wrapper>
      <AnimatePresence>
        <Popover
          initial={{ left: 0, width: 0 }}
          animate={{
            width: '100vw',
          }}
        >
          {array.map((item, i) => {
            const active = !!item.children?.length
              ? item.children.includes(pathname) || item.href === pathname || item.href === asPath
              : pathname === item.href || item.href === asPath

            const path = item?.role || user?.role

            return (
              <Item
                key={`${item.value}_${i}`}
                active={active}
                onClick={() => handleOnClickTab(item.href)}
              >
                <ItemContent animate={open ? 'open' : 'closed'} variants={contentVariants}>
                  <IconWrapper active={active}>{item.icon}</IconWrapper>
                  <Text animate={open ? 'open' : 'closed'} variants={variants}>
                    {tHeader(`userTabs.${path}.${item.name}`)}
                  </Text>
                </ItemContent>
              </Item>
            )
          })}
        </Popover>
      </AnimatePresence>
    </Wrapper>
  )
}

const Popover = styled(motion.div)`
  height: calc(100vh - 80px);
  background: #0f0f10;
  position: fixed;
  overflow: hidden;
  top: 80px;
  right: -16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const IconWrapper = styled.div`
  height: 100%;
  svg * {
    fill: ${(p) => (p.active ? '#6D4EEA' : '#828282')};
    stroke: ${(p) => (p.active ? '#6D4EEA' : '#828282')};
  }
`
const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  grid-row-gap: 24px;
  overflow: hidden;
  z-index: 1;
`
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 0 18px;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: ${(p) => (p.active ? '#ffffff' : '#BDBDBD')};
  background: ${(p) => (p.active ? 'rgba(109, 78, 234, 0.07)' : '#141519')};
  border-radius: 16px;
  width: 100%;
  height: 72px;
  &:hover {
    transition: 0.3s;
    background: ${(p) => (p.active ? 'rgba(109, 78, 234, 0.07)' : '#0f0f10')};
    ${IconWrapper} svg * {
      transition: 0.3s;
      fill: ${(p) => (p.active ? '#6D4EEA' : '#fff')};
      stroke: ${(p) => (p.active ? '#6D4EEA' : '#fff')};
    }
  }
`

const ItemContent = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`

const Text = styled(motion.p)``

export default MobileSidebar
