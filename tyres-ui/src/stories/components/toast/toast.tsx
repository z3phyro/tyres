import { Toast as KToast } from "@kobalte/core";
import { EUiVariant, TUiVariant, BackgroundVariantColor } from "~/core/types/ui-variants.type";
import XIcon from "../icons/x.icon";

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
      class={`selection-none p-4 rounded-sm shadow w-[300px] flex flex-col justify-between mb-2 ${BackgroundVariantColor[props.variant ?? EUiVariant.Neutral]
        }`}>
      <div class="flex justify-between">
        <KToast.Title>{props.title}</KToast.Title>
        <KToast.CloseButton>
          <XIcon />
        </KToast.CloseButton>
      </div>
      {props.description && (
        <KToast.Description class="text-sm">{props.description}</KToast.Description>
      )}
    </KToast.Root>
  );
}
