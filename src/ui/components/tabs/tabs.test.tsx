import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./tabs";
import { DummyTabs } from "@/lib/test-utils/dummy-data";

describe("Side Bar", () => {
  describe("View", () => {
    it("should render the base component as tablist", () => {
      render(<Tabs tabs={DummyTabs} />);

      const tabs = screen.getByRole("tablist");

      expect(tabs).toBeInTheDocument();
    });

    it("should render correct list of role tabs from props", () => {
      render(<Tabs tabs={DummyTabs} />);

      DummyTabs.forEach((tab) => {
        const tabItem = screen.getByTestId(`${tab.value}-tab-item`);

        expect(tabItem).toBeInTheDocument();
      });
    });
  });

  describe("Interaction & Logic", () => {
    it("should trigger onChange with correct value when one of the tab item is clicked", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Tabs tabs={DummyTabs} onChange={onChange} />);

      const selectedTabData = DummyTabs[1];

      const selectedTab = screen.getByTestId(
        `${selectedTabData.value}-tab-item`
      );

      await user.click(selectedTab);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(selectedTabData.value);
    });
  });
});
