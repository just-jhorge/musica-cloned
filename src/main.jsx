import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ContextProvider } from "./context/Context";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ContextProvider>
);
