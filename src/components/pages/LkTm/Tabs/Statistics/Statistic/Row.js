import React, { useState } from 'react'
import { ArrowIcon } from '../../../../../ui/DropdownData'
import styled from 'styled-components'
import { Collapse } from '@mui/material'
import { motion } from 'framer-motion'
import RowDetails from './RowDetails'
import { theme } from '../../../../../../styles/theme'

const variants = {
  open: { transform: 'rotate(0deg)' },
  closed: { transform: 'rotate(270deg)' },
}

function Row({ ePC, participants }) {
  const [open, setOpen] = useState(false)

  return (
    <MainWrapper>
      <TitlePart onClick={() => setOpen(!open)}>
        <Title>
          {` ${ePC.name ? ePC.name + ' /' : ''} ${ePC.level ? ePC.level + ' /' : ''} / ${
            ePC.fromWeight || 0
          }-${ePC.toWeight || 0} кг `}
        </Title>
        <ArrowWrapper variants={variants} animate={open ? 'open' : 'closed'}>
          <ArrowIcon />
        </ArrowWrapper>
      </TitlePart>

      <Collapse in={open}>
        <RowDetails participants={participants} />
      </Collapse>
    </MainWrapper>
  )
}

export default Row

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #333;
  background: #191a1f;
  border-radius: 16px;
`

const TitlePart = styled.div`
  display: grid;
  grid-template: 1fr / auto 32px;
  grid-gap: 10px;
  cursor: pointer;

  align-items: center;

  padding: 32px;

  ${theme.mqMax('xl')} {
    padding: 20px;
  }

  ${theme.mqMax('md')} {
    padding: 16px;
  }
`

const Title = styled.h3`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
  margin: 0;
`

const ArrowWrapper = styled(motion.div)``
