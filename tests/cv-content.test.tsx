import { render, screen } from "@testing-library/react";
import CVContent from "../app/components/CVContent";
import { cvData } from "../app/lib/cv-data";

describe("CV reading order", () => {
  it("places profile and experience before supplemental information in the document", () => {
    render(<CVContent />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent);
    expect(headings).toEqual([
      "Profile", "Experience", "Contact", "Core Focus", "Tech Stack", "Languages", "Education", "Selected Project Work",
    ]);
    expect(screen.getByRole("link", { name: cvData.basics.phone })).toHaveAttribute(
      "href", `tel:${cvData.basics.phone.replace(/\s+/g, "")}`
    );
  });
});
