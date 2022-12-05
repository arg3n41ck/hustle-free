import { Modal } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

export default function FullScreenLoader({ open }) {
  return (
    <Modal open={open}>
      <LDSRing>
        <div className='lds-ring'>
          <div />
          <div />
          <div />
          <div />
        </div>
      </LDSRing>
    </Modal>
  )
}

const LDSRing = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & .lds-ring {
    display: flex;

    align-items: center;
    justify-content: center;
    position: relative;
    width: 120px;
    height: 120px;

    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 98px;
      height: 98px;
      margin: 8px;
      border: 8px solid #6d4eea;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #6d4eea transparent transparent transparent;
    }

    & div:nth-child(1) {
      animation-delay: -0.45s;
    }

    & div:nth-child(2) {
      animation-delay: -0.3s;
    }

    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
