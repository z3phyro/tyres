import { TIconProps } from "./icon.props";

export default function CoverageIcon(props: TIconProps) {
  return <svg
    {...props}
    fill="none"
    role="img"
    stroke-width="2"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    style="overflow: visible; color: currentcolor;"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"></path>
    <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"></path>
    <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"></path>
    <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"></path>
    <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"></path>
    <path d="M9 12l2 2l4 -4"></path>
  </svg>

}
