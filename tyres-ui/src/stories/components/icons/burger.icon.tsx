import { IconProps } from "./icon.props";

export default function BurgerIcon(props: IconProps) {
  return <svg {...props} fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible; color: currentcolor;">
    <path d="M3 12 21 12"></path>
    <path d="M3 6 21 6"></path>
    <path d="M3 18 21 18"></path>
  </svg>;
}