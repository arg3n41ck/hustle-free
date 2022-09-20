import { useTranslation } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

function Footer() {
  const { t: tFooter } = useTranslation('footer')

  return (
    <FooterMainWrapper>
      <FooterIcon />
      <a href='/privacy_policy.pdf' target='_blank' rel='noreferrer'>
        <p>{tFooter('footer.privacyPolicy')}</p>
      </a>
      <p>{tFooter('footer.termsOfUse')}</p>
      <Social>
        <p>{tFooter('footer.aboutUs')}</p>
        <Icons>
          {/* <a
            href='https://www.facebook.com/people/Hustlefree/100083460815684/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Facebook />
          </a> */}

          <a
            href='https://youtube.com/channel/UCLDTo8Ymc9XyNoxL2Eyll-g'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Youtube />
          </a>

          <a href='https://t.me/hustlefreechannel' target='_blank' rel='noreferrer noopener'>
            <Telega />
          </a>

          <a
            href='https://instagram.com/hustlefree.pro?igshid=YmMyMTA2M2Y='
            target='_blank'
            rel='noreferrer noopener'
          >
            <Insta />
          </a>
        </Icons>
      </Social>
      <Copyright>Copyright © 2022. Hustle Free. All rights reserved.</Copyright>
    </FooterMainWrapper>
  )
}

export default Footer

const FooterMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 16px;
  margin: 48px 0 0;
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
  }
`

const Copyright = styled.div`
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0 0;
  border-top: 1px solid #333;
  color: #828282;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  mix-blend-mode: normal;
  opacity: 0.5;
