import { TextField } from "@kobalte/core";
import { JSX } from "solid-js";
import { EUiVariant, TextColor } from "~/core/types/ui-variants.type";
import { cls } from "~/utils/class.helper";

export interface TInputProps {
  value?: string;
  error?: string;
  name?: string;
  disabled?: boolean;
  leading?: JSX.Element;
  leadingClass?: string;
  leadingClick?: () => void;
  trailing?: JSX.Element;
  trailingClass?: string;
  trailingClick?: () => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  ref?: (element: HTMLInputElement) => void;
  class?: string;
  testId?: string;
}

export default function Input(props: TInputProps) {
  return (
    <TextField.Root
      class={cls({ "relative group": true, [props.class!]: !!props.class })}
      validationState={props.error ? "invalid" : "valid"}
    >
      {" "}
      {props.label && (
        <TextField.Label class="text-gray-600 text-light text-sm">
          {props.label}
        </TextField.Label>
      )}
      <span
        role={props.leadingClick ? "button" : "img"}
        class={cls({
          "absolute left-3 top-2 transition-color duration-300": true,
          "text-blue-500": !!props.value,
          "text-gray-300": !props.value,
          "cursor-pointer": !!props.leadingClick,
          [props.leadingClass!]: !!props.leadingClass,
        })}
        onClick={props.leadingClick}
      >
        {props.leading}
      </span>
      <TextField.Input
        name={props.name ?? props.label}
        class={cls({
          "w-full p-2 bg-white rounded mb-2 border outline-0 focus:shadow-md transition-all duration-300":
            true,
          "border-red-500 focus:shadow-red-50 focus:border-red-500":
            !!props.error,
          "focus:border-blue-500 focus:shadow-blue-50": !props.error,
          "pr-4": !!props.trailing,
          "pl-10": !!props.leading,
          "text-gray-400 cursor-not-allowed": !!props.disabled,
        })}
        value={props.value}
        onInput={props.onInput}
        placeholder={props.placeholder}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        disabled={props.disabled}
        required={props.required}
        data-testid={props.testId}
      />
      <span
        role={props.trailingClick ? "button" : "img"}
        class={cls({
          "absolute right-3 top-2 transition-color duration-300": true,
          "text-blue-500": !!props.value,
          "text-gray-300": !props.value,
          "cursor-pointer": !!props.trailingClick,
          [props.trailingClass!]: !!props.trailingClass,
        })}
        onClick={props.trailingClick}
      >
        {props.trailing}
      </span>
      <TextField.ErrorMessage
        id={`${props.name}-error`}
        role="alert"
        class={`block text-xs ${TextColor[EUiVariant.Danger]}`}
      >
        {props.error}
      </TextField.ErrorMessage>
    </TextField.Root>
  );
}
