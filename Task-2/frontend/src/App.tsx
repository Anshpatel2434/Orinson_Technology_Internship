import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FeedbackFrom from "./pages/FeedbackFrom";
import Todo from "./pages/Todo";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/feedback" element={<FeedbackFrom />} />
					<Route path="/todos" element={<Todo />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
