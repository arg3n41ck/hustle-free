import React, { useState } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { changeChangeServiceId } from "../../../../redux/components/startups"
import sliceText from "../../../../helpers/sliceText"

const ServiceItem = ({
  service,
  onViewToggle,
  makeFavorite,
  removeFromFavorites,
  updateServices,
}) => {
  const [isFavorite, setIsFavorite] = useState(!!service?.favorite || false)
  const dispatch = useDispatch()

  const changeClickHandler = () => {
    dispatch(changeChangeServiceId(service.id))
    onViewToggle()
  }

  const handleClickFav = () => {
    isFavorite
      ? removeFromFavorites(service.favorite.favID)
      : makeFavorite(service.id)
    updateServices()
    setIsFavorite(!isFavorite)
  }

  return (
    <Wrapper>
      <Header>
        <Link
          href={`/profile/startups/details/service/${service.id}/`}
          passHref
        >
          <a>
            <Title>{sliceText(service.title, 50)}</Title>
          </a>
        </Link>
        <InfoChange onClick={changeClickHandler}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.2038 10.7962L18.9998 9.00019C19.545 8.45494 19.8176 8.18231 19.9634 7.88822C20.2407 7.32866 20.2407 6.67171 19.9634 6.11215C19.8176 5.81806 19.545 5.54544 18.9998 5.00019C18.4545 4.45494 18.1819 4.18231 17.8878 4.03658C17.3282 3.75929 16.6713 3.75929 16.1117 4.03658C15.8176 4.18231 15.545 4.45494 14.9998 5.00019L13.1811 6.81884C14.145 8.46944 15.5311 9.845 17.2038 10.7962ZM11.7267 8.2733L4.85615 15.1438C4.43109 15.5689 4.21856 15.7814 4.07883 16.0425C3.93909 16.3036 3.88015 16.5983 3.76226 17.1878L3.14686 20.2648C3.08034 20.5974 3.04708 20.7637 3.14168 20.8583C3.23629 20.9529 3.4026 20.9196 3.73521 20.8531L6.81219 20.2377C7.40164 20.1198 7.69637 20.0609 7.95746 19.9211C8.21856 19.7814 8.43109 19.5689 8.85615 19.1438L15.7456 12.2544C14.1239 11.2388 12.7522 9.87646 11.7267 8.2733Z"
              fill="#828282"
            />
          </svg>
          <p>Редактировать</p>
        </InfoChange>
      </Header>
      <Price>
        {service?.priceFrom && <p>от {Math.floor(+service.priceFrom)} ₸</p>}
        {!!service?.priceFrom && !!service?.priceTo && (
          <p style={{ margin: "0 5px" }}>{" - "}</p>
        )}
        {service?.priceTo && <p> до {Math.floor(+service.priceTo)} ₸</p>}
      </Price>
      <Description>{`${service.description}`}</Description>
      <Condition>{service.condition}</Condition>
      <ActionsWrapper>
        <CountView>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.771 12C20.771 11.6412 20.5769 11.4056 20.1888 10.9343C18.7687 9.21014 15.6365 6 12.0007 6C8.36501 6 5.2328 9.21014 3.81271 10.9343C3.42455 11.4056 3.23047 11.6412 3.23047 12C3.23047 12.3588 3.42455 12.5944 3.81271 13.0657C5.2328 14.7899 8.36501 18 12.0007 18C15.6365 18 18.7687 14.7899 20.1888 13.0657C20.5769 12.5944 20.771 12.3588 20.771 12ZM12.0007 15C13.6576 15 15.0007 13.6569 15.0007 12C15.0007 10.3431 13.6576 9 12.0007 9C10.3439 9 9.00075 10.3431 9.00075 12C9.00075 13.6569 10.3439 15 12.0007 15Z"
              fill="#828282"
            />
          </svg>
          <Count>{service.views}</Count>
        </CountView>
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClickFav}
        >
          <path
            d="M1 7C1 4.17157 1 2.75736 1.87868 1.87868C2.75736 1 4.17157 1 7 1H11C13.8284 1 15.2426 1 16.1213 1.87868C17 2.75736 17 4.17157 17 7V13.8276C17 16.5109 17 17.8525 16.1557 18.2629C15.3114 18.6733 14.2565 17.8444 12.1465 16.1866L11.4713 15.656C10.2849 14.7239 9.69173 14.2578 9 14.2578C8.30827 14.2578 7.71509 14.7239 6.52871 15.656L5.85346 16.1866C3.74355 17.8444 2.68859 18.6733 1.84429 18.2629C1 17.8525 1 16.5109 1 13.8276V7Z"
            fill={isFavorite ? "#27AE60" : "transparent"}
            stroke={isFavorite ? "#27AE60" : "#BDBDBD"}
            strokeWidth="2"
          />
        </svg>
      </ActionsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 32px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 16px;
  &:last-child {
    border-bottom-width: 0;
  }
  word-break: break-all;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #333333;
  padding: 0 10px 0 0;
`
const InfoChange = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0 8px;
    font-family: Inter, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`
const Price = styled.div`
  display: flex;
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #27ae60;
  }
`
const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`
const Condition = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  margin: 0 0 8px;
`
const CountView = styled.div`
  display: flex;
  align-items: center;
`
const Count = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  margin-left: 5px;
`
const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`

export default ServiceItem
