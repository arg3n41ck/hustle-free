import React from 'react'
import styled from 'styled-components'

function EPFormHeader({ onClose, formik }) {
  return (
    <HeaderWrapper>
      <Back onClick={onClose}>
        {arrowBack}
        <span>назад</span>
      </Back>
      <Title>Создание сетки</Title>
      <SaveChanges onClick={formik.hundleSubmit}>Сохранить изменения</SaveChanges>
    </HeaderWrapper>
  )
}

export default EPFormHeader

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #141519;
  border-radius: 16px;
  gap: 16px;
  padding: 20px;
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
`
const SaveChanges = styled.button`
  padding: 15px;
  background: #333333;
  border-radius: 8px;

  font-size: 18px;
  color: #ffffff;

  margin: 0 0 0 auto;
`

const arrowBack = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM8.29289 7.29289L4.29289 11.2929L5.70711 12.7071L9.70711 8.70711L8.29289 7.29289ZM4.29289 12.7071L8.29289 16.7071L9.70711 15.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H17V11H5V13Z'
      fill='#828282'
    />
  </svg>
)
