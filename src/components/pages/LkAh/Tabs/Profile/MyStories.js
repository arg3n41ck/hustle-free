import React from "react"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import HorizontalTabsBorder from "../../../../ui/tabs/HorizontalTabsBorder"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAthleteStories,
  storiesSelector,
} from "../../../../../redux/components/stories"
import FilterMyStories from "./Stories/FilterMyStories"

const tabs = [
  {
    id: 1,
    name: "Все",
    value: "all",
  },
  {
    id: 2,
    name: "Победы",
    value: "wins",
  },
  {
    id: 3,
    name: "Ничьи",
    value: "draws",
  },
  {
    id: 4,
    name: "Поражений",
    value: "defeats",
  },
]

function MyStories({ onToggleSidebar }) {
  const [view, setView] = React.useState("all") // all | wins | draws | defeats
  const dispatch = useDispatch()
  const [athleteStories] = useSelector(storiesSelector)

  React.useEffect(() => {
    dispatch(fetchAthleteStories("all"))
  }, [])

  const viewHandler = (value) => setView(value)

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>Моя история</TitleHeader>
      </LkDefaultHeader>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={viewHandler}
        height={"96px"}
      >
        {!!athleteStories?.length &&
          athleteStories.map((item) => <FilterMyStories data={item} />)}
      </HorizontalTabsBorder>
    </div>
  )
}

export default MyStories
