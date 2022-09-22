import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { useMediaQuery } from '@mui/material'

function ULAccordion({ title, children, defaultExpanded = true }) {
  const lg = useMediaQuery('(max-width: 850px)')
  return (
    <AccordionCustom
      sx={{
        '& .MuiAccordionSummary-expandIconWrapper': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(-90deg)',
        },
        '& .MuiSvgIcon-root': {
          color: '#828282',
        },
      }}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{ padding: lg ? '0 16px' : '8px 16px' }}
      >
        <AccordionCustomHeadingText>{title}</AccordionCustomHeadingText>
      </AccordionSummary>
      <Line />
      <AccordionDetails
        sx={{
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gridRowGap: '24px',
        }}
      >
        {children}
      </AccordionDetails>
    </AccordionCustom>
  )
}

export default ULAccordion

const AccordionCustomHeadingText = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
  margin: ${({ margin }) => (!!margin ? margin : 0)};
`

const AccordionCustom = styled(Accordion)`
  background-color: #1b1c22 !important ;
  border: 1px solid #333333 !important;
  border-radius: 16px !important;
  padding: 8px 16px !important;
  margin: 0 !important;

  @media screen and (max-width: 850px) {
    padding: 0px 8px !important;
  }
`
