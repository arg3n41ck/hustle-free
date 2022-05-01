import React from "react"
import EventMainInfo from "./EventMainInfo"
import styled from "styled-components"

function Event({ event }) {
  return (
    <MainWrapper>
      <EventMainInfo event={event} />
      <Title>Описание</Title>
      <Columns>
        <Column>{event.description}</Column>
        <Column>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, vero!
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias
            aperiam corporis culpa eos est eveniet <br /> ex, expedita explicabo
            facere hic impedit incidunt iste iure iusto labore laboriosam
            laborum magnam magni maiores molestiae nemo, obcaecati officia omnis
            quae quam, quis sapiente sint voluptas voluptates. <br /> A deleniti
            dicta dolorum error ex exercitationem explicabo ipsa laboriosam
            nesciunt numquam, officia optio praesentium voluptatum. A delectus
            dolorem quaerat. Doloremque, ex quod? Ad amet animi delectus
            deleniti eum ex impedit modi omnis reiciendis voluptate! Amet
            consequatur eligendi ex id ipsum modi molestias nemo officia rerum.
            Atque eaque, eligendi facilis iste libero magnam rem tempora
            veritatis.
          </p>
        </Column>
      </Columns>
    </MainWrapper>
  )
}

export { Event }

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
`

const Columns = styled.div`
  display: grid;
  grid-template: 1fr / 2fr 1fr;
  grid-column-gap: 32px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;

  border-right: 1px solid #333;

  &:first-child {
    padding: 0 32px 0 0;
  }

  &:last-child {
    border-right: none;
    grid-gap: 24px;

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      color: #828282;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
