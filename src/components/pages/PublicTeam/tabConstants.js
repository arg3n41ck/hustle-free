import { ProfileIcon, AthletesIcon, StatisticsIcon } from '../../../assets/svg/icons'

export const teamProfileTabs = (teamId) => [
  {
    name: 'profile',
    role: 'public.team',
    href: `/team/${teamId}`,
    asPath: '/team/[id]',
    icon: <ProfileIcon style={{ width: 32, height: 32 }} />,
  },
  {
    name: 'athletes',
    role: 'public.team',
    href: `/team/${teamId}/athletes`,
    asPath: '/team/[id]/athletes',
    icon: <AthletesIcon style={{ width: 32, height: 32 }} />,
  },
  {
    name: 'statistic',
    role: 'public.team',
    href: `/team/${teamId}/statistics`,
    asPath: '/team/[id]/statistics',
    icon: <StatisticsIcon style={{ width: 32, height: 32 }} />,
  },
]
