import styled from "styled-components"

export const StartIcon = ({ completed, active, reversed }) => {
  if (completed) {
    return (
      <ReversibleSvg
        reversed={reversed}
        width="26"
        height="96"
        viewBox="0 0 26 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 48C1 41.3726 6.37258 36 13 36C19.6274 36 25 41.3726 25 48C25 54.6274 19.6274 60 13 60C6.37258 60 1 54.6274 1 48Z"
          fill="#6D4EEA"
        />
        <path
          d="M18.3334 44L11.0001 51.3333L7.66675 48"
          stroke="#1B1C22"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 59.5C6.64873 59.5 1.5 54.3513 1.5 48H0.5C0.5 54.9036 6.09644 60.5 13 60.5V59.5ZM24.5 48C24.5 54.3513 19.3513 59.5 13 59.5V60.5C19.9036 60.5 25.5 54.9036 25.5 48H24.5ZM13 36.5C19.3513 36.5 24.5 41.6487 24.5 48H25.5C25.5 41.0964 19.9036 35.5 13 35.5V36.5ZM13 35.5C6.09644 35.5 0.5 41.0964 0.5 48H1.5C1.5 41.6487 6.64873 36.5 13 36.5V35.5Z"
          fill="#6D4EEA"
        />
        <path d="M13 60L13 96" stroke="#6D4EEA" strokeWidth="2" />
      </ReversibleSvg>
    )
  } else if (active) {
    return (
      <ReversibleSvg
        reversed={reversed}
        width="28"
        height="96"
        viewBox="0 0 28 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="36"
          width="24"
          height="24"
          rx="12"
          stroke="#6D4EEA"
          strokeWidth="4"
        />
        <path d="M14 60L14 96" stroke="#6D4EEA" strokeWidth="2" />
      </ReversibleSvg>
    )
  }

  return (
    //??? this icon is reversed by default
    <ReversibleSvg
      reversed={!reversed}
      width="24"
      height="96"
      viewBox="0 0 24 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L12 36" stroke="#828282" strokeWidth="2" />
      <rect
        x="2.5"
        y="38.5"
        width="19"
        height="19"
        rx="9.5"
        stroke="#828282"
        strokeWidth="5"
      />
    </ReversibleSvg>
  )
}
export const BetweenIcon = ({ completed, active }) => {
  if (completed) {
    return (
      <svg
        width="26"
        height="96"
        viewBox="0 0 26 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 0L13 36" stroke="#6D4EEA" strokeWidth="2" />
        <path
          d="M1 48C1 41.3726 6.37258 36 13 36C19.6274 36 25 41.3726 25 48C25 54.6274 19.6274 60 13 60C6.37258 60 1 54.6274 1 48Z"
          fill="#6D4EEA"
        />
        <path
          d="M18.3332 44L10.9998 51.3333L7.6665 48"
          stroke="#1B1C22"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 59.5C6.64873 59.5 1.5 54.3513 1.5 48H0.5C0.5 54.9036 6.09644 60.5 13 60.5V59.5ZM24.5 48C24.5 54.3513 19.3513 59.5 13 59.5V60.5C19.9036 60.5 25.5 54.9036 25.5 48H24.5ZM13 36.5C19.3513 36.5 24.5 41.6487 24.5 48H25.5C25.5 41.0964 19.9036 35.5 13 35.5V36.5ZM13 35.5C6.09644 35.5 0.5 41.0964 0.5 48H1.5C1.5 41.6487 6.64873 36.5 13 36.5V35.5Z"
          fill="#6D4EEA"
        />
        <path d="M13 60L13 96" stroke="#6D4EEA" strokeWidth="2" />
      </svg>
    )
  } else if (active) {
    return (
      <svg
        width="28"
        height="96"
        viewBox="0 0 28 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 0L14 36" stroke="#6D4EEA" strokeWidth="2" />
        <rect
          x="2"
          y="36"
          width="24"
          height="24"
          rx="12"
          stroke="#6D4EEA"
          strokeWidth="4"
        />
        <path d="M14 60L14 96" stroke="#6D4EEA" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg
      width="24"
      height="96"
      viewBox="0 0 24 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L12 36" stroke="#828282" strokeWidth="2" />
      <rect
        x="2.5"
        y="38.5"
        width="19"
        height="19"
        rx="9.5"
        stroke="#828282"
        strokeWidth="5"
      />
      <path d="M12 60L12 96" stroke="#828282" strokeWidth="2" />
    </svg>
  )
}

const ReversibleSvg = styled.svg`
  transform: ${({ reversed }) =>
    reversed ? "rotate(180deg)" : "rotate(0deg)"};
`
