import React, { useContext, useMemo } from 'react'
import { ScoreboardContext } from './context'
import { Modal } from '@mui/material'
import styled from 'styled-components'
import { Close } from '@mui/icons-material'
import ScoreboardParticipant from './ScoreboardParticipant'
import ScoreboardMainActions from './ScoreboardMainActions'
import ScoreboardTimer from './ScoreboardTimer'
import Submissions from './Submissions'
import { scoreTimeActTypes } from './const'

export default function Scoreboard() {
  const {
    open,
    onClose,
    scoreboard,
    changeScore,
    reverseFighters,
    openSubmissions,
    roundSubmission,
    handleTimerChange,
  } = useContext(ScoreboardContext)

  const winner = useMemo(() => {
    if (
      roundSubmission.openWinWindow &&
      roundSubmission.fighterId &&
      scoreboard?.fighters?.length
    ) {
      return scoreboard.fighters.find(({ id }) => id == roundSubmission.fighterId)
    }
  }, [roundSubmission.openWinWindow, roundSubmission.fighterId])

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 || event.key === ' ' || event.key === 'Spacebar') {
      handleTimerChange(scoreTimeActTypes.toggle)
      event.preventDefault() // Prevent the default action (scroll / move caret)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <InnerAbsoluteWrapper onKeyDown={handleKeyDown}>
        {openSubmissions && <Submissions />}

        <ContentWrapper>
          <CloseBtn onClick={onClose}>
            <Close sx={{ '& > path': { color: '#6d4eea' } }} />
          </CloseBtn>
        </ContentWrapper>

        {!winner ? (
          scoreboard?.fighters?.length === 2 &&
          (reverseFighters ? [...scoreboard.fighters].reverse() : scoreboard.fighters)
            // .sort((a, b) => a?.order - b?.order)
            .map((fighter, i) => (
              <ScoreboardParticipant
                key={fighter?.id}
                fighterId={fighter?.id}
                fullName={fighter?.fighter?.fullName}
                teamName={fighter?.fighter?.teamName}
                avaSrc={fighter?.fighter?.avatar}
                ISOApha2={fighter?.fighter?.countryCode}
                index={i}
                scores={fighter?.scores}
                advantage={fighter?.advantage}
                penalty={fighter?.penalty}
                handleScoreChanges={({ changeType, changeValue }) => {
                  fighter?.id &&
                    changeScore({
                      changeValue,
                      changeType,
                      fighterId: fighter?.id,
                      scoreboardId: scoreboard?.id,
                    })
                }}
              />
            ))
        ) : (
          <WinnerWindow>
            <WinTitle>winner by Submission</WinTitle>
            <WinFighterRow>
              {winner?.fighter?.countryCode && (
                <Flag
                  src={`https://flagsapi.com/${winner?.fighter?.countryCode}/flat/64.png`}
                  alt={`${winner.fighter.countryCode}`}
                />
              )}

              <WinnerName>{winner?.fighter?.fullName || ''}</WinnerName>
            </WinFighterRow>
            <WinnerTeam>{winner?.fighter?.teamName || ''}</WinnerTeam>
          </WinnerWindow>
        )}
        <LowestRowWrapper>
          <ScoreboardMainActions winner={winner} />
          <ScoreboardTimer winner={winner} />
        </LowestRowWrapper>
      </InnerAbsoluteWrapper>
    </Modal>
  )
}

const InnerAbsoluteWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-template: 0px repeat(3, min-content) / 1fr;

  & * {
    font-family: 'Roboto Condensed', sans-serif !important;
  }
  max-width: 1489px;
  max-height: 1080px;
  height: min-content;
  width: calc(100% - 30px);

  background: #0f0f10;
  border-radius: 16px;
  border: 1px solid #333;
`

const ContentWrapper = styled.div`
  position: relative;
`

const CloseBtn = styled.button`
  position: absolute;
  right: -12px;
  top: -12px;
  padding: 3px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LowestRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`

const WinnerWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 70px 0;

  border-bottom: 1px solid #333;
`

const WinTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  text-transform: uppercase;

  color: #0f0f10;

  background: #f2c94c;
  border-bottom: 1px solid #f2c94c;
  border-radius: 12px;
  padding: 4px 10px;

  margin-bottom: 14px;
`

const WinnerName = styled.p`
  font-weight: 700;
  font-size: 60px;
  line-height: 120%;
  text-transform: uppercase;
  color: #f2f2f2;
`

const WinnerTeam = styled.p`
  font-weight: 400;
  font-size: 40px;
  line-height: 120%;
  text-transform: uppercase;
  color: #a0a0a0;
`

const WinFighterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-gap: 16px;
`

const Flag = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: contain;
`
