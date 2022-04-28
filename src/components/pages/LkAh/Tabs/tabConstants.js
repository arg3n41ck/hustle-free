import ExitIcon from "../../../../public/svg/exit-icon.svg"
import ProfileIcon from "../../../../public/svg/profile-icon.svg"
import MyTournamentsIcon from "../../../../public/svg/my-tournaments-icon.svg"
import SettingsIcon from "../../../../public/svg/settings.svg"

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
