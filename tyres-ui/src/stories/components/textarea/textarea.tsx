import { TextField } from "@kobalte/core";

export interface TTextareaProps {
  label?: string;
  value: string;
  onInput: (event: Event) => void;
  placholder?: string;
}
export default function Textarea(props: TTextareaProps) {
  return (
    <TextField.Root>
      {props.label && <TextField.Label>{props.label}</TextField.Label>}
      <TextField.TextArea
        class="w-full p-2 bg-white rounded mb-2 border border-1 outline-0 
        focus:shadow-md focus:shadow-blue-50 focus:border-blue-500 transition-all 
        duration-300 "
        value={props.value}
        onInput={props.onInput}
      />
    </TextField.Root>
  );
}
