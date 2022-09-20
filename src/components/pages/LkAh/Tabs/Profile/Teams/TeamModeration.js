import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../../styles/theme'

function TeamModeration({ selectedTeam, onClose, onSubmit }) {
  return (
    <>
      <Title>Вступить в команду</Title>
      <Desc>
        У команды предварительная модерация атлетов, только после подтверждения вы вступите в
        команду
      </Desc>
      <Footer>
        <Cancel onClick={onClose}>Назад</Cancel>
        <Submit variant='filled' onClick={onSubmit}>
          Далее
        </Submit>
      </Footer>
    </>
  )
}

export default TeamModeration

const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  text-align: center;
  padding: 24px 24px 10px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const Desc = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #bdbdbd;
  padding: 0 24px;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const Footer = styled.div`
  display: flex;
  padding: 24px;
  margin-top: 24px;
  grid-gap: 10px;

  border-top: 1px solid #333333;

  ${theme.mqMax('xl')} {
    padding: 16px;
  }
`

const Submit = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  padding: 8px 24px;
  ${theme.mqMax('xl')} {
    padding: 4px 16px;
  }
`

const Cancel = styled.button`
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #828282;
  border-radius: 16px;
  padding: 8px 24px;
  ${theme.mqMax('xl')} {
    padding: 4px 16px;
  }
`
