import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Jumbotron from "../jumbotron.js";

const mockStore = configureStore([]);

describe("<Jumbotron />", () => {
	let getByTestId;
	let store;
	afterEach(cleanup);

	describe("view jumbotron content", () => {
		beforeEach(() => {
			store = mockStore({
				user: {
					status: "mock user store ok"
				}
			});
			({ getByTestId } = render(
				<Provider store={store}>
					<Jumbotron />
				</Provider>
			));
		});

		it("show jumbotron title", () => {
			expect(getByTestId("jumbotronTitle").innerHTML).toEqual(
				"Jumbotron placeholder"
			);
		});
	});
});
