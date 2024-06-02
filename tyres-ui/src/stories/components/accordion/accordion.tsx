import { Accordion as KAccordion } from "@kobalte/core";
import { JSX } from "solid-js";
import "./styles.css";
import {
  BackgroundColor,
  BorderColor,
  EUiVariant,
  TUiVariant,
} from "~/core/types/ui-variants.type";
import Card from "../card";
import ChevronDownIcon from "../icons/chevron-down.icon";

export type TAccordionItem = {
  header: JSX.Element | string;
  content: JSX.Element | string;
  key: string;
};
export interface TAccordionProps {
  items: TAccordionItem[];
  defaultValue?: string[];
  variant?: TUiVariant;
  disabled?: boolean;
}
export default function Accordion(props: TAccordionProps) {
  return (
    <KAccordion.Root
      class="accordion rounded"
      defaultValue={props.defaultValue}
      collapsible
    >
      {props.items.map((item) => (
        <KAccordion.Item class={`accordion__item `} value={item.key}>
          <KAccordion.Header
            class={`accordion__item-header rounded ${
              BorderColor[props.variant ?? EUiVariant.White]
            } ${BackgroundColor[props.variant ?? EUiVariant.White]}`}
          >
            <KAccordion.Trigger
              class="accordion__item-trigger"
              disabled={props.disabled}
            >
              {item.header}
              {!props.disabled && (
                <ChevronDownIcon
                  class="accordion__item-trigger-icon"
                  aria-hidden
                />
              )}
            </KAccordion.Trigger>
          </KAccordion.Header>
          <KAccordion.Content class="accordion__item-content">
            <Card>{item.content}</Card>
          </KAccordion.Content>
        </KAccordion.Item>
      ))}
    </KAccordion.Root>
  );
}
