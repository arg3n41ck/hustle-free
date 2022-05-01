import ExitIcon from "../../../../public/svg/exit-icon.svg"
import SettingsIcon from "../../../../public/svg/settings.svg"
import ProfileIcon from "../../../../public/svg/profile-icon.svg"
import AthletesIcon from "../../../../public/svg/users.svg"
import StatisticsIcon from "../../../../public/svg/statistics.svg"

export const lkTmTabs = [
  {
    name: "Профиль",
    href: "/lk-tm/profile",
    icon: <ProfileIcon />,
  },
  {
    name: "Атлеты",
    href: "/lk-tm/profile/athletes",
    icon: <AthletesIcon />,
  },
  {
    name: "Статистика",
    href: "/lk-tm/profile/statistics",
    icon: <StatisticsIcon />,
  },
  {
    name: "Настройки",
    href: "/lk-tm/profile/",
    icon: <SettingsIcon />,
  },
]
