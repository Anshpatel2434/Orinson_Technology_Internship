import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FeedbackFrom from "./pages/FeedbackFrom";
import Todo from "./pages/Todo";
import Blog from "./pages/Blog";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/feedback" element={<FeedbackFrom />} />
					<Route path="/todos" element={<Todo />} />
					<Route path="/blogs" element={<Blog />} />
					<Route path="/blogDetail/:id" element={<BlogDetails />} />
					<Route path="/blogForm/:type" element={<BlogForm />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
