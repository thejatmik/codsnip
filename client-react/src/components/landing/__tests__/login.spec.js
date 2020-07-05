import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import LoginForm from "../login.js";

describe("<LoginForm />", () => {
	let getByTestId;
	afterEach(cleanup);

	describe("submit login cred", () => {
		beforeEach(() => {
			({ getByTestId } = render(<LoginForm />));
		});
		it("show error if name or pass is empty", () => {
			fireEvent.change(getByTestId("nameInput"), {
				target: {
					value: "lele"
				}
			});
			fireEvent.click(getByTestId("submitLogin"));
			expect(getByTestId("errorLogin").innerHTML).toEqual("invalid input");
		});

		it("clears login form if value is valid", () => {
			fireEvent.change(getByTestId("nameInput"), {
				target: {
					value: "lele"
				}
			});
			fireEvent.change(getByTestId("passInput"), {
				target: {
					value: "password"
				}
			});
			fireEvent.click(getByTestId("submitLogin"));
			expect(getByTestId("nameInput").value).toEqual("");
			expect(getByTestId("passInput").value).toEqual("");
			expect(getByTestId("errorLogin").innerHTML).toEqual("");
		});
	});
});
