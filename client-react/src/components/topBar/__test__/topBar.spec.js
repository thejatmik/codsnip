import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import TopBar from "../topBar.js";

describe("<TopBar />", () => {
	let getByTestId;
	afterEach(cleanup);

	describe("view topbar", () => {
		beforeEach(() => {
			({ getByTestId } = render(
				<Router>
					<TopBar />
				</Router>
			));
		});

		it("has link to root", () => {
			expect(getByTestId("top-to-home").innerHTML).toEqual("Home");
			expect(getByTestId("top-to-home")).toHaveProperty("href");
			expect(getByTestId("top-to-home").href).toEqual(
				`${window.location.href}`
			);
		});

		it("has link to root", () => {
			expect(getByTestId("top-to-register").innerHTML).toEqual("Register");
			expect(getByTestId("top-to-register")).toHaveProperty("href");
			expect(getByTestId("top-to-register").href).toEqual(
				`${window.location.href}register`
			);
		});

		it("has link to login", () => {
			expect(getByTestId("top-to-login").innerHTML).toEqual("Login");
			expect(getByTestId("top-to-login")).toHaveProperty("href");
			expect(getByTestId("top-to-login").href).toEqual(
				`${window.location.href}login`
			);
		});
	});
});
