import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "../app/page";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("homepage interactions", () => {
  it("keeps live previews accessible through text links when mobile thumbnails are hidden", () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    const previews = [
      ["Lobby Mates", "https://www.lobbymates.app/demo"],
      ["VOUCHER GENERATOR", "https://voucher.generator.patrikdinh.com/"],
      ["Invoice AI Extractor", "https://invoice.ai.extractor.patrikdinh.com/"],
    ];

    for (const [title, href] of previews) {
      const link = screen.getByRole("link", {
        name: `Open ${title} live preview (opens in a new tab)`,
      });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("places the Print Agent GitHub link next to its title without a detached Code link", () => {
    render(<ThemeProvider><Home /></ThemeProvider>);
    const link = screen.getByRole("link", { name: /View Print ?Agent source on GitHub/i });

    expect(link.closest("h3")).toHaveTextContent(/Print ?Agent/);
    expect(link).toHaveAttribute("href", "https://github.com/iamthepk/print-agent");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("data-tooltip", "View on GitHub");
    expect(screen.queryByRole("link", { name: /^Code$/ })).not.toBeInTheDocument();
  });

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
