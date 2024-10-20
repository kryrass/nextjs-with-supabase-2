// layout.tsx
import ServerTodoComponent from "@/components/todos/server-component";
import ClientTodoComponent from "@/components/todos/client-component";
import { UserProvider } from "@/components/todos/context/userContext"; // Adjust path based on your structure

export default async function TodosPage() {
    return (
        <UserProvider>
            <h1 className="text-3xl font-bold mb-6">Todos</h1>
            <ServerTodoComponent />
            <ClientTodoComponent />
        </UserProvider>
    );
}
