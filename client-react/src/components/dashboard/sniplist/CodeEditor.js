import React, { useEffect } from "react";
import Prism from "prismjs";

function CodeEditor(props) {
	const content = props.code;
	const setContent = props.setCode;

	const handleKeyDown = event => {
		let value = content,
			selStartPos = event.currentTarget.selectionStart;

		if (event.key === "Tab") {
			value =
				value.substring(0, selStartPos) +
				"    " +
				value.substring(selStartPos, value.length);
			event.currentTarget.selectionStart = selStartPos + 3;
			event.currentTarget.selectionEnd = selStartPos + 4;
			event.preventDefault();

			setContent(value);
		}
	};

	useEffect(() => {
		Prism.highlightAll();
	}, [props.language, content]);

	return (
		<div className="code-edit-container row">
			<div className="col">
				<textarea
					className="code-input"
					value={content}
					onChange={event => setContent(event.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className="col">
				<pre className="code-output">
					{!content ? <p>Preview</p> : ""}
					<code className={`language-${props.language || "javascript"}`}>
						{content}
					</code>
				</pre>
			</div>
		</div>
	);
}

export default CodeEditor;
