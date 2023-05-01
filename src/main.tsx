import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
const App = React.lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
