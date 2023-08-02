import { JSX, createContext, createEffect, createSignal, useContext } from "solid-js";
import { TButtonProps } from "~/stories/components/button/button";
import Modal from "~/stories/components/modal";
import { TModalProps } from "~/stories/components/modal/modal";

export interface TDialogContext {
  show: (modalProps: TModalProps) => void;
}
const DialogContext = createContext<TDialogContext>({
  show: () => console.error("DialogContext not properly initialized"),
});

export interface TDialogProviderProps {
  children: JSX.Element | JSX.Element[];
}
export function DialogProvider(props: TDialogProviderProps) {
  const [visible, setVisible] = createSignal(false);

  const [modalProps, setModalProps] = createSignal<TModalProps>({
    title: "Saying Hi",
    description: "Hello World!",
  });

  const show = (modalProps: TModalProps) => {
    setModalProps(modalProps);
    setVisible(true);
  };

  createEffect(() => decorateButtonsAction(modalProps().buttons));

  const decorateButtonsAction = (buttons?: TButtonProps[]) => {
    buttons?.forEach((button) => {
      const action = button.onClick;
      button.onClick = undefined;
      button.onClick = () => {
        action?.();
        setVisible(false);
      };
    });
  };

  const restModal = () => {
    const { open, ...rest } = modalProps();
    return rest;
  };

  return (
    <DialogContext.Provider value={{ show }}>
      {props.children}
      <Modal {...restModal()} open={visible()} onClose={() => setVisible(false)} />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}
