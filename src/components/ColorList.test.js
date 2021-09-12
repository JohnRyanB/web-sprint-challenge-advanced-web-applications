import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";

test("Renders an empty list of colors without errors", () => {
	render(<ColorList colors={[]} />);
});

const colors = [
	{
		color: "bisque",
		code: {
			hex: "#dd9a99",
		},
		id: 7,
	},
];

test("Renders a list of colors without errors", () => {});
render(<ColorList colors={colors} />);

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {});
const { rerender } = render(<ColorList colors={colors} editing={true} />);

// let editing = screen.queryByTestId("edit_menu");

expect(screen.queryByTestId("edit_menu")).toBeInTheDocument;

rerender(<ColorList colors={colors} editing={false} />);

expect(screen.queryByTestId("edit_menu")).not.toBeInTheDocument;
// console.log("after rerender", editing);
