import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from "./Color";
import { fetchColorService as mockgetColors } from "../services/fetchColorService";
import { click } from "@testing-library/user-event/dist/click";
jest.mock(`../services/fetchColorService`);

const singleColor = { color: "", code: { hex: "" } };

test("Renders without errors with blank color passed into component", () => {
	render(<Color color={singleColor} />);
});

const black = { color: "Black", code: { hex: "#000000" } };

test("Renders the color passed into component", () => {
	render(<Color color={black} />);
});

let deleteBoolean = false;
let handleDeleteMock = () => {
	deleteBoolean = !deleteBoolean;
};
let editBoolean = false;
let handleEditMock = () => {
	editBoolean = !editBoolean;
};

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
	render(
		<Color
			color={black}
			toggleEdit={handleEditMock}
			deleteColor={handleDeleteMock}
		/>
	);

	const button = screen.getByTestId("delete");
	userEvent.click(button);

	expect(deleteBoolean).toBe(true);
	expect(editBoolean).toBe(true);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
	render(
		<Color
			color={black}
			toggleEdit={handleEditMock}
			deleteColor={handleDeleteMock}
			setEditColor={handleEditMock}
		/>
	);

	const div = screen.getByTestId("color");
	userEvent.click(div);

	expect(deleteBoolean).toBe(true);
	expect(editBoolean).toBe(true);
});
