import ExitIcon from "../../../../public/svg/exit-icon.svg"
import SettingsIcon from "../../../../public/svg/settings.svg"
import ProfileIcon from "../../../../public/svg/profile-icon.svg"
import AthletesIcon from "../../../../public/svg/users.svg"
import StatisticsIcon from "../../../../public/svg/statistics.svg"

export const lkTmTabs = [
  {
    name: "Профиль",
    value: "profile",
    icon: <ProfileIcon />,
  },
  {
    name: "Атлеты",
    value: "athletes",
    icon: <AthletesIcon />,
  },
  {
    name: "Статистика",
    value: "statistics",
    icon: <StatisticsIcon />,
  },
  {
    name: "Настройки",
    value: "settings",
    icon: <SettingsIcon />,
  },
  {
    name: "Выйти",
    value: "exit",
    icon: <ExitIcon />,
  },
]
