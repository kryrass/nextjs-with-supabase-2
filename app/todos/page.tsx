import ServerTodoComponent from "@/components/todos/server-component";
import ClientTodoComponent from "@/components/todos/client-component";

export default async function TodosPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Todos</h1>
            <ServerTodoComponent />
            <ClientTodoComponent />
        </>
    );
}
