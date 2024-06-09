import { A } from "@solidjs/router";
import TiresIcon from "../icons/tires.icon";

export default function Logo() {
  return (
    <A href="/" class="flex text-gray-800">
      <TiresIcon class="w-6 h-6" />
      <span class="font-medium">TyRes</span> &nbsp <span class="text-blue-500">UI</span>
    </A>
  );
}
