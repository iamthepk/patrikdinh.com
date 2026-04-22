import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrintAgentFlowAnimation } from "../app/components/PrintAgentFlowAnimation";
import { ThemeProvider } from "../app/lib/theme-provider";

describe("print agent flow preview", () => {
  it("opens and closes the order preview modal", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <PrintAgentFlowAnimation />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole("button", { name: "Open Order payload preview" })
    );

    expect(
      screen.getByRole("dialog", { name: "Order payload preview" })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Order payload preview" })
      ).not.toBeInTheDocument();
    });
  });
});
