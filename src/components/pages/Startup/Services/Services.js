import React from "react"
import styled from "styled-components"
import ServiceItem from "./ServiceItem"

const Services = ({
  services,
  onViewToggle,
  makeFavorite,
  updateServices,
  removeFromFavorites,
}) => {
  if (!services?.length)
    return (
      <h1 style={{ textAlign: "center", marginTop: "10vh" }}>Услуги пусты!</h1>
    )

  return (
    <Wrapper>
      {services.map((service) => (
        <ServiceItem
          key={service.id}
          onViewToggle={onViewToggle}
          service={service}
          makeFavorite={makeFavorite}
          updateServices={updateServices}
          removeFromFavorites={removeFromFavorites}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 30px;
`

export default Services
