import { Toast as KToast } from "@kobalte/core";
import {
  EUiVariant,
  TUiVariant,
  BorderColor,
} from "~/core/types/ui-variants.type";
import { cls } from "~/utils/class.helper";

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
      class={cls({
        "group block pointer-events-auto relative w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--kb-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full border-l-4 !border-t-gray-200 !border-r-gray-200 !border-b-gray-200 border":
          true,
        [BorderColor[props.variant ?? EUiVariant.Neutral]]: true,
      })}
    >
      <KToast.Title>{props.title}</KToast.Title>
      <KToast.Description class="text-sm !ml-0">
        {props.description}
      </KToast.Description>
    </KToast.Root>
  );
}
