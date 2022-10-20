import React from 'react'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'
import Link from 'next/link'
import { phoneFormatter } from '../../helpers/phoneFormatter'
import ULAccordion from '../ui/ULAccordion'

function ContactAccordion({ event }) {
  return (
    <ULAccordion title='Контакты'>
      <Wrapper>
        <ContactAccordionItems>
          <ContactIcon social={'kub'} />
          <ContactItemsText>
            {event?.contacts?.nameOrganization || 'Не известно'} {event?.typeSport}
          </ContactItemsText>
        </ContactAccordionItems>

        <ContactAccordionItems>
          <ContactIcon social={'user'} />
          <ContactItemsText>
            {event?.contacts?.firstName || event?.contacts?.lastName
              ? `${event?.contacts?.firstName || ''} ${event?.contacts?.lastName || ''}`
              : 'Не известно'}
          </ContactItemsText>
        </ContactAccordionItems>

        <ContactAccordionItems>
          <ContactIcon social={'email'} />
          <ContactItemsText>{event?.contacts?.email || 'Не известно'}</ContactItemsText>
        </ContactAccordionItems>

        {!!event?.contacts?.phoneNumber1 && (
          <ContactAccordionItems>
            <ContactIcon social={'phone'} />
            <ContactItemsText>
              {phoneFormatter(event?.contacts?.phoneNumber1 || 'Не известно')}
            </ContactItemsText>
          </ContactAccordionItems>
        )}

        {!!event?.contacts?.facebook && (
          <ContactAccordionItems>
            <ContactIcon social={'facebook'} />
            <ContactItemsText>
              <Link href={`${event?.contacts?.facebook}`} target={'_blank'}>
                Facebook
              </Link>
            </ContactItemsText>
          </ContactAccordionItems>
        )}
      </Wrapper>
    </ULAccordion>
  )
}

export default ContactAccordion

const ContactItemsText = styled(Typography)`
  justify-self: flex-start;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`

const ContactAccordionItems = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  justify-items: center;
  grid-column-gap: 12px;
  align-items: flex-start;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 16px 8px !important;
`

const ContactIcon = ({ social }) => {
  return (
    <>
      {social === 'kub' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.67505 19.3395L6.67505 17.1967C5.8539 16.6101 5.44333 16.3169 5.22166 15.8861C5 15.4554 5 14.9508 5 13.9417V10.0587C5 9.73732 5 9.46714 5.00716 9.23422L11 13.5148V20.2315C10.6433 20.0311 10.227 19.7338 9.67505 19.3395ZM13 20.2315C13.3567 20.0311 13.773 19.7338 14.325 19.3395L17.325 17.1967C18.1461 16.6101 18.5567 16.3169 18.7783 15.8861C19 15.4554 19 14.9508 19 13.9417V10.0587C19 9.73732 19 9.46714 18.9928 9.23422L13 13.5148V20.2315ZM18.1276 7.39447L12 11.7713L5.87244 7.39447C6.08372 7.22611 6.34653 7.03839 6.67505 6.80374L9.67505 4.66088C10.7977 3.85897 11.3591 3.45801 12 3.45801C12.6409 3.45801 13.2023 3.85897 14.325 4.66088L17.325 6.80374C17.6535 7.03839 17.9163 7.22611 18.1276 7.39447Z'
            fill='#BDBDBD'
          />
        </svg>
      )}

      {social === 'user' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.6518 20.4054C20.2046 20.2902 20.5338 19.7117 20.2591 19.2183C19.6535 18.1307 18.6995 17.1749 17.4791 16.4465C15.9073 15.5085 13.9814 15 12.0002 15C10.019 15 8.09316 15.5085 6.52137 16.4465C5.30093 17.1749 4.34691 18.1307 3.74132 19.2183C3.46663 19.7117 3.79586 20.2902 4.34868 20.4054C9.39549 21.4572 14.6049 21.4572 19.6518 20.4054Z'
            fill='#BDBDBD'
          />
          <path
            d='M17.0002 8C17.0002 10.7614 14.7616 13 12.0002 13C9.23879 13 7.00022 10.7614 7.00022 8C7.00022 5.23858 9.23879 3 12.0002 3C14.7616 3 17.0002 5.23858 17.0002 8Z'
            fill='#BDBDBD'
          />
        </svg>
      )}

      {social === 'email' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.87868 5.87868C3 6.75736 3 8.17157 3 11V13C3 15.8284 3 17.2426 3.87868 18.1213C4.75736 19 6.17157 19 9 19H15C17.8284 19 19.2426 19 20.1213 18.1213C21 17.2426 21 15.8284 21 13V11C21 8.17157 21 6.75736 20.1213 5.87868C19.2426 5 17.8284 5 15 5H9C6.17157 5 4.75736 5 3.87868 5.87868ZM6.5547 8.16795C6.09517 7.8616 5.4743 7.98577 5.16795 8.4453C4.8616 8.90483 4.98577 9.5257 5.4453 9.83205L10.8906 13.4622C11.5624 13.9101 12.4376 13.9101 13.1094 13.4622L18.5547 9.83205C19.0142 9.5257 19.1384 8.90483 18.8321 8.4453C18.5257 7.98577 17.9048 7.8616 17.4453 8.16795L12 11.7982L6.5547 8.16795Z'
            fill='#BDBDBD'
          />
        </svg>
      )}

      {social === 'phone' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z'
            fill='#BDBDBD'
          />
        </svg>
      )}

      {social === 'facebook' && (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22 12.0622C22 6.50777 17.5201 2 12 2C6.47992 2 2 6.50777 2 12.0622C2 17.0881 5.65602 21.2539 10.4449 22V14.9637H7.89083V12.0622H10.4449V9.84456C10.4449 7.32643 11.9279 5.92746 14.2142 5.92746C15.3059 5.92746 16.4387 6.13471 16.4387 6.13471V8.59067H15.1823C13.9361 8.59067 13.5448 9.37824 13.5448 10.1658V12.0518H16.3254L15.8826 14.9534H13.5448V21.9896C18.344 21.2539 22 17.0881 22 12.0622Z'
            fill='#1877F2'
          />
        </svg>
      )}
    </>
  )
}
