import React, { useEffect, useState } from "react"
import styled from "styled-components"
import $api from "../../../../services/axios"
import { format, parseISO } from "date-fns"
import { ru } from "date-fns/locale"
import LogoTest from "../../../../public/png/logo.png"
import Image from "next/image"
import { toast } from "react-toastify"

const sendActivities = async (_data) => {
  try {
    const { data } = await $api.post(`/startup/activities/`, _data)
    return data
  } catch (e) {
    return e
  }
}

const getActivities = async (id) => {
  try {
    const { data } = await $api.get(`/startup/activities/?startup=${id}`)
    return data.results
  } catch (e) {
    return e
  }
}

const Activity = ({ startup }) => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [activities, setActivities] = useState([])
  const { id, logo, title } = startup

  const updateActivities = () => {
    getActivities(id).then((res) => setActivities(res))
  }

  useEffect(() => {
    updateActivities()
  }, [])

  return (
    <WrapperBlock>
      <HeaderInfo>
        <HeaderText>Активность </HeaderText>
      </HeaderInfo>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!!text.replace(/\s/g, "")) {
            sendActivities({ startup: id, text }).then(() => {
              setText("")
              updateActivities()
            })
          } else {
            toast.error("Заполните поле правильно!")
            setError("Заполните поле")
            setText("")
          }
        }}
      >
        <HeaderInfoBlock>
          <LogoBlock>
            <Image
              src={logo ? logo : LogoTest}
              width={56}
              height={56}
              objectFit={"cover"}
            />
          </LogoBlock>
          <HeaderContent>
            <h2>{title}</h2>
          </HeaderContent>
        </HeaderInfoBlock>
        <FieldWrapper>
          <InputMess
            onChange={(e) => setText(e.target.value)}
            error={error}
            value={text}
            placeholder={"Что у вас нового?"}
            type="text"
          />
          {error && <ErrorText>{error}</ErrorText>}
        </FieldWrapper>
        <Submit>
          <AddButton>Опубликовать</AddButton>
        </Submit>
      </form>
      <ActivitiesWrapper>
        {!!activities?.length &&
          activities.map((activity) => (
            <Comment id={activity.id}>
              <HeaderInfoBlock>
                <LogoBlock>
                  <Image
                    src={logo ? logo : LogoTest}
                    width={56}
                    height={56}
                    objectFit={"cover"}
                  />
                </LogoBlock>
                <HeaderContent>
                  <h2>{title}</h2>
                  <p>
                    {format(parseISO(activity.createAt), "dd MMM в H:m", {
                      locale: ru,
                    })}
                  </p>
                </HeaderContent>
              </HeaderInfoBlock>
              <Message>{activity.text}</Message>
            </Comment>
          ))}
        {/*<HR />*/}
      </ActivitiesWrapper>
    </WrapperBlock>
  )
}

const WrapperBlock = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
`
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`
const HeaderInfoBlock = styled.div`
  display: flex;
  align-items: center;
`
const HeaderText = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const AddButton = styled.button`
  width: min-content;
  background-color: rgba(111, 207, 151, 0.1);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
  svg {
    margin-right: 9px;
  }
  &:hover {
    background: #27ae60;
    color: #fff;
    transition: 0.4s;
    svg * {
      stroke: #fff;
      transition: 0.4s;
    } 
`
const LogoBlock = styled.div`
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;
  width: 56px;
  height: 56px;
`

const ActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
`

const HeaderContent = styled.div`
  width: 70%;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
  }
`

const FieldWrapper = styled.div`
  margin: 26px 0 34px 0;
`

const InputMess = styled.input`
  width: 100%;
  height: auto;
  padding: 19px;
  border: 1px solid ${({ error }) => (error ? "#d32f2f" : "#e5e5e5")};
  border-radius: 12px;
  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    color: #bdbdbd;
  }
`

const ErrorText = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin: 3px 14px 0;
`

const Message = styled.p`
  margin-top: 26px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #333333;
`

const Comment = styled.div`
  padding: 0 0 24px 0;
  border-bottom: 1px solid #e5e5e5;
  &:last-child {
    border-bottom: none;
  }
`

const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default Activity
