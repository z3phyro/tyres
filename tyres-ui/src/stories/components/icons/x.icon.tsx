import { TIconProps } from "./icon.props";

export default function XIcon(props: TIconProps) {
  return (
    <svg
      {...props}
      fill="none"
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
      <path d="M18 6 6 18"></path>
      <path d="M6 6 18 18"></path>
    </svg>
  );
}
