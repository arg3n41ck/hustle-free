import React, { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import $api from '../../../../../services/axios'

const setWinner = async (bfId, fighter) => {
  console.log({ bfId })
  try {
    await $api.post(`/brackets/brackets_fights/${bfId}/winner_endpoint/`, {
      fighter,
    })
  } catch (error) {
    console.log(error)
  }
}

export default function BracketWin({ bfId, winner, fighter, onWin }) {
  const [openConf, setOpenConf] = useState(false)
  const [hideBtns, setHideBtns] = useState(false)
  const isWinner = useMemo(() => winner == fighter, [winner, fighter])

  const { current: handleSetWinner } = useRef(async () => {
    setHideBtns(true)
    await setWinner(bfId, fighter).then(() => {
      onWin()
      setHideBtns(false)
      setOpenConf(false)
    })
  }, [])
  console.log(openConf, winner)
  return !hideBtns ? (
    <MainWrapper onMouseLeave={() => setOpenConf(false)}>
      {isWinner ?? !openConf ? (
        <WinBtn className={`${isWinner ? 'win' : ''}`} onClick={() => !win && setOpenConf(true)}>
          W
        </WinBtn>
      ) : (
        <ConfBtn className={`${isWinner ? 'win' : ''}`} onClick={handleSetWinner}>
          {checkIcon}
        </ConfBtn>
      )}
    </MainWrapper>
  ) : null
}

const WinBtn = styled.button`
  width: 30px;
  height: min-content;
  display: none;
  align-items: center;
  justify-content: center;

  background: #1b1c22;

  border-radius: 8px;
  padding: 2px 8px;

  font-weight: 900;
  font-size: 12px;
  text-align: center;
  color: #6d4eea;

  &.win {
    display: flex;
    background: #6d4eea;
    color: #ffffff;
  }

  &:hover {
    background: #6d4eea;
    color: #ffffff;
  }
`
const ConfBtn = styled.button`
  width: 30px;
  height: min-content;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 8px;
  background: #1b1c22;

  & svg {
    height: 15px;
  }

  &:hover {
    background: #6d4eea;
    color: #ffffff;
  }
`

const MainWrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;

  height: calc(100% - 10px);
  width: calc(100% - 10px);
  display: flex;
  justify-content: flex-end;

  &:hover {
    ${WinBtn} {
      display: flex;
    }

    ${ConfBtn} {
      display: flex;
    }
  }
`

const checkIcon = (
  <svg width='42' height='36' viewBox='0 0 42 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M41.5804 8.36229L33.8486 0.43065C33.5801 0.155005 33.2152 0 32.8351 0C32.455 0 32.0901 0.15486 31.8214 0.43065L16.0697 16.5884L10.1783 10.5456C9.90947 10.2701 9.5449 10.115 9.1645 10.115C8.78438 10.115 8.41967 10.2701 8.15098 10.5457L0.419452 18.4776C-0.139841 19.0515 -0.139841 19.9816 0.419593 20.5553L15.0561 35.5694C15.3248 35.8451 15.6893 36 16.0697 36C16.45 36 16.8146 35.8453 17.0833 35.5694L41.5804 10.4398C42.1399 9.86623 42.1399 8.93605 41.5804 8.36229Z'
      fill='#fff'
    />
  </svg>
)
