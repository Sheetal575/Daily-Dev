export const UpVote = ({ size, strokeWidth, color, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="miter"
  >
    <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
  </svg>
);
