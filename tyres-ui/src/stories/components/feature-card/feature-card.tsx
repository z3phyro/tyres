import { JSX } from "solid-js";
import { A } from "solid-start";
import Card from "../card";

interface Props {
  href: string;
  title: string;
  description: string;
  image: JSX.Element;
}
export function FeatureCard(props: Props) {
  return (
    <A class="flex-1" href={props.href}>
      <Card class="flex-1 relative">
        <h1 class="text-xl relative mb-1 z-10">Resources</h1>
        <p class="mb-[120px] relative z-10">Manage your resources</p>
      </Card>
    </A>
  );
}
