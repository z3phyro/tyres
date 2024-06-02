import { JSX, createContext, useContext } from "solid-js";
import Toast, { TToastProps } from "~/stories/components/toast/toast";
import { Toast as KToast, toaster } from "@kobalte/core";
import { Portal } from "solid-js/web";
import { EUiVariant } from "~/core/types/ui-variants.type";

type TToastType = Omit<TToastProps, "toastId">;
type TToastTypeAux = Omit<TToastType, "variant">;

export interface TToastContext {
  show: (toastProps: TToastType) => void;
  success: (toastProps: TToastTypeAux) => void;
  error: (toastProps: TToastTypeAux) => void;
  info: (toastProps: TToastTypeAux) => void;
  neutral: (toastProps: TToastTypeAux) => void;
}

const ToastContext = createContext<TToastContext>({
  show: () => console.error("ToastContext not properly initialized"),
  success: () => console.error("ToastContext not properly initialized"),
  error: () => console.error("ToastContext not properly initialized"),
  info: () => console.error("ToastContext not properly initialized"),
  neutral: () => console.error("ToastContext not properly initialized"),
});

export interface TToastProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function ToastProvider(props: TToastProviderProps) {
  const show = (toastProps: Omit<TToastType, "toastId">) => {
    toaster.show(({ toastId }) => {
      return <Toast toastId={toastId} {...toastProps} />;
    });
  };

  const success = (toastProps: TToastTypeAux) => {
    show({
      ...toastProps,
      variant: EUiVariant.Success,
    });
  };

  const info = (toastProps: TToastTypeAux) => {
    show({
      ...toastProps,
      variant: EUiVariant.Info,
    });
  };

  const error = (toastProps: TToastTypeAux) => {
    show({
      ...toastProps,
      variant: EUiVariant.Danger,
    });
  };

  const neutral = (toastProps: TToastTypeAux) => {
    show({
      ...toastProps,
      variant: EUiVariant.Neutral,
    });
  };

  return (
    <ToastContext.Provider value={{ show, success, error, info, neutral }}>
      {props.children}
      <Portal>
        <KToast.Region limit={5} class="fixed top-6 right-4">
          <KToast.List class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
        </KToast.Region>
      </Portal>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
