import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = (props) => {
	const [colors, setColors] = useState([]);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		fetchColorService()
			.then((res) => {
				setColors(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const toggleEdit = (value) => {
		setEditing(value);
	};

	console.log(colors);
	const saveEdit = (editColor) => {
		let color = editColor;
		console.log("color variable", color);
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${color.id}`, color)
			.then((res) => {
				console.log(res.data);
				setColors(
					colors.map((color) => {
						if (color.id === res.data.id) {
							return res.data;
						} else {
							return color;
						}
					})
				);
			});
	};

	const deleteColor = (colorToDelete) => {
		let color = colorToDelete;
		console.log("delete this", color);
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then((res) => {
				console.log(res);
				setColors(
					colors.filter((color) => Number(color.id) !== Number(res.data))
				);
			});
	};

	return (
		<div className="container">
			<ColorList
				colors={colors}
				editing={editing}
				toggleEdit={toggleEdit}
				saveEdit={saveEdit}
				deleteColor={deleteColor}
			/>
			<Bubbles colors={colors} />
		</div>
	);
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.*
//2. Complete toggleEdit, saveEdit, deleteColor and functions
