import { Switch as KSwitch } from "@kobalte/core";
import "./styles.css";
import { createSignal } from "solid-js";
import { cls } from "~/utils/class.helper";

export interface SwitchProps {
  onChange?: (val: boolean) => void;
  checked: boolean;
  label?: string;
  class?: string;
}
export default function Switch(props: SwitchProps) {
  const [checked, setChecked] = createSignal(props.checked);

  const handleChange = (val: boolean) => {
    setChecked(val);
    props.onChange?.(val);
  };

  return (
    <KSwitch.Root
      class={cls({ switch: true, [props.class!]: !!props.class })}
      onChange={handleChange}
      checked={checked()}
    >
      {props.label && (
        <KSwitch.Label class="switch__label">{props.label}</KSwitch.Label>
      )}
      <KSwitch.Input class="switch__input" />
      <KSwitch.Control class="switch__control">
        <KSwitch.Thumb class="switch__thumb" />
      </KSwitch.Control>
    </KSwitch.Root>
  );
}
