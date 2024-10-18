import React from 'react';

const ErrorIcon = (props) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M32 58.6666C46.7276 58.6666 58.6667 46.7276 58.6667 32C58.6667 17.2724 46.7276 5.33331 32 5.33331C17.2724 5.33331 5.33334 17.2724 5.33334 32C5.33334 46.7276 17.2724 58.6666 32 58.6666Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 24L24 40"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 24L40 40"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ErrorIcon;
