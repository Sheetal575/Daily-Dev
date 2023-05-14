const ChevronDoubleLeft = ({ size, strokeWidth, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8 16.8L6 12L10.8 7.19995M18 16.8L13.2 12L18 7.19995"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDoubleLeft;
