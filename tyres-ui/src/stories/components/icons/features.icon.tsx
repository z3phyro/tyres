import { TIconProps } from "./icon.props";

export default function FeaturesIcon(props: TIconProps) {
  return (
    <svg
      class={props.class}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 58 58"
      role="img"
    >
      <path
        style="fill:#556080;"
        d="M51.471,58H6.529C2.923,58,0,55.077,0,51.471V6.529C0,2.923,2.923,0,6.529,0h44.943
	C55.077,0,58,2.923,58,6.529v44.943C58,55.077,55.077,58,51.471,58z"
      />
      <path
        style="fill:#A4E869;stroke:#434D68;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
        d="M43,26H15
	C9.5,26,5,21.5,5,16v0C5,10.5,9.5,6,15,6h28c5.5,0,10,4.5,10,10v0C53,21.5,48.5,26,43,26z"
      />
      <path
        style="fill:#D75A4A;stroke:#434D68;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
        d="M15,52h28
	c5.5,0,10-4.5,10-10v0c0-5.5-4.5-10-10-10H15C9.5,32,5,36.5,5,42v0C5,47.5,9.5,52,15,52z"
      />
      <circle
        style="fill:#E7ECED;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
        cx="43"
        cy="16"
        r="10"
      />
      <circle
        style="fill:#E7ECED;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
        cx="15"
        cy="42"
        r="10"
      />
    </svg>
  );
}
