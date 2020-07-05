import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import RegisterForm from "../register.js";

describe("<RegisterForm />", () => {
	let getByTestId;
	afterEach(cleanup);
	describe("submit register cred", () => {
		beforeEach(() => {
			({ getByTestId } = render(<RegisterForm />));
		});

		it("show error: empty input", () => {
			fireEvent.change(getByTestId("nameInput"), {
				target: {
					value: "lele"
				}
			});
			fireEvent.click(getByTestId("submitRegister"));
			expect(getByTestId("nameInput").value).not.toEqual("");
			expect(getByTestId("passInput").value).toEqual("");
			expect(getByTestId("verifyInput").value).toEqual("");
			expect(getByTestId("registerError").innerHTML).toEqual("invalid input");
		});

		it("show error: pass and verify has different value", () => {
			fireEvent.change(getByTestId("nameInput"), {
				target: {
					value: "lele"
				}
			});
			fireEvent.change(getByTestId("passInput"), {
				target: {
					value: "leleyeye"
				}
			});
			fireEvent.change(getByTestId("verifyInput"), {
				target: {
					value: "leleaye"
				}
			});
			fireEvent.click(getByTestId("submitRegister"));
			expect(getByTestId("nameInput").value).not.toEqual("");
			expect(getByTestId("passInput").value).not.toEqual("");
			expect(getByTestId("verifyInput").value).not.toEqual("");
			expect(getByTestId("registerError").innerHTML).toEqual("invalid input");
		});

		it("clears register form if all field value is valid", () => {
			fireEvent.change(getByTestId("nameInput"), {
				target: {
					value: "lele"
				}
			});
			fireEvent.change(getByTestId("passInput"), {
				target: {
					value: "leleyeye"
				}
			});
			fireEvent.change(getByTestId("verifyInput"), {
				target: {
					value: "leleyeye"
				}
			});
			fireEvent.click(getByTestId("submitRegister"));
			expect(getByTestId("nameInput").value).toEqual("");
			expect(getByTestId("passInput").value).toEqual("");
			expect(getByTestId("verifyInput").value).toEqual("");
			expect(getByTestId("registerError").innerHTML).toEqual("");
		});
	});
});
