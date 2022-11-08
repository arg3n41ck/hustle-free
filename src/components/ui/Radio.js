import React from 'react'
import styled from 'styled-components'

const Radio = ({ text, secondaryText, ...props }) => {
  return (
    <>
      <Label>
        <Input type='radio' {...props} />
        <Checkmark />
        <Texts>
          <p className='auth-title__input'>{text}</p>
          {secondaryText && (
            <p className='auth-title__input'>
              <span>{secondaryText}</span>
            </p>
          )}
        </Texts>
      </Label>
    </>
  )
}
const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked {
    background: red;
  }
`
const Checkmark = styled.span`
  position: absolute;
  top: 1px;
  left: 0;
  height: 20px;
  width: 20px;
  background: none;
  border-radius: 50%;
  border: 2px solid #6d4eea;
  box-sizing: border-box;
  &:after {
    content: '';
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6d4eea;
  }
`

const Texts = styled.div`
  margin-left: 36px;

  p {
    margin: 0;
  }
`

const Label = styled.label`
  display: block;
  //height: 20px;
  //width: 20px;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & ${Input}:checked ~ ${Checkmark}:after {
    display: block;
  }
`

export default Radio
