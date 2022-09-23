import React, { useRef } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../../hooks/useClickOutside'
import { theme } from '../../../styles/theme'
import { AnimatePresence, motion } from 'framer-motion'

function EventEditDropdown({ children, open, onClose, items = [] }) {
  const ref = useRef(null)
  useClickOutside(ref, onClose)

  return (
    <DropdownWrapper ref={ref}>
      {children}
      <AnimatePresence>
        {open && (
          <Dropdown
            initial={{ height: 0 }}
            animate={{
              height: 'auto',
            }}
            exit={{
              height: 0,
              transition: { delay: 0.1, duration: 0.15 },
            }}
          >
            {!!items?.length &&
              items.map(({ title, onClick }, i) => {
                return (
                  <Item
                    key={`ui_${title}_${i}`}
                    onClick={() => {
                      onClose()
                      onClick()
                    }}
                  >
                    {title}
                  </Item>
                )
              })}
          </Dropdown>
        )}
      </AnimatePresence>
    </DropdownWrapper>
  )
}

export default EventEditDropdown

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`

const Dropdown = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 70px;
  left: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  border: 1px solid #333333;
  border-radius: 16px;
  background: #1b1c22;
  border-radius: 16px;

  z-index: 3;

  ${theme.mqMax('sm')} {
    top: 61px;
  }
`

const Item = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #828282;
  cursor: pointer;

  &:hover {
    color: #f2f2f2;
    background: linear-gradient(0deg, rgba(109, 78, 234, 0.07), rgba(109, 78, 234, 0.07)), #1b1c22;
  }

  padding: 16px;

  &:first-child {
    border-radius: 16px 16px 0 0;
  }
  &:last-child {
    border-radius: 0 0 16px 16px;
  }
`
