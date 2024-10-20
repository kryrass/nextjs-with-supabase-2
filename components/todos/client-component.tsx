"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Todo {
    id: string;
    title: string;
    priority: number;
}

export default function ClientTodoComponent() {
    const [todos, setTodos] = useState<Todo[]>([]); 
    const [newTodo, setNewTodo] = useState<string>("");
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editingTodoTitle, setEditingTodoTitle] = useState<string>("");
    const [priority, setPriority] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getTodos = async () => {
            const { data, error } = await supabase.from("todos").select("*");
            if (error) {
                console.error("Error fetching todos:", error);
                return;
            }
            setTodos(data);
        };
        getTodos();
    }, [supabase]);

    const addTodo = async () => {
        const { data, error } = await supabase.from("todos").insert([
            { title: newTodo, priority }
        ]);

        if (error) {
            console.error("Error adding todo:", error);
            setErrorMessage("Error adding todo.");
            return;
        }

        if (Array.isArray(data)) {
            setTodos([...todos, ...data]);
        } else if (data) {
            setTodos([...todos, data]);
        }

        resetForm();
    };

    const updateTodo = async () => {
        if (editingTodoId) {
            const { error } = await supabase
                .from("todos")
                .update({ title: editingTodoTitle, priority })
                .match({ id: editingTodoId });

            if (error) {
                console.error("Error updating todo:", error);
                setErrorMessage("Error updating todo.");
                return;
            }

            setTodos(todos.map(todo => 
                todo.id === editingTodoId ? { ...todo, title: editingTodoTitle, priority } : todo
            ));
            resetForm();
        }
    };

    const deleteTodo = async (id: string) => {
        const { error } = await supabase.from("todos").delete().match({ id });

        if (error) {
            console.error("Error deleting todo:", error);
            setErrorMessage("Error deleting todo.");
            return;
        }

        setTodos(todos.filter(todo => todo.id !== id));
        setErrorMessage(null);
    };

    const resetForm = () => {
        setNewTodo("");
        setEditingTodoId(null);
        setEditingTodoTitle("");
        setPriority(1); 
        setErrorMessage(null);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Client Todos</h2>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <ul className="list-disc pl-5 mb-4">
                {todos.length === 0 ? (
                    <li>Client todosi ei leitud.</li>
                ) : (
                    todos.map(todo => (
                        <li key={todo.id} className="py-1 flex justify-between items-center">
                            <span>
                                {todo.title} (Priority: {todo.priority})
                            </span>
                            <div>
                                <button onClick={() => {
                                    setEditingTodoId(todo.id);
                                    setEditingTodoTitle(todo.title);
                                    setPriority(todo.priority);
                                }} className="text-yellow-500 hover:underline">Muuda</button>
                                <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:underline ml-2">Kustuta</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={editingTodoId ? editingTodoTitle : newTodo}
                    onChange={(e) => {
                        if (editingTodoId) {
                            setEditingTodoTitle(e.target.value);
                        } else {
                            setNewTodo(e.target.value);
                        }
                    }}
                    placeholder="Enter new todo"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    min="1"
                    placeholder="Priority"
                    className="border p-2 rounded"
                />
                <button 
                    onClick={editingTodoId ? updateTodo : addTodo}
                    className="bg-blue-500 text-white py-2 rounded"
                >
                    {editingTodoId ? "Update Todo" : "Add Todo"}
                </button>
                {editingTodoId && (
                    <button 
                        onClick={resetForm} 
                        className="bg-gray-500 text-white py-2 rounded"
                    >
                        Tagasi
                    </button>
                )}
            </div>
        </div>
    );
}
