import { JSX, createContext, createSignal, useContext } from "solid-js";
import Toast, { TToastProps } from "~/stories/components/toast/toast";
import { Toast as KToast, toaster } from "@kobalte/core";
import { Portal } from "solid-js/web";

type TToastType = Omit<TToastProps, "toastId">;

export interface TToastContext {
  show: (toastProps: TToastType) => void;
}

const ToastContext = createContext<TToastContext>({
  show: () => console.error("ToastContext not properly initialized"),
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
  return (
    <ToastContext.Provider value={{ show }}>
      {props.children}
      <Portal>
        <KToast.Region limit={5} class="fixed top-6 right-4">
          <KToast.List />
        </KToast.Region>
      </Portal>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
