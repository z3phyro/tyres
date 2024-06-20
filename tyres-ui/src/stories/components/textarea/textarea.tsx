import { TextField } from "@kobalte/core";

export interface TTextareaProps {
  label?: string;
  value: string;
  onInput: (event: Event) => void;
  placeholder?: string;
  class?: string;
}
export default function Textarea(props: TTextareaProps) {
  return (
    <TextField.Root class={props.class}>
      {props.label && (
        <TextField.Label class="text-gray-600 text-light text-small">
          {props.label}
        </TextField.Label>
      )}
      <TextField.TextArea
        class="w-full p-2 bg-white rounded mb-2 border border-1 outline-0 
        focus:shadow-md focus:shadow-blue-50 focus:border-blue-500 transition-all 
        duration-300 "
        value={props.value}
        placeholder={props.placeholder}
        onInput={props.onInput}
      />
    </TextField.Root>
  );
}
