import { Person } from '@mui/icons-material'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { ScoreboardContext } from './context'
import { scoreBtns, submissionBtns, submissionNames } from './const'

export default function ScoreboardParticipant({
  fighterId,
  fullName,
  teamName,
  flagSrc,
  avaSrc,
  ISOApha2,
  index,
  scores,
  penalty,
  advantage,
  handleScoreChanges,
}) {
  const { disableScoring, roundSubmission, onSelectWinType } = useContext(ScoreboardContext)

  const isWinner = useMemo(
    () => roundSubmission?.fighterId == fighterId,
    [roundSubmission.fighterId],
  )

  return (
    <MainWrapper>
      {/* LEFT INFO AND BUTTONS PART */}
      <LeftWrapper>
        <InfoBtnsWrapper className={`${isWinner ? 'readyToSave' : ''}`}>
          {isWinner && (
            <WinnerText>winner by {submissionNames[roundSubmission.winType]}</WinnerText>
          )}
          {/* USER INFO */}
          <UserOutterWrapper>
            {avaSrc ? (
              <Avatar src={avaSrc} alt={`${fullName} img`} />
            ) : (
              <PersonIcon>
                <Person />
              </PersonIcon>
            )}
            <UserInnerWrapper>
              <CountryCol>
                {ISOApha2 && (
                  <Flag src={`https://flagsapi.com/${ISOApha2}/flat/64.png`} alt={`${flagSrc}`} />
                )}
                {ISOApha2 && <Country>{ISOApha2}</Country>}
              </CountryCol>
              <TextsWrapper>
                <FullName>{fullName}</FullName>
                <Team>{teamName}</Team>
              </TextsWrapper>
            </UserInnerWrapper>
          </UserOutterWrapper>

          {!isWinner && (
            <>
              {!roundSubmission?.isEnd ? (
                <ScoreButtonsWrapper>
                  {/* SCORE BUTTONS */}
                  <ScoreBtnsRow>
                    {scoreBtns.map(({ changeType, changeValue, label }) => (
                      <ScoreBtn
                        key={label}
                        onClick={() => handleScoreChanges({ changeType, changeValue })}
                      >
                        +{label}
                      </ScoreBtn>
                    ))}
                  </ScoreBtnsRow>
                  <ScoreBtnsRow>
                    {scoreBtns.map(({ changeType, changeValue, label }) => (
                      <ScoreBtn
                        key={label}
                        disabled={disableScoring}
                        onClick={() =>
                          handleScoreChanges({ changeType, changeValue: changeValue * -1 })
                        }
                        className='negative'
                      >
                        -{label}
                      </ScoreBtn>
                    ))}
                  </ScoreBtnsRow>
                </ScoreButtonsWrapper>
              ) : (
                <SubmissionsWrapper>
                  <WonBy>WON BY:</WonBy>
                  <SubmitBtns>
                    {submissionBtns.map(({ winType }) => (
                      <SubmitBtn
                        key={`${submissionNames[winType]}-${winType}`}
                        onClick={() => onSelectWinType(winType, fighterId)}
                      >
                        {submissionNames[winType]}
                      </SubmitBtn>
                    ))}
                  </SubmitBtns>
                </SubmissionsWrapper>
              )}
            </>
          )}
        </InfoBtnsWrapper>
      </LeftWrapper>

      {/* RIGHT SCORES PART */}

      <RightWrapper>
        <APWrapper>
          <APItem>
            <Title>ADVANTAGE</Title>
            <Score>{advantage}</Score>
          </APItem>
          <APItem>
            <Title>PENALTY</Title>
            <Score>{penalty}</Score>
          </APItem>
        </APWrapper>
        <MainScore first={index == 0}>
          <p>{scores}</p>
        </MainScore>
      </RightWrapper>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  width: 100%;
  height: min-content;
  display: grid;
  grid-template: 1fr / auto auto;
  justify-content: space-between;

  border-bottom: 1px solid #333;
`

// LEFT SIDE STYLES

const LeftWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  padding: 16px;
`

const UserOutterWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template: 1fr / 70px auto;
  grid-gap: 16px;
  align-items: center;
`

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
`
const PersonIcon = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #333;
  background: #000;

  & svg {
    width: 50px;
    height: 50px;
  }
  border-radius: 8px;
`

const UserInnerWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template: 1fr / 28px auto;
  grid-gap: 16px;
  align-items: center;
`

const CountryCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 12px;
`

const Flag = styled.img`
  object-fit: contain;
  width: 28px;
  height: 28px;
`

const Country = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #bdbdbd;
`

const TextsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

const FullName = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  text-transform: uppercase;
  color: #f2f2f2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`

const Team = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;

  color: #bdbdbd;
  margin: 0;
`

const InfoBtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  padding: 8px;
  border-radius: 12px;

  &.readyToSave {
    background-color: #f2c94c;

    & ${Country} {
      color: #0f0f10;
    }
    & ${FullName} {
      color: #0f0f10;
    }
    & ${Team} {
      color: #0f0f10;
    }
  }
`

const ScoreButtonsWrapper = styled.div`
  width: min-content;
  display: grid;
  grid-template: 1fr 1fr/ 1fr;
  background: #141519;
  border-radius: 12px;
  border: 1px solid #0f0f10;
`

const ScoreBtnsRow = styled.div`
  width: min-content;
  display: flex;
`

const ScoreBtn = styled.button`
  width: 60px;
  height: 60px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #0f0f10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #27ae60;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0f0f10;
  }
  &.negative {
    color: #eb5757;
  }
`

// RIGHT SIDE STYLED

const RightWrapper = styled.div`
  display: grid;
  grid-template: 100% / 1fr 5fr;
  grid-gap: 16px;
`

const APWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const APItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  /* identical to box height, or 100% */

  text-align: center;
  text-transform: uppercase;

  /* #828282 */

  color: #828282;
`
const Title = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: -0.5px;

  color: #828282;
`
const Score = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 86px;
  line-height: 90%;
  text-transform: uppercase;

  color: #828282;
`

const MainScore = styled.div`
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: ${({ first }) => (first ? '#EB5757' : '#6D4EEA')};

  & p {
    font-weight: 700;
    font-size: 200px;
    text-transform: uppercase;

    color: #fff;
  }
`

const SubmissionsWrapper = styled.div`
  width: 100%;
  background: #141519;
  border: 1px solid #0f0f10;
  border-radius: 12px;
`

const WonBy = styled.p`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #f2f2f2;
  background-color: #1b1c22;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`

const SubmitBtns = styled.div`
  display: flex;
  align-items: center;
`

const SubmitBtn = styled.button`
  padding: 12px;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #f2f2f2;

  border-right: 1px solid #0f0f10;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: #0f0f10;
  }
`

const WinnerText = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;
  text-transform: uppercase;

  color: #0f0f10;
`
