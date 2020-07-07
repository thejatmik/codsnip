import React, { useEffect } from "react";
import Prism from "prismjs";

function CodeViewer(props) {
	const { code } = props;
	useEffect(() => {
		Prism.highlightAll();
	}, [code]);

	return (
		<div className="code-edit-container">
			<pre className="code-output">
				<code className="language-javascript">{code}</code>
			</pre>
		</div>
	);
}

export default CodeViewer;
