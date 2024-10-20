"use server";

import { createClient } from "@/utils/supabase/server";
import ClientTodoComponent from "./client-component"; 

export default async function ServerTodoComponent() {
    const supabase = createClient();
    const { data: todos, error } = await supabase.from("todos").select("*");

    // Handle error case
    if (error) {
        console.error("Error fetching todos:", error);
        return <h1>Error fetching todos.</h1>;
    }

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            {todos && todos.length > 0 ? ( 
                <ClientTodoComponent todos={todos} /> 
            ) : (
                <h1>No todos found.</h1>
            )}
        </main>
    );
}
