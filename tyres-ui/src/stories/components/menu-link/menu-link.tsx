import { DropdownMenu } from "@kobalte/core";
import { For, Show, createEffect, createSignal } from "solid-js";
import { A, useLocation } from "solid-start";
import { FiChevronDown, FiChevronUp } from "solid-icons/fi";

interface TMenuLink {
  title: string;
  href?: string;
  items?: TMenuLink[];
  isChild?: boolean;
  isActive?: () => boolean;
}
export default function MenuLink({ title, href, items, isChild, isActive }: TMenuLink) {
  const location = useLocation();
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    location.pathname && setOpen(false);
  });

  const showTitle = () => {
    if (!isActive?.() || !items?.length) return title;

    return (
      items?.find((item) => item.href && location.pathname.includes(item.href))?.title ?? title
    );
  };

  return (
    <DropdownMenu.Root open={open()} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        class={`flex items-center gap-2 ${
          isActive?.() ? "text-blue-500 font-medium" : "font-light"
        } ${isChild ? "p-2" : ""}`}>
        {href ? <A href={href}>{title}</A> : showTitle()}
        {items?.length && (
          <DropdownMenu.Icon>{open() ? <FiChevronUp /> : <FiChevronDown />}</DropdownMenu.Icon>
        )}
      </DropdownMenu.Trigger>
      <Show when={items?.length}>
        <DropdownMenu.Portal>
          <DropdownMenu.Content class="flex flex-col items-start p-2 shadow bg-white mt-7">
            <For each={items}>{(item) => <MenuLink {...item} isChild />}</For>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </Show>
    </DropdownMenu.Root>
  );
}
