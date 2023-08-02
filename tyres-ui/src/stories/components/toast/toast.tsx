import { Toast as KToast } from "@kobalte/core";
import { FiX } from "solid-icons/fi";
import { EUiVariant, TUiVariant, BackgroundVariantColor } from "~/config/ui-variants.type";

export interface TToastProps {
  title: string;
  description?: string;
  hasProgressBar?: boolean;
  toastId: number;
  variant?: TUiVariant;
}
export default function Toast(props: TToastProps) {
  return (
    <KToast.Root
      toastId={props.toastId}
      class={`selection-none p-4 bg-white rounded-sm shadow w-[300px] flex flex-col justify-between mb-2 ${
        BackgroundVariantColor[props.variant ?? EUiVariant.Neutral]
      }`}>
      <div class="flex justify-between">
        <KToast.Title>{props.title}</KToast.Title>
        <KToast.CloseButton>
          <FiX />
        </KToast.CloseButton>
      </div>
      {props.description && (
        <KToast.Description class="text-sm">{props.description}</KToast.Description>
      )}
    </KToast.Root>
  );
}
