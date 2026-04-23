import { render, screen } from "@testing-library/react";
import NotFound from "../app/not-found";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("not found page", () => {
  it("renders recovery actions for missing routes", () => {
    render(
      <ThemeProvider>
        <NotFound />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", {
        name: "This page is no longer here.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle theme" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Take me back" })
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: "Report a broken link" })
    ).toHaveAttribute("href", "mailto:me@patrikdinh.com");
  });
});
