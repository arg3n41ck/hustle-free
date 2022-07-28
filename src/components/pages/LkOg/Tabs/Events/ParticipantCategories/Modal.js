import React from 'react'
import { Modal } from '@mui/material'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

function ParticipantCategoriesModal({ open, onClose, onBack, onSubmit, title, edit, children }) {
  const { t: tLkOg } = useTranslation('lkOg')

  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={open}
      onClose={onClose}
    >
      <Wrapper>
        <Title>{title}</Title>
        <Content>{children}</Content>
        <Footer>
          <Button onClick={onBack}>{tLkOg('editEvent.back')}</Button>
          <Button type='button' onClick={onSubmit} className='primary'>
            {edit ? tLkOg('categoriesOfParticipants.apply') : tLkOg('editEvent.further')}
          </Button>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default ParticipantCategoriesModal

const Wrapper = styled.div`
  height: min-content;
  max-width: 500px;
  width: 100%;
  border-radius: 16px;
  background: #1b1c22;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
  margin: 0 5px;
`

const Title = styled.p`
  padding: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  border-bottom: 1px solid #333333;
`

const Content = styled.div`
  padding: 24px;
`

const Footer = styled.div`
  padding: 24px;
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-column-gap: 16px;
  border-top: 1px solid #333333;
`

const Button = styled.button`
  border-radius: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #828282;
  border: 1px solid #333;

  &.primary {
    background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
    color: #ffffff;
  }
`
