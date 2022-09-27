import React from 'react'
import styled from 'styled-components'

function EPFrormFooter({ onClose, formik }) {
  return (
    <FooterWrapper>
      <Button onClick={onClose}>Назад</Button>

      <Button className='active' onClick={formik.handleSubmit}>
        Сохранить
      </Button>
    </FooterWrapper>
  )
}

export default EPFrormFooter

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #141519;
  border-radius: 16px;
  gap: 16px;
  padding: 20px;
`

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 16px;

  font-size: 18px;
  color: #828282;

  &.active {
    color: #fff;
    background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  }
`
