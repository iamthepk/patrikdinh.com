import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ImagePreviewModal from "../app/components/ImagePreviewModal";
import { PrintAgentFlowAnimation } from "../app/components/PrintAgentFlowAnimation";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("image preview", () => {
  it("bounds zoom and resets the zoom and scroll position", async () => {
    const user = userEvent.setup();
    render(
      <ImagePreviewModal
        src="/thumbnails/print-agent/receipt-payload-contract.svg"
        alt="Receipt contract"
        ariaLabel="Receipt preview"
        closeLabel="Close preview"
        width={920}
        height={560}
        onClose={vi.fn()}
      />
    );

    const zoomIn = screen.getByRole("button", { name: "Zoom in" });
    const zoomOut = screen.getByRole("button", { name: "Zoom out" });
    const level = screen.getByLabelText("Zoom level");
    const viewport = screen.getByRole("region", { name: "Receipt contract" });

    expect(level).toHaveTextContent("100%");
    expect(zoomOut).toBeDisabled();
    for (let i = 0; i < 8; i++) await user.click(zoomIn);
    expect(level).toHaveTextContent("400%");
    expect(zoomIn).toBeDisabled();
    expect(viewport.style.getPropertyValue("--image-preview-zoom")).toBe("4");

    await user.click(zoomOut);
    expect(level).toHaveTextContent("350%");
    viewport.scrollLeft = 200;
    viewport.scrollTop = 100;
    await user.click(screen.getByRole("button", { name: "Fit image" }));
    expect(level).toHaveTextContent("100%");
    expect(viewport.scrollLeft).toBe(0);
    expect(viewport.scrollTop).toBe(0);
    expect(zoomOut).toBeDisabled();
    expect(zoomIn).toBeEnabled();
  });

  it("opens Print Agent previews fitted again after closing a zoomed image", async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><PrintAgentFlowAnimation /></ThemeProvider>);
    const trigger = screen.getByRole("button", { name: "Open Receipt task contract" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByLabelText("Zoom level")).toHaveTextContent("150%");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Open Receipt task contract" }));
    expect(screen.getByLabelText("Zoom level")).toHaveTextContent("100%");
    expect(within(screen.getByRole("dialog")).getByRole("img")).toHaveAttribute(
      "src", "/thumbnails/print-agent/receipt-payload-contract.svg"
    );
  });
});
