interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done" 

interface Column {
    id: TypedColumn,
    todos: Todo[]
}

interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image
}

// type Image = {
//     image?: string | null | undefined
// }

interface Image {
    image?: string | null | undefined
    bucketId: string;
    fileId: string;
}