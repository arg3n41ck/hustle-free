import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import Radio from '../../../../ui/Radio'
import { EPFieldTitle, EPTitle } from './EPFormPCField'

const bracketsChoises = [
  {
    id: 1,
    title: 'Single elimination bracket (without bronze fight)',
    src: '/assets/png/singleOutBronze.png',
  },
]

function EPFormBrackets({ formik }) {
  const { values, errors, touched, setFieldValue } = formik

  return (
    <EPFieldMainWrapper>
      <EPFieldTitle>2. Выберите тип сетки</EPFieldTitle>

      <BracketsWrapper>
        {bracketsChoises.map(({ id, title, src }) => (
          <Bracket onClick={() => setFieldValue('brackets', id)} key={`EPForm_brackets_${id}`}>
            <img src={src} />
            <Radio text={title} checked={values.brackets == id} readOnly />
          </Bracket>
        ))}
      </BracketsWrapper>
      {Boolean(touched?.brackets) && errors?.brackets && (
        <EPTitle className='error'>{errors.brackets}</EPTitle>
      )}
    </EPFieldMainWrapper>
  )
}

export default EPFormBrackets

export const EPFieldMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #141519;
  border-radius: 16px;
  gap: 16px;
  padding: 20px;
`

const BracketsWrapper = styled.div`
  max-width: 313px;
  display: flex;
  flex-wrap: wrap;
`

const Bracket = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
