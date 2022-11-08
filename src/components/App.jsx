import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "../pages/home/Home";
import Collection from "../pages/collection/Collection";
import Playlist from "../pages/playlist/Playlist";
import ErrorPage from "../ErrorPage";

const App = () => {
	return (
		<Router basename="/">
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/playlist/:playlistId" element={<Playlist />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Layout>
		</Router>
	);
};

export default App;
