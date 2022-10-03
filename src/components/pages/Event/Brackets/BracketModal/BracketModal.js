import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'

export default function BracketModal({ selectedBracket, onClose }) {
  return (
    <AnimatePresence>
      {!!selectedBracket?.id && (
        <BracketsModalWrapper
          initial={{ right: `-100vw` }}
          animate={{
            right: 0,
            transition: { delay: 0.1, duration: 0.2 },
          }}
          exit={{ right: `-100vw`, transition: { delay: 0.15, duration: 0.2 } }}
        >
          <ContentWrapper>
            <HeaderWrapper>
              <Back onClick={onClose}>
                {arrowBack}
                <span>назад</span>
              </Back>
              <Title>{selectedBracket?.title}</Title>
            </HeaderWrapper>
          </ContentWrapper>
        </BracketsModalWrapper>
      )}
    </AnimatePresence>
  )
}

const BracketsModalWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;

  overflow-y: auto;
  overflow-x: hidden;
  background: #0f0f10;

  z-index: 12;
`

const ContentWrapper = styled.div`
  max-width: 1489px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px 16px 40px;
  margin: 0 auto;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #141519;
  border-radius: 16px;
  gap: 32px;
  padding: 20px;

  ${theme.mqMax('md')} {
    gap: 16px;
  }
`

const Back = styled.button`
  font-weight: 500;
  font-size: 18px;

  display: flex;
  align-items: center;

  color: #828282;
`

const Title = styled.h3`
  font-weight: 700;
  font-size: 28px;
  color: #f2f2f2;

  ${theme.mqMax('md')} {
    font-size: 18px;
  }
`

const arrowBack = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM8.29289 7.29289L4.29289 11.2929L5.70711 12.7071L9.70711 8.70711L8.29289 7.29289ZM4.29289 12.7071L8.29289 16.7071L9.70711 15.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H17V11H5V13Z'
      fill='#828282'
    />
  </svg>
)