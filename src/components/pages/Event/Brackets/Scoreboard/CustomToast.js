import React from 'react'
import styled from 'styled-components'

export default function CustomToast({ closeToast, handleUserDecision }) {
  return (
    <ToastContentWrapper>
      <ToastTitle>Are you sure you want to leave?</ToastTitle>
      <ActionsWrapper>
        <Button
          className='primary'
          onClick={() => {
            // User clicked "No"
            handleUserDecision(false)
            closeToast()
          }}
        >
          No
        </Button>
        <Button
          onClick={() => {
            // User clicked "Yes"
            handleUserDecision(true)
            closeToast()
          }}
        >
          Yes
        </Button>
      </ActionsWrapper>
    </ToastContentWrapper>
  )
}

const ToastContentWrapper = styled.div``

const ToastTitle = styled.p`
  color: #eb5757;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0 0 10px;
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 16px;
`

const Button = styled.button`
  width: 100%;
  border-radius: 3px;
  padding: 3px 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  &.primary {
    color: #fff;
    background: #6d4eea;
  }
  color: #333;
  background-color: #fff;
`
