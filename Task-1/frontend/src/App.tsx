import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FeedbackFrom from "./pages/FeedbackFrom";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/feedback" element={<FeedbackFrom />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
