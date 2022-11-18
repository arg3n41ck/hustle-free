import { Checkbox } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { EPFieldMainWrapper } from './EPFormBrackets'

function EPFormPCField({ formik, selectedEPCDetailed }) {
  const { values, errors, touched, setFieldValue } = formik
  return (
    <EPFieldMainWrapper className={`${Boolean(touched?.epc) && errors?.epc ? 'error' : ''}`}>
      <EPFieldTitle>1. Выбраные категории</EPFieldTitle>

      <Checkboxes>
        {!!selectedEPCDetailed?.length &&
          selectedEPCDetailed.map(({ id, title, participantsCount }) => (
            <ChekboxWrapper key={`EP_creation_form_${id}`}>
              <Checkbox
                checked={values.epc?.includes(id)}
                onChange={({ target: { checked } }) =>
                  checked
                    ? setFieldValue('epc', [...(values.epc || []), id])
                    : setFieldValue(
                        'epc',
                        values.epc?.length ? values.epc.filter((_id) => _id !== id) : [],
                      )
                }
              />
              <EPTitle>
                {title}
                {'->'}
                {participantsCount}
              </EPTitle>
            </ChekboxWrapper>
          ))}
        {Boolean(touched?.epc) && errors?.epc && <EPTitle className='error'>{errors.epc}</EPTitle>}
      </Checkboxes>
    </EPFieldMainWrapper>
  )
}

export default EPFormPCField

export const EPFieldTitle = styled.h4`
  font-weight: 600;
  font-size: 24px;
`

const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ChekboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 16px;

  & .MuiCheckbox-root {
    padding: 0 !important;
  }
`

export const EPTitle = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #f2f2f2;

  &.error {
    color: #eb5757;
  }
`
