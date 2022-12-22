import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function PlaceField({ defaultCount, onChange }) {
  const [count, setCount] = useState(defaultCount)

  useEffect(() => {
    onChange &&
    defaultCount !== count &&
     onChange(count)
  }, [count])

  return (
    <Wrapper>
      <input
        type='text'
        value={count !== 0 ? count : '-'}
        onChange={({ target: { value } }) => {
          const replacedV = +value.replace(/\D/gi, '')
          setCount(replacedV < 0 ? 0 : replacedV > 99 ? 99 : replacedV)
        }}
      />

      <Arrows>
        <div onClick={() => setCount((s) => (s <= 99 ? s + 1 : 99))}>
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.19206 0.230466L8.90654 4.68785C9.34076 5.20891 8.97024 6 8.29197 6L1.70803 6C1.02976 6 0.659237 5.20892 1.09346 4.68785L4.80794 0.230466C4.90789 0.110528 5.09211 0.110528 5.19206 0.230466Z'
              fill='#828282'
            />
          </svg>
        </div>
        <div onClick={() => setCount((s) => (s > 0 ? s - 1 : 0))}>
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.80794 5.76953L1.09346 1.31215C0.659238 0.791085 1.02976 -4.64557e-07 1.70803 -4.56469e-07L8.29197 -3.77956e-07C8.97024 -3.69868e-07 9.34076 0.791084 8.90654 1.31215L5.19206 5.76953C5.09211 5.88947 4.90789 5.88947 4.80794 5.76953Z'
              fill='#828282'
            />
          </svg>
        </div>
      </Arrows>
    </Wrapper>
  )
}

export default PlaceField

const Wrapper = styled.div`
  height: 56px;
  width: 99px;
  background: #0f0f10;
  border: 1.5px solid #333333;
  border-radius: 8px;
  display: grid;
  grid-template: 1fr / 32px 24px;
  grid-column-gap: 8px;
  justify-content: center;
  align-items: center;

  input {
    background: none;
    font-size: 18px;
    line-height: 24px;
    color: #bdbdbd;
  }
`

const Arrows = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-row-gap: 2px;
  padding: 5px 0;

  div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    border-radius: 5px;
    padding: 4px 0;

    &:nth-child(2) {
      align-items: flex-start;
    }

    &:hover {
      background: #333;
    }
  }
`
