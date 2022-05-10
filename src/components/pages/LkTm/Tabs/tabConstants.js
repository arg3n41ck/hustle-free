import SettingsIcon from "../../../../assets/svg/settings.svg"
import ProfileIcon from "../../../../assets/svg/profile-icon.svg"
import AthletesIcon from "../../../../assets/svg/users.svg"
import StatisticsIcon from "../../../../assets/svg/statistics.svg"

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
