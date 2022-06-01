import { ProfileIcon } from "../../../../assets/svg/icons"
import { BigCalendarIcon } from "../../../../assets/svg/icons"
import { SettingsIcon } from "../../../../assets/svg/icons"

export const lkOgTabs = [
  {
    name: "profile",
    icon: <ProfileIcon />,
    href: "/lk-og/profile",
    children: ["/lk-og/profile/edit"],
  },
  {
    name: "events",
    icon: <BigCalendarIcon />,
    href: "/lk-og/profile/events",
    children: ["/lk-og/profile/events/edit"],
  },
  {
    name: "settings",
    icon: <SettingsIcon />,
    href: "/lk-og/profile/",
  },
]