`

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${theme.mqMax('md')} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`
const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-gap: 16px;
`

const FooterIcon = () => (
  <svg width='230' height='37' viewBox='0 0 230 37' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.64098 34.6038L4.603 31.086C2.34651 29.5104 1.21826 28.7226 0.609132 27.5655C0 26.4084 0 25.053 0 22.3422V15.4929C0 14.6296 0 13.9038 0.0196709 13.2781L13.2819 22.5386V37C12.3016 36.4616 11.1577 35.6629 9.64098 34.6038Z'
      fill='#828282'
    />
    <path
      d='M18.7779 37C19.7583 36.4616 20.9021 35.6629 22.4189 34.6038L27.4568 31.086C29.7133 29.5104 30.8416 28.7226 31.4507 27.5655C32.0598 26.4084 32.0598 25.053 32.0598 22.3422V15.4929C32.0598 14.6296 32.0598 13.9038 32.0402 13.2781L18.7779 22.5386V37Z'
      fill='#828282'
    />
    <path
      d='M29.6624 8.33599L16.0299 17.8549L2.39746 8.33599C2.97806 7.88372 3.70024 7.37946 4.603 6.7491L9.64098 3.2313C12.7261 1.0771 14.2687 0 16.0299 0C17.7912 0 19.3337 1.0771 22.4189 3.23129L27.4568 6.74909C28.3596 7.37946 29.0818 7.88372 29.6624 8.33599Z'
      fill='#828282'
    />
    <path
      d='M95.9301 13.0909C96.3751 13.4621 96.6241 13.9792 96.6773 14.642H101.977C101.97 13.3097 101.638 12.1463 100.981 11.152C100.33 10.151 99.4035 9.37547 98.2014 8.82528C96.9994 8.27509 95.5748 8 93.9278 8C92.314 8 90.8828 8.27178 89.6343 8.81534C88.3924 9.3589 87.4195 10.1179 86.7155 11.0923C86.0182 12.0601 85.6728 13.1903 85.6795 14.483C85.6728 16.0739 86.1875 17.33 87.2235 18.2514C88.2662 19.1662 89.6907 19.8191 91.4971 20.2102L93.5294 20.6477C94.2864 20.8134 94.8875 20.9924 95.3324 21.1847C95.7774 21.3703 96.0962 21.5824 96.2888 21.821C96.488 22.053 96.5909 22.3248 96.5976 22.6364C96.5909 22.9678 96.4847 23.2628 96.2788 23.5213C96.0729 23.7798 95.7707 23.982 95.3723 24.1278C94.9738 24.2737 94.479 24.3466 93.888 24.3466C93.184 24.3466 92.5763 24.2372 92.065 24.0185C91.5602 23.7997 91.1684 23.4782 90.8895 23.054C90.6105 22.6297 90.4545 22.1061 90.4213 21.483H85.1615C85.1681 23.1866 85.5334 24.5852 86.2572 25.679C86.9878 26.7661 88.0105 27.5715 89.3255 28.0952C90.6471 28.6188 92.1945 28.8807 93.9677 28.8807C95.6944 28.8807 97.172 28.6387 98.4007 28.1548C99.6359 27.6709 100.586 26.965 101.25 26.0369C101.914 25.1089 102.249 23.9754 102.256 22.6364C102.249 21.8608 102.123 21.1449 101.877 20.4886C101.638 19.8324 101.263 19.2424 100.752 18.7188C100.24 18.1884 99.5828 17.7277 98.7792 17.3366C97.9756 16.9455 97.0093 16.6307 95.8803 16.392L94.2067 16.0341C93.7219 15.9347 93.3035 15.822 92.9516 15.696C92.5996 15.5701 92.3107 15.4309 92.0849 15.2784C91.8591 15.1193 91.6931 14.9437 91.5868 14.7514C91.4872 14.5526 91.444 14.3305 91.4573 14.0852C91.4639 13.7869 91.5536 13.5218 91.7263 13.2898C91.8989 13.0578 92.1646 12.8755 92.5232 12.7429C92.8885 12.6037 93.3567 12.5341 93.9278 12.5341C94.8244 12.5341 95.4918 12.7197 95.9301 13.0909Z'
      fill='#828282'
    />
    <path
      d='M44.3954 8.27841V28.642H49.9341V20.6875H57.266V28.642H62.8047V8.27841H57.266V16.233H49.9341V8.27841H44.3954Z'
      fill='#828282'
    />
    <path
      d='M197.846 8.27856V28.6422H212.51V24.1877H203.385V20.6877H211.792V16.2331H203.385V12.7331H212.549V8.27856H197.846Z'
      fill='#828282'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M179.034 28.6456V8.28198H187.841C189.355 8.28198 190.68 8.55708 191.815 9.10727C192.951 9.65746 193.834 10.4496 194.465 11.4837C195.096 12.5178 195.412 13.7574 195.412 15.2024C195.412 16.6608 195.086 17.8904 194.435 18.8914C193.834 19.8256 193.004 20.5463 191.946 21.0532L196.089 28.6456H190.072L186.49 21.924H184.573V28.6456H179.034ZM184.573 12.6968V17.6286H186.526C187.176 17.6286 187.731 17.549 188.189 17.3899C188.654 17.2242 189.009 16.9624 189.255 16.6044C189.508 16.2465 189.634 15.7791 189.634 15.2024C189.634 14.6191 189.508 14.1451 189.255 13.7806C189.009 13.4094 188.654 13.1376 188.189 12.9652C187.731 12.7862 187.176 12.6968 186.526 12.6968H184.573Z'
      fill='#828282'
    />
    <path
      d='M215.296 28.6422V8.27856H230V12.7331H220.835V16.2331H229.243V20.6877H220.835V24.1877H229.96V28.6422H215.296Z'
      fill='#828282'
    />
    <path
      d='M77.5083 8.27841H83.0471V21.3239C83.0471 22.875 82.6752 24.2173 81.9314 25.3509C81.1942 26.4777 80.1648 27.3494 78.8432 27.9659C77.5216 28.5758 75.9875 28.8807 74.2409 28.8807C72.4809 28.8807 70.9402 28.5758 69.6186 27.9659C68.297 27.3494 67.2676 26.4777 66.5304 25.3509C65.7999 24.2173 65.4346 22.875 65.4346 21.3239V8.27841H70.9734V20.8466C70.9734 21.4763 71.1129 22.0398 71.3918 22.5369C71.6707 23.0275 72.0559 23.4119 72.5474 23.6903C73.0454 23.9688 73.6099 24.108 74.2409 24.108C74.8784 24.108 75.4429 23.9688 75.9344 23.6903C76.4258 23.4119 76.811 23.0275 77.0899 22.5369C77.3689 22.0398 77.5083 21.4763 77.5083 20.8466V8.27841Z'
      fill='#828282'
    />
    <path
      d='M103.805 12.733V8.27841H121.537V12.733H115.4V28.642H109.941V12.733H103.805Z'
      fill='#828282'
    />
    <path d='M123.621 8.27841V28.642H137.408V24.1875H129.16V8.27841H123.621Z' fill='#828282' />
    <path
      d='M139.647 28.642V8.27841H154.351V12.733H145.186V16.233H153.594V20.6875H145.186V24.1875H154.311V28.642H139.647Z'
      fill='#828282'
    />
    <path
      d='M162.686 8.27841V28.642H168.225V20.6875H176.155V16.233H168.225V12.733H177.031V8.27841H162.686Z'
      fill='#828282'
    />
  </svg>
)

const Facebook = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M14.1116 4.29509H15.9233V1.13974C15.6107 1.09674 14.5358 1 13.2839 1C10.6718 1 8.88248 2.643 8.88248 5.66274V8.44186H6V11.9693H8.88248V20.845H12.4165V11.9701H15.1824L15.6215 8.44269H12.4157V6.01251C12.4165 4.99297 12.6911 4.29509 14.1116 4.29509Z'
      fill='#828282'
    />
  </svg>
)

const Youtube = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21.54 5.70579C21.2865 4.75863 20.5421 4.01431 19.595 3.76077C17.88 3.30078 11 3.30078 11 3.30078C11 3.30078 4.12002 3.30078 2.405 3.76077C1.45785 4.01431 0.713533 4.75863 0.459994 5.70579C1.7271e-07 7.4208 0 11.0011 0 11.0011C0 11.0011 1.7271e-07 14.5815 0.459994 16.2965C0.713533 17.2437 1.45785 17.988 2.405 18.2415C4.12002 18.7015 11 18.7015 11 18.7015C11 18.7015 17.88 18.7015 19.595 18.2415C20.5421 17.988 21.2865 17.2437 21.54 16.2965C22 14.5815 22 11.0011 22 11.0011C22 11.0011 21.9982 7.4208 21.54 5.70579ZM8.79783 14.3008V7.6997L14.5133 10.9993L8.79783 14.3008Z'
      fill='#828282'
    />
  </svg>
)

const Telega = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clip-path='url(#clip0_5370_44574)'>
      <path
        d='M8.63223 13.915L8.26831 19.0337C8.78898 19.0337 9.01448 18.81 9.2849 18.5414L11.726 16.2085L16.7841 19.9127C17.7118 20.4297 18.3654 20.1575 18.6156 19.0593L21.9358 3.50165L21.9367 3.50074C22.231 2.1294 21.4408 1.59315 20.537 1.92957L1.02115 9.40132C-0.31077 9.91832 -0.290603 10.6608 0.79473 10.9972L5.78415 12.5492L17.3736 5.2974C17.919 4.93624 18.4149 5.13607 18.007 5.49724L8.63223 13.915Z'
        fill='#828282'
      />
    </g>
    <defs>
      <clipPath id='clip0_5370_44574'>
        <rect width='22' height='22' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

const Insta = () => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.875 0H15.125C18.9214 0 22 3.07862 22 6.875V15.125C22 18.9214 18.9214 22 15.125 22H6.875C3.07862 22 0 18.9214 0 15.125V6.875C0 3.07862 3.07862 0 6.875 0ZM15.125 19.9375C17.7787 19.9375 19.9375 17.7787 19.9375 15.125V6.875C19.9375 4.22125 17.7787 2.0625 15.125 2.0625H6.875C4.22125 2.0625 2.0625 4.22125 2.0625 6.875V15.125C2.0625 17.7787 4.22125 19.9375 6.875 19.9375H15.125Z'
      fill='#828282'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5.5 11C5.5 7.96263 7.96263 5.5 11 5.5C14.0374 5.5 16.5 7.96263 16.5 11C16.5 14.0374 14.0374 16.5 11 16.5C7.96263 16.5 5.5 14.0374 5.5 11ZM7.5625 11C7.5625 12.8948 9.10525 14.4375 11 14.4375C12.8948 14.4375 14.4375 12.8948 14.4375 11C14.4375 9.10388 12.8948 7.5625 11 7.5625C9.10525 7.5625 7.5625 9.10388 7.5625 11Z'
      fill='#828282'
    />
    <circle cx='16.9126' cy='5.08834' r='0.732875' fill='#828282' />
  </svg>
)
