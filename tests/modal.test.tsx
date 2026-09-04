import { StrictMode, useState } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Modal from "../app/components/Modal";

function ModalFixture() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open preview</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} ariaLabel="Preview">
        <a href="#details">Details</a>
      </Modal>
    </>
  );
}

describe("shared modal", () => {
  it("wraps Tab in both directions and skips disabled or hidden controls", async () => {
    const user = userEvent.setup();
    // jsdom has no layout; give visible candidates a client rect for this test.
    const rects = vi.spyOn(HTMLElement.prototype, "getClientRects").mockReturnValue([
      new DOMRect(0, 0, 44, 44),
    ] as unknown as DOMRectList);
    try {
      render(
        <Modal isOpen onClose={() => {}} ariaLabel="Preview">
          <a href="#details">Details</a>
          <button disabled>Disabled action</button>
          <div hidden><button>Hidden action</button></div>
          <button style={{ visibility: "hidden" }}>Invisible action</button>
        </Modal>
      );
      const close = screen.getByRole("button", { name: "Close dialog" });
      const details = screen.getByRole("link", { name: "Details" });
      expect(close).toHaveFocus();
      await user.keyboard("{Shift>}{Tab}{/Shift}");
      expect(details).toHaveFocus();
      await user.keyboard("{Tab}");
      expect(close).toHaveFocus();
    } finally {
      rects.mockRestore();
    }
  });

  it("opens a native modal and restores focus and scrolling after Escape", async () => {
    const user = userEvent.setup();
    document.body.style.overflow = "auto";
    render(<StrictMode><ModalFixture /></StrictMode>);
    const trigger = screen.getByRole("button", { name: "Open preview" });

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Preview" });
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("button", { name: "Close dialog" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(dialog).toHaveAttribute("data-state", "closed");
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("handles native cancel requests without skipping the closing lifecycle", async () => {
    const user = userEvent.setup();
    render(<ModalFixture />);
    await user.click(screen.getByRole("button", { name: "Open preview" }));
    const dialog = screen.getByRole("dialog");
    const cancelEvent = new Event("cancel", { cancelable: true });

    fireEvent(dialog, cancelEvent);
    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(dialog).toHaveAttribute("open");
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  it("closes on the overlay but not when pressing content", async () => {
    const user = userEvent.setup();
    render(<ModalFixture />);
    await user.click(screen.getByRole("button", { name: "Open preview" }));
    const dialog = screen.getByRole("dialog");

    fireEvent.mouseDown(within(dialog).getByRole("link", { name: "Details" }));
    expect(dialog).toHaveAttribute("data-state", "open");
    fireEvent.mouseDown(dialog);
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  it("cancels pending close callbacks and resets animation when reopened", () => {
    vi.useFakeTimers();
    try {
      const onClose = vi.fn();
      const content = (isOpen: boolean) => (
        <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Preview">Details</Modal>
      );
      const { rerender, unmount } = render(content(true));

      fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
      rerender(content(false));
      rerender(content(true));
      expect(screen.getByRole("dialog")).toHaveAttribute("data-state", "open");
      vi.runAllTimers();
      expect(onClose).not.toHaveBeenCalled();

      fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
      unmount();
      vi.runAllTimers();
      expect(onClose).not.toHaveBeenCalled();
      expect(document.body.style.overflow).toBe("");
    } finally {
      vi.useRealTimers();
    }
  });
});
