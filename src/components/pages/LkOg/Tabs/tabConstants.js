import ProfileIcon from "../../../../public/svg/profile-icon.svg"
import MyTournamentsIcon from "../../../../public/svg/my-tournaments-icon.svg"
import SettingsIcon from "../../../../public/svg/settings.svg"
import ExitIcon from "../../../../public/svg/exit-icon.svg"

export const lkOgTabs = [
  {
    name: "Профиль",
    icon: <ProfileIcon />,
    href: "/lk-og/profile",
    children: ["/lk-og/profile/edit"],
  },
  {
    name: "Мои турниры",
    icon: <MyTournamentsIcon />,
    href: "/lk-og/profile/events",
    children: ["/lk-og/profile/events/edit"],
  },
  {
    name: "Настройки",
    icon: <SettingsIcon />,
    href: "/lk-og/profile/settings",
  },
]
