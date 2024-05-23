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
}
export default function Modal(props: TModalProps) {
  return (
    <Dialog.Root defaultOpen open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay class="w-full h-full absolute top-0 left-0 backdrop-blur-sm" />
        <div class="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <Dialog.Content class="min-w-[400px] m-auto">
            <Card>
              <Dialog.Title class="float-left mb-4">{props.title}</Dialog.Title>
              <Dialog.CloseButton class="float-right" onClick={props.onClose}>
                <XIcon />
              </Dialog.CloseButton>
              <Dialog.Description class="clear-left">
                <p>{props.description}</p>
                <div class="flex justify-end w-full mt-2 gap-2">
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
