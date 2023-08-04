import { TextField } from "@kobalte/core";
import { JSX } from "solid-js";

export interface TInputProps {
  value: string;
  onInput: (event: Event) => void;
  leading?: JSX.Element;
  leadingClass?: string;
  leadingClick?: () => void;
  trailing?: JSX.Element;
  trailingClass?: string;
  trailingClick?: () => void;
  placeholder?: string;
  label?: string;
}
export default function Input(props: TInputProps) {
  return (
    <TextField.Root class="relative group">
      {props.label && (
        <TextField.Label class="text-gray-600 text-light text-small">{props.label}</TextField.Label>
      )}
      <span
        class={`absolute left-3 top-2 transition-color duration-300 ${
          !!props.value ? props.leadingClass || "text-blue-500" : "text-gray-300"
        } ${props.leadingClick ? "cursor-pointer" : ""}`}>
        {props.leading}
      </span>
      <TextField.Input
        class={`w-full p-2 bg-white rounded mb-2 border border-1 outline-0 
        focus:shadow-md focus:shadow-blue-50 focus:border-blue-500 transition-all 
        duration-300 ${!!props.trailing ? "pr-4" : ""} ${!!props.leading ? "pl-10" : ""}
        `}
        value={props.value}
        onInput={props.onInput}
        placeholder={props.placeholder}
      />
      <span
        class={`absolute right-3 top-2 transition-color duration-300 ${
          !!props.value ? props.trailingClass || "text-blue-500" : "text-gray-300"
        } ${props.trailingClick ? "cursor-pointer" : ""}`}
        onClick={props.trailingClick}>
        {props.trailing}
      </span>
    </TextField.Root>
  );
}
