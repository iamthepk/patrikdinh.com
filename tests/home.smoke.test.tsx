import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("homepage smoke test", () => {
  it("renders the core sections", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", { name: "Patrik Dinh" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();

    const githubLinks = screen.getAllByRole("link", { name: "GitHub" });

    expect(
      githubLinks.some(
        (link) => link.getAttribute("href") === "https://github.com/iamthepk"
      )
    ).toBe(true);
  });
});
