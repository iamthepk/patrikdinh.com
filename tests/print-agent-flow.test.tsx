import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrintAgentFlowAnimation } from "../app/components/PrintAgentFlowAnimation";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("print agent flow preview", () => {
  it("opens and closes the receipt API contract modal", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <PrintAgentFlowAnimation />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole("button", { name: "Open Receipt API contract" })
    );

    expect(
      screen.getByRole("dialog", { name: "Receipt API contract" })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Receipt API contract" })
      ).not.toBeInTheDocument();
    });
  });
});
