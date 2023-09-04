import { TextField } from "@kobalte/core";
import { JSX } from "solid-js";
import { EUiVariant, TextVariantColor } from "~/core/types/ui-variants.type";

export interface TInputProps {
  value: string;
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
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  ref: (element: HTMLInputElement) => void;
}
export default function Input(props: TInputProps) {
  return (
    <TextField.Root class="relative group" validationState={props.error ? "invalid" : "valid"}>
      {props.label && (
        <TextField.Label class="text-gray-600 text-light text-sm">{props.label}</TextField.Label>
      )}
      <span
        class={`absolute left-3 top-2 transition-color duration-300 ${
          props.value ? props.leadingClass || "text-blue-500" : "text-gray-300"
        } ${props.leadingClick ? "cursor-pointer" : ""} `}>
        {props.leading}
      </span>
      <TextField.Input
        name={props.name ?? props.label}
        class={`w-full p-2 bg-white rounded mb-2 border outline-0 
        focus:shadow-md ${
          props.error
            ? "border-2 border-red-500 focus:shadow-red-50 focus:border-red-500 "
            : "border-1 focus:border-blue-500 focus:shadow-blue-50"
        } transition-all 
        duration-300 ${props.trailing ? "pr-4" : ""} ${props.leading ? "pl-10" : ""}
        ${props.disabled ? "text-gray-400 cursor-not-allowed" : "bg-white"}`}
        value={props.value}
        onInput={props.onInput}
        placeholder={props.placeholder}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        disabled={props.disabled}
      />
      <span
        class={`absolute right-3 top-2 transition-color duration-300 ${
          props.value ? props.trailingClass || "text-blue-500" : "text-gray-300"
        } ${props.trailingClick ? "cursor-pointer" : ""}`}
        onClick={props.trailingClick}>
        {props.trailing}
      </span>
      <TextField.ErrorMessage class={`block text-xs ${TextVariantColor[EUiVariant.Danger]}`}>
        {props.error}
      </TextField.ErrorMessage>
    </TextField.Root>
  );
}
