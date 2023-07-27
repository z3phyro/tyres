import { Dialog as KDialog } from "@kobalte/core";

export default function Dialog() {
  return (
    <KDialog.Root>
      <KDialog.Portal>
        <KDialog.Overlay />
        <KDialog.Content>
          <KDialog.CloseButton />
          <KDialog.Title />
          <KDialog.Description />
        </KDialog.Content>
      </KDialog.Portal>
    </KDialog.Root>
  );
}
