import ExitIcon from "../../../../public/svg/exit-icon.svg"
import ProfileIcon from "../../../../public/svg/profile-icon.svg"
import MyTournamentsIcon from "../../../../public/svg/my-tournaments-icon.svg"
import SettingsIcon from "../../../../public/svg/settings.svg"
import TeamsIcon from "../../../../public/svg/MyTeams.svg"
import StoriesIcon from "../../../../public/svg/MyStories.svg"

export const lkAhTabs = [
  {
    name: "Профиль",
    icon: <ProfileIcon />,
    href: "/lk-ah/profile",
    children: ["/lk-ah/profile/edit"],
  },
  {
    name: "Мои турниры",
    icon: <MyTournamentsIcon />,
    href: "/lk-ah/profile/events",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "Моя история",
    icon: <StoriesIcon />,
    href: "/lk-ah/profile/stories",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "Мои команды",
    icon: <TeamsIcon />,
    href: "/lk-ah/profile/teams",
    children: ["/lk-ah/profile/events/create"],
  },
  {
    name: "Настройки",
    icon: <SettingsIcon />,
    href: "/lk-ah/profile/settings",
  },
  {
    name: "Выйти",
    href: "exit",
    icon: <ExitIcon />,
  },
  
]
