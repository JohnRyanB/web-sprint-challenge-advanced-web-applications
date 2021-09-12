import React from "react";
import MutationObserver from "mutationobserver-shim";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import axiosWithAuth from "../helpers/axiosWithAuth";
import ColorList from "./ColorList";

const getColor = () => {
	axiosWithAuth()
		.get("/colors")
		.then((res) => res.data)
		.catch((err) => console.log("ERROR: ", err));
};

const color = [
	{
		color: "bisque",
		code: {
			hex: "#dd9a99",
		},
		id: 7,
	},
	{
		color: "softyellow",
		code: {
			hex: "#dcdd99",
		},
		id: 8,
	},
	{
		color: "blanchedalmond",
		code: {
			hex: "#ffebcd",
		},
		id: 9,
	},
	{
		color: "blue",
		code: {
			hex: "#6093ca",
		},
		id: 10,
	},
	{
		color: "blueviolet",
		code: {
			hex: "#8a2be2",
		},
		id: 11,
	},
];

const mockGetColors = getColor();
jest.mock(mockGetColors);

test("Renders without errors", () => {
	render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {
	render(<BubblePage />);
	render(<ColorList colors={color} />);

	expect(screen.getAllByTestId("color")).toHaveLength(5);
	//Keep in mind that our service is called on mount for this component.
});
