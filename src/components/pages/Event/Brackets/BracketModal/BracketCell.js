import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { BracketsAthAva } from '../../../../../assets/svg/icons'
import { truncateString } from '../../../../../helpers/helpers'
import { selectCountriesAndCities } from '../../../../../redux/components/countriesAndCities'
import { selectBrackets, setBFOnWin } from '../../../../../redux/components/eventBrackets'
import BracketWin from './BracketWin'

export default function BracketCell({ cell, gridTemplateAreas, updateBF, classes }) {
  const { id, fighters, fightNumber, parents, winner, children, borderDirection, disabled } = cell
  const [, , participantAthletes] = useSelector(selectBrackets)
  const [countries] = useSelector(selectCountriesAndCities)
  const dispatch = useDispatch()
  const athletesInfo = useMemo(() => {
    if (participantAthletes?.data?.length && fighters?.length) {
      const firstParticipantCat =
        fighters[0] &&
        participantAthletes?.data?.find((pc) => {
          return pc?.athlete?.id == fighters[0]?.athlete?.id
        })
      const secondParticipantCat =
        fighters[1] &&
        participantAthletes?.data?.find((pc) => {
          return pc?.athlete?.id == fighters[1]?.athlete?.id
        })

      const firstaAthlete = firstParticipantCat?.athlete && {
        athlete: firstParticipantCat?.athlete,
        countryCode:
          countries?.length &&
          countries?.find(({ id }) => id == firstParticipantCat?.athlete?.user?.counrty),
        team: firstParticipantCat?.team,
      }

      const secondAthlete = secondParticipantCat?.athlete && {
        athlete: secondParticipantCat?.athlete,
        countryCode:
          countries?.length &&
          countries?.find(({ id }) => id == secondParticipantCat?.athlete?.user?.counrty),
        team: secondParticipantCat?.team,
      }

      return [firstaAthlete, secondAthlete]
    }
    return []
  }, [participantAthletes, fighters])

  const onWin = ({
    loserBracketFightIds,
    loserParticipantId,
    winnerBracketFightIds,
    curBFID,
    winnerId,
  }) => {
    const { winnerFighter, loserFighter } = (fighters || [])?.reduce(
      (prev, cur) => {
        if (cur?.id == winnerId) {
          prev.winnerFighter = cur
        } else if (cur?.id == loserParticipantId) {
          prev.loserFighter = cur
        }

        return prev
      },
      { winnerFighter: null, loserFighter: null },
    )

    dispatch(
      setBFOnWin({
        currentBFID: curBFID,
        winner: winnerFighter,
        winnerBFIDs: winnerBracketFightIds,
        loser: loserFighter,
        loserBFIDs: loserBracketFightIds,
      }),
    )
  }

  return (
    <CellWrapper
      className={`${parents?.length ? 'parents' : ''} ${borderDirection} ${classes || ''}`}
      style={gridTemplateAreas ? { gridArea: `cell-${id}` } : {}}
    >
      {/* <FightNum>
        FN:{fightNumber}, ID: {id}, CH: {children[0]}
      </FightNum> */}
      <FighterWrapper className='first'>
        {!!athletesInfo[0]?.athlete?.user?.avatar ? (
          <FighterAva src={athletesInfo[0]?.athlete?.user?.avatar} />
        ) : (
          <BracketsAthAva />
        )}
        <FighterTexts>
          <NameFlagWrapper>
            <CountryFlag src={`https://flagsapi.com/KG/flat/64.png`} />
            <FighterName>
              {athletesInfo[0]
                ? truncateString(
                    `${athletesInfo[0]?.athlete?.user?.firstName} ${athletesInfo[0]?.athlete?.user?.lastName}`,
                    12,
                    true,
                  )
                : '?'}
            </FighterName>
          </NameFlagWrapper>
          {athletesInfo[0] && athletesInfo[0]?.team && (
            <TeamName>{truncateString(athletesInfo[0]?.team?.name, 20, true)}</TeamName>
          )}
        </FighterTexts>
        {!disabled && fighters?.length === 2 && +fighters[1]?.id !== +winner && (
          <BracketWin
            bfId={id}
            fighter={fighters[0]?.id}
            winner={winner}
            onWin={onWin}
          />
        )}
      </FighterWrapper>
      <FighterWrapper className='second'>
        {!!athletesInfo[1]?.athlete?.user?.avatar ? (
          <FighterAva src={athletesInfo[1]?.athlete?.user?.avatar} />
        ) : (
          <BracketsAthAva />
        )}
        <FighterTexts>
          <NameFlagWrapper>
            <CountryFlag src={`https://flagsapi.com/KG/flat/64.png`} />
            <FighterName>
              {athletesInfo[1]
                ? truncateString(
                    `${athletesInfo[1]?.athlete?.user?.firstName} ${athletesInfo[1]?.athlete?.user?.lastName}`,
                    12,
                    true,
                  )
                : '?'}
            </FighterName>
          </NameFlagWrapper>
          {athletesInfo[1] && athletesInfo[1]?.team && (
            <TeamName>{truncateString(athletesInfo[1]?.team?.name, 20, true)}</TeamName>
          )}
        </FighterTexts>
        {!disabled && fighters?.length === 2 && +fighters[0]?.id !== +winner && (
          <BracketWin
            bfId={id}
            fighter={fighters[1]?.id}
            winner={winner}
            onWin={onWin}
          />
        )}
      </FighterWrapper>
      {/* {!!children?.length && <Children>{children[0]}</Children>} */}
    </CellWrapper>
  )
}

