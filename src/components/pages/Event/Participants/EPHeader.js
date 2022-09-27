import { Checkbox } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'

function EPHeader({ setOpenEPForm, open, onChange, checked }) {
  return (
    <div>
      <AnimatePresence>
        {open && (
          <HeaderWrapper
            initial={{ top: -100 }}
            animate={{
              top: 1,
            }}
            exit={{
              top: -100,
              transition: { delay: 0.05, duration: 0.1 },
            }}
          >
            <ChekboxWrapper>
              <Checkbox checked={checked} onChange={onChange} />
              <p>Выбрать всех</p>
            </ChekboxWrapper>
            <GoToForm onClick={() => setOpenEPForm(true)}>Создать сетку</GoToForm>
          </HeaderWrapper>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EPHeader

const HeaderWrapper = styled(motion.div)`
  max-width: 1489px;
  width: 100%;
  height: 78px;

  position: fixed;

  margin: 0 -38px;

  z-index: 99;

  background: rgba(25, 26, 31, 0.7);
  backdrop-filter: blur(12px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 38px;

  ${theme.mqMax('xl')} {
    margin: 0 -16px;
    padding: 0 16px;
  }
`

const ChekboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 16px;

  & .MuiCheckbox-root {
    padding: 0 !important;
  }
  p {
    font-weight: 600;
    font-size: 20px;
    color: #f2f2f2;
  }
`

const GoToForm = styled.button`
  height: min-content;

  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;

  font-size: 18px;
  color: #ffffff;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`
