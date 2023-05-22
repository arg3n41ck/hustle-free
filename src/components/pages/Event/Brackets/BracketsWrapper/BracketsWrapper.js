import React from 'react'
import Filters from './Filters'
import HorizontalTabsBorder from '../../../../ui/tabs/HorizontalTabsBorder'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const bracketsTabs = [
  {
    name: 'Сетки',
    value: `/events/[id]/brackets`,
  },
  {
    name: 'Текущие схватки',
    value: `/events/[id]/brackets/current-fighting`,
  },
]

export default function BracketsWrapper({ children }) {
  const {
    query: { id: eventId },
    pathname,
    push: routerPush,
  } = useRouter()

  const handleTabChanging = (tab) => {
    if (tab) {
      routerPush(tab.replace('[id]', eventId))
    }
  }

  return (
    <div>
      <Filters />
      <HorizontalTabsBorder
        arrayTab={bracketsTabs}
        valueTab={pathname}
        onChangeHandler={handleTabChanging}
        height={'96px'}
      >
        <TabsInnerWrapper>{children}</TabsInnerWrapper>
      </HorizontalTabsBorder>
    </div>
  )
}

const TabsInnerWrapper = styled.div`
  padding: 48px 0 0 0;
`
