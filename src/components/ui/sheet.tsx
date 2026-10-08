"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRef, type ReactNode } from "react";
export function Sheet({
  open,
  onOpenChange,
  title,
  children,
  side = "left",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  side?: "left" | "right";
}) {
  const origin = useRef<Element | null>(null);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content
          className={`sheet sheet-${side}`}
          aria-describedby={undefined}
          onOpenAutoFocus={() => {
            origin.current = document.activeElement;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => {
              if (document.querySelector('[role="dialog"][data-state="open"]'))
                return;
              const sceneHeading =
                document.querySelector<HTMLElement>(".scene-heading h1");
              if (side === "right" && sceneHeading) {
                sceneHeading.focus({ preventScroll: true });
                return;
              }
              const previous = origin.current;
              if (
                previous &&
                previous !== document.body &&
                previous.isConnected &&
                "focus" in previous
              ) {
                (previous as HTMLElement).focus({ preventScroll: true });
                return;
              }
              document
                .querySelector<HTMLElement>(
                  side === "left"
                    ? "[data-open-navigator]"
                    : "[data-open-inspector]",
                )
                ?.focus({ preventScroll: true });
            });
          }}
        >
          <div className="sheet-heading">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close className="icon-button" aria-label="Close panel">
              <X size={20} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
