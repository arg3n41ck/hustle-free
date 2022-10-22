import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import CustomButton from '../../../../ui/CustomButton'
import { theme } from '../../../../../styles/theme'
import Athlete from '../../../../ui/Ahtletes/Athlete'
import { useTranslation } from 'next-i18next'

const Applications = ({ applications, onAcceptOrReject }) => {
  return (
    <List>
      {applications.map((application) => (
        <ApplicationItem
          key={application.id}
          onAcceptOrReject={onAcceptOrReject}
          applicationItem={application}
        />
      ))}
    </List>
  )
}
const List = styled.ul`
  margin: 32px;
  display: grid;
  grid-template: 180px / repeat(3, 1fr);
  grid-gap: 16px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  ${theme.mqMax('md')} {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default Applications

const ApplicationItem = ({ applicationItem, onAcceptOrReject }) => {
  const dispatch = useDispatch()
  const { id, athlete } = applicationItem
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <Athlete athleteId={athlete.id} user={athlete.user}>
      <Line />
      <WrapperButtons>
        <CustomButton
          typeButton={'secondary'}
          height={'32px'}
          borderRadius={'4px'}
          onClick={() => onAcceptOrReject(id, 'cancel', athlete.id)}
          style={{ fontSize: 14 }}
        >
          {tLkTm('athletes.reject')}
        </CustomButton>

        <CustomButton
          style={{ fontSize: 14 }}
          height={'32px'}
          borderRadius={'4px'}
          onClick={() => onAcceptOrReject(id, 'approved', athlete.id)}
        >
          {tLkTm('athletes.confirm')}
        </CustomButton>
      </WrapperButtons>
    </Athlete>
  )
}

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #333333;
  margin: 24px 0;
`
const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;

  grid-column-gap: 24px;
`
