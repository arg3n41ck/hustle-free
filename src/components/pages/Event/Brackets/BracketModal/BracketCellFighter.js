import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BracketsAthAva } from '../../../../../assets/svg/icons'
import { truncateString } from '../../../../../helpers/helpers'
import { getFighterPlace } from './bracketsUtils'
import BracketWin from './BracketWin'

export default function BracketCellFighter({ cell, fighter, onWin, opponent, orientation }) {
  const { id, fighters, winner, disabled, fightNumber, place: cellPlace } = cell
  const bracket = useSelector((state) => state.brackets.bracket)
  const fighterPlace = useMemo(() => {
    return getFighterPlace({
      bracketType: bracket?.bracketType,
      fightNumber,
      winner,
      cellPlace,
      fighter: fighter?.id,
      fighters,
    })
  }, [fighters, winner, id, fighter])

  return (
    <FighterWrapper className={orientation}>
      <UserInfoPart disabled={!!winner || disabled}>
        {!!fighter?.athlete?.user?.avatar ? (
          <FighterAva src={fighter?.athlete?.user?.avatar} />
        ) : (
          <BracketsAthAva />
        )}
        <FighterTexts>
          <NameFlagWrapper>
            <CountryFlag src={`https://flagsapi.com/KG/flat/64.png`} />
            <FighterName>
              {fighter
                ? truncateString(
                    `${fighter?.athlete?.user?.firstName} ${fighter?.athlete?.user?.lastName}`,
                    12,
                    true,
                  )
                : '?'}
            </FighterName>
          </NameFlagWrapper>
          {fighter && fighter?.team && (
            <TeamName>{truncateString(fighter?.team?.name, 20, true)}</TeamName>
          )}
        </FighterTexts>
      </UserInfoPart>
      {fighterPlace && <PlaceBlock place={fighterPlace}>{fighterPlace}</PlaceBlock>}
      {!disabled && !!fighter && fighters?.length === 2 && opponent !== winner && (
        <BracketWin bfId={id} fighter={fighter.id} winner={winner} onWin={onWin} />
      )}
    </FighterWrapper>
  )
}

const FighterWrapper = styled.div`
  position: relative;
  min-height: 56px;
  width: 208px;
  background: #1b1c22;
  border: 1px solid #333333;
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

const UserInfoPart = styled.div`
  display: flex;
  grid-gap: 8px;
  font-weight: 700;
  padding: 10px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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

const PlaceBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  gap: 8px;

  position: absolute;
  top: 50%;
  right: -45px;

  transform: translateY(-50%);

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  color: #ffffff;
  background: ${({ place }) =>
    place == 1
      ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #faa318'
      : place == 2
      ? '#A0A0A0'
      : place == 3 && '#9B5711'};

  border: 1px solid #333333;
  border-radius: 7px;
  overflow: hidden;
`
