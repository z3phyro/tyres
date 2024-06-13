import { Dialog } from "@kobalte/core";
import Button from "../button";
import { For } from "solid-js";
import { TButtonProps } from "../button/button";
import Card from "../card";
import XIcon from "../icons/x.icon";

export interface TModalProps {
  title: string;
  description: string;
  buttons?: TButtonProps[];
  open?: boolean;
  onClose?: () => void;
  testId?: string;
}
export default function Modal(props: TModalProps) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose?.();
    }
  };
  return (
    <Dialog.Root defaultOpen open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay class="w-full h-full absolute top-0 left-0 bg-gray-300 bg-opacity-15 backdrop-blur-sm" />
        <div
          class="w-full h-full absolute top-0 left-0 flex items-center justify-center"
          onKeyDown={onKeyDown}
        >
          <Dialog.Content data-testid={props.testId} class="min-w-[400px] m-auto" role="dialog">
            <Card>
              <Dialog.Title role="heading" as="h1" class="float-left mb-4 text-xl font-bold">
                {props.title}
              </Dialog.Title>
              <Dialog.CloseButton class="float-right" onClick={props.onClose}>
                <XIcon />
                <span class="sr-only">Close</span>
              </Dialog.CloseButton>
              <Dialog.Description class="clear-left">
                {props.description}
                <div class="flex justify-end w-full mt-4 gap-2">
                  <For each={props.buttons}>
                    {(button) => <Button {...button}>{button.children}</Button>}
                  </For>
                </div>
              </Dialog.Description>
            </Card>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
