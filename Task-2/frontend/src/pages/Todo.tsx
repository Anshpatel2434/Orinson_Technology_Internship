import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

type Todo = {
	id?: string;
	name: string;
	description: string;
	status?: boolean;
};

const Todo: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [todos, setTodos] = useState<Todo[]>([]);
	const [todo, setTodo] = useState<Todo>({
		name: "",
		description: "",
	});

	async function getTodos() {
		try {
			const res = await axios.get(`${BACKEND_URL}/api/v1/todo/allTodos`);
			if (res.data.status === 200) {
				setTodos(res.data.todos);
			}
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	}

	useEffect(() => {
		getTodos();
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setTodos([...todos, todo]);
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/todo/addTodo`, todo);
			console.log(res);
			if (res.data.status === 200) {
				setTodo({ name: "", description: "" });
			}
		} catch (error) {
			console.error("Error submitting todo:", error);
		}
	}

	async function handleStatus(id: string, status: boolean) {
		try {
			const res = await axios.put(`${BACKEND_URL}/api/v1/todo/updateStatus`, {
				id: id,
				status: status,
			});
			if (res.data.status === 200) {
				setTodos(
					todos.map((t) => (t.id === id ? { ...t, status: status } : t))
				);
			}
		} catch (error) {
			console.error("Error updating todo status:", error);
		}
	}

	async function handleDelete(id: string) {
		try {
			const res = await axios.delete(
				`${BACKEND_URL}/api/v1/todo/deleteTodo/${id}`
			);
			if (res.data.status === 200) {
				setTodos(todos.filter((t) => t.id !== id));
			}
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 py-8">
			<div className="container mx-auto p-4 max-w-2xl">
				<h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
					Todo List
				</h1>
				<form
					onSubmit={handleSubmit}
					className="mb-8 bg-gray-800 shadow-lg rounded-lg px-6 py-4 transform transition-all duration-300"
				>
					<div className="mb-3">
						<label
							className="block text-purple-300 text-sm font-semibold mb-1"
							htmlFor="todoName"
						>
							Todo Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
							id="todoName"
							type="text"
							placeholder="Enter todo name"
							value={todo.name}
							onChange={(e) => setTodo({ ...todo, name: e.target.value })}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-purple-300 text-sm font-semibold mb-1"
							htmlFor="todoDescription"
						>
							Todo Description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
							id="todoDescription"
							placeholder="Enter todo description"
							value={todo.description}
							onChange={(e) =>
								setTodo({ ...todo, description: e.target.value })
							}
							required
						/>
					</div>
					<div className="flex items-center justify-end">
						<button
							className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center transform transition-all duration-300 hover:scale-105"
							type="submit"
						>
							<FaPlus className="mr-2" />
							Add
						</button>
					</div>
				</form>

				<ul className="space-y-4">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={`bg-gray-800 shadow-lg rounded-lg px-6 py-4 flex justify-between items-center transform transition-all duration-300 hover:scale-105 ${
								todo.status ? "bg-green-900" : ""
							}`}
						>
							<div>
								<h3
									className={`text-lg font-semibold ${
										todo.status
											? "line-through text-gray-400"
											: "text-purple-300"
									}`}
								>
									{todo.name}
								</h3>
								<p
									className={`text-gray-400 ${
										todo.status ? "line-through" : ""
									}`}
								>
									{todo.description}
								</p>
							</div>
							<div className="flex space-x-2">
								<button
									onClick={() => handleStatus(todo.id!, !todo.status)}
									className={`${
										todo.status
											? "bg-yellow-600 hover:bg-yellow-700"
											: "bg-green-600 hover:bg-green-700"
									} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-110`}
								>
									{todo.status ? <FaTimes /> : <FaCheck />}
								</button>
								<button
									onClick={() => handleDelete(todo.id!)}
									className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-110"
								>
									<FaTrash />
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Todo;
