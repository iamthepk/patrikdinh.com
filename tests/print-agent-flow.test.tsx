import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrintAgentFlowAnimation } from "../app/components/PrintAgentFlowAnimation";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("print agent flow preview", () => {
  it("opens and closes the receipt task contract modal", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <PrintAgentFlowAnimation />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole("button", { name: "Open Receipt task contract" })
    );

    expect(
      screen.getByRole("dialog", { name: "Receipt task contract" })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Receipt task contract" })
      ).not.toBeInTheDocument();
    });
  });
});
