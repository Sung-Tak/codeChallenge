import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import Searchbar from "./Searchbar";

describe("searchbar", () => {
  test("snapshot test", () => {
    const { asFragment } = render(<Searchbar setValue={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("should render input in searchbar", () => {
    render(<Searchbar setValue={() => {}} />);
    const inputEl = screen.queryByPlaceholderText("Search By Title...");
    expect(inputEl).toBeInTheDocument();
  });
});
