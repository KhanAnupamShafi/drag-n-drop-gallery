const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 110 34"
      height={34}
      width={110}>
      <path
        fill="url(#a)"
        d="M6.3 13.4c0-3.3 1.2-6.3 3.2-8.7A14.64 14.64 0 0 0 14.8 33c6.3 0 11.7-4 13.8-9.6-2.4 2.1-5.5 3.3-8.8 3.3-7.5.1-13.5-5.9-13.5-13.3Z"
      />
      <path
        fill="url(#b)"
        d="M19.7 0C15.6 0 12 1.8 9.5 4.7a14.7 14.7 0 0 1 20 13.6c0 1.8-.3 3.5-.9 5 2.8-2.4 4.6-6 4.6-10C33.1 6 27.1 0 19.7 0Z"
      />
      <path
        fill="#505151"
        d="M54.5 28.4c3.9-1.6 6.4-5.4 6.3-9.7 0-2.8-1.1-5.4-3-7.4s-4.6-3.1-7.3-3c-4.2 0-7.9 2.5-9.5 6.5-1.6 3.9-.7 8.4 2.2 11.4 3 3 7.4 3.9 11.3 2.2Zm-4-4c-2.9 0-5.2-2.3-5.2-5.6s2.3-5.6 5.2-5.6c2.9 0 5.2 2.3 5.2 5.6s-2.3 5.6-5.2 5.6ZM104.3 28.7a7.55 7.55 0 0 0-2.8-14.5c-3 0-5.7 1.8-6.9 4.7-1.1 2.8-.5 6.1 1.6 8.2 2.2 2.1 5.3 2.7 8.1 1.6Zm-2.9-3.7c-1.8 0-3.2-1.4-3.2-3.3 0-2 1.4-3.3 3.2-3.3 1.8 0 3.2 1.4 3.2 3.3s-1.4 3.3-3.2 3.3ZM68.3 7.8V29h-5.5V7.8h5.5ZM76.5 7.8V29h-5.2V7.8h5.2ZM83.8 25.3l-5.9-11.2h5.5l3.1 6.1 3.1-6.1H95L84.2 34h-5.3l4.9-8.7Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="18.07"
          x2="7.07"
          y1="11.68"
          y2="33.92"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#02BCCC" />
          <stop offset={1} stopColor="#60F23F" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="24.99"
          x2="16.71"
          y1="3.13"
          y2="19.84"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#02BCCC" />
          <stop offset={1} stopColor="#60F23F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
