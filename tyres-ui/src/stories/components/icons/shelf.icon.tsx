import { TIconProps } from "./icon.props";

export default function ShelfIcon(props: TIconProps) {
  return <svg
    {...props}
    fill="currentColor"
    stroke-width="0"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 16"
    height="1em"
    width="1em"
    style="overflow: visible; color: currentcolor;"
  >
    <path
      fill="currentColor"
      d="M3.5 2h-3c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5h3c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5zM3 5H1V4h2v1zM8.5 2h-3c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5h3c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5zM8 5H6V4h2v1z"
    ></path>
    <path
      fill="currentColor"
      d="m11.954 2.773-2.679 1.35a.502.502 0 0 0-.222.671l4.5 8.93a.502.502 0 0 0 .671.222l2.679-1.35a.502.502 0 0 0 .222-.671l-4.5-8.93a.502.502 0 0 0-.671-.222z"
    ></path>
    <path
      fill="currentColor"
      d="M14.5 13.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
    ></path>
  </svg>

}
