export default function InfoIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      role="img"
      stroke-width="2"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible; color: currentcolor;"
    >
      <path d="M12 2A10 10 0 1 0 12 22 10 10 0 1 0 12 2z"></path>
      <path d="M12 16 12 12"></path>
      <path d="M12 8 12.01 8"></path>
    </svg>
  );
}
