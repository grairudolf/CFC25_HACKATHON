import { render, screen, fireEvent } from "@testing-library/react";
import WhyChooseUsSection from "./WhyChooseUsSection"; // Adjust path as necessary
import "@testing-library/jest-dom";

describe("WhyChooseUsSection", () => {
  it("renders the section title in English by default", () => {
    render(<WhyChooseUsSection />);
    expect(screen.getByText("Why Choose Silicon?")).toBeInTheDocument();
  });

  it("renders the descriptive paragraph in English by default", () => {
    render(<WhyChooseUsSection />);
    expect(
      screen.getByText(
        /Your central hub for discovering and accessing the best digital services Cameroon has to offer/
      )
    ).toBeInTheDocument();
  });

  it("renders all four benefit points in English by default", () => {
    render(<WhyChooseUsSection />);
    expect(screen.getByText("Discover Local Gems")).toBeInTheDocument();
    expect(screen.getByText("Effortless Connection")).toBeInTheDocument();
    expect(screen.getByText("Community-Driven")).toBeInTheDocument();
    expect(screen.getByText("All-in-One Platform")).toBeInTheDocument();
  });

  it("switches content language to French when FR button is clicked", () => {
    render(<WhyChooseUsSection />);
    const frenchButton = screen.getByRole("button", { name: /FR/i });
    fireEvent.click(frenchButton);
    expect(screen.getByText("Pourquoi Choisir Silicon ?")).toBeInTheDocument();
    expect(
      screen.getByText("Découvrez les Pépites Locales")
    ).toBeInTheDocument();
  });

  it("switches content language to Pidgin when PID button is clicked", () => {
    render(<WhyChooseUsSection />);
    const pidginButton = screen.getByRole("button", { name: /PID/i });
    fireEvent.click(pidginButton);
    expect(screen.getByText("Why You Go Choose Silicon?")).toBeInTheDocument();
    expect(
      screen.getByText("Discover Local Correct Services")
    ).toBeInTheDocument();
  });
});