const FighterWrapper = styled.div`
  position: relative;
  min-height: 56px;
  width: 208px;
  background: #1b1c22;
  border: 1px solid #333333;
  display: flex;
  grid-gap: 8px;
  font-weight: 700;
  padding: 10px;
  z-index: 8;
  cursor: pointer;
  transform: translateY(-1px);

  &:hover {
    background-color: #0f0f10;
  }

  &.first {
    border-radius: 8px 8px 0 0;
    /* border-bottom: none; */
  }

  &.second {
    border-radius: 0 0 8px 8px;
    /* border-top: none; */
    border-bottom: 1px solid #333333;
  }
`

const CellWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: min-content min-content / 1fr;
  align-content: center;
  padding: 16px 0;

  &::after,
  &::before {
    content: '';
    height: 50%;
    position: absolute;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    border-top: 2px solid #333;
  }

  &.lineDown,
  &.lineUp,
  &.straight {
    &::after,
    &::before {
      width: calc(100% + 32px);
    }
  }

  &.parents {
    &::after,
    &::before {
      width: 224px;
      left: -32px;
    }

    &.lineDown,
    &.lineUp,
    &.straight {
      &::after,
      &::before {
        width: calc(100% + 64px);
        left: -32px;
      }
    }
  }

  &.lineDown {
    &::after {
      border-right: 2px solid #333;
    }
  }
  &.lineUp {
    &::before {
      border-right: 2px solid #333;
    }
  }

  &.noBorder::after,
  &.noBorder::before {
    width: 208px;
    height: 50%;
    left: 0;
  }
`

const FightNum = styled.div`
  /* width: 56px; */
  position: absolute;
  top: 50%;
  left: -28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  background: #0f0f10;
  /* #333333 */

  border: 1px solid #333333;
  border-radius: 60px;

  transform: translateY(-50%);
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  background: #000;
`

const FighterAva = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;

  background: no-repeat ${({ src }) => (src ? `url('${src}')` : '#333333')} center / cover;
`

const FighterTexts = styled.div`
  display: flex;
  flex-direction: column;
`

const FighterName = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #f2f2f2;
`

const NameFlagWrapper = styled.div`
  display: flex;
  grid-gap: 2px;
`

const TeamName = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #bdbdbd;
`

const CountryFlag = styled.img`
  max-width: 20px;
  object-fit: contain;
`

const Children = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
  background: #333;
  z-index: 1;
`
