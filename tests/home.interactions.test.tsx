import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "../app/page";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("homepage interactions", () => {
  it("toggles theme and opens a case study dialog", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
    });

    await user.click(
      screen.getByRole("button", { name: "Toggle theme" })
    );

    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("theme")).toBe("light");

    await user.click(screen.getAllByRole("button", { name: "View case study" })[0]);

    expect(
      screen.getByRole("dialog", {
        name: "Lootea Operations System: Technical Case Study",
      })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", {
          name: "Lootea Operations System: Technical Case Study",
        })
      ).not.toBeInTheDocument();
    });
  });

  it("opens a two-page CV preview with the project appendix", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: "CV" }));

    const cvDialog = screen.getByRole("dialog", { name: "Curriculum Vitae" });

    expect(cvDialog).toBeInTheDocument();
    expect(
      within(cvDialog).getByRole("heading", { name: "Selected Project Work" })
    ).toBeInTheDocument();

    await user.click(
      within(cvDialog).getByRole("button", { name: /Voucher Generator/i })
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Curriculum Vitae" })
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "center",
      });
    });
  });
});
