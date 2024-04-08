import Todo from "./Todo";
import { useSelector } from 'react-redux';

export default function TodoList() {
    const todos = useSelector(state => state.todos);
    const filters = useSelector(state => state.filters);

    const filterByColor = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    }

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch(status) {
            case "complete":
                return todo.completed;
            case "incomplete":
                return !todo.completed;
            default:
                return true;
        }
    }

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {
                todos
                .filter(filterByColor)
                .filter(filterByStatus)
                .map(todo => (
                    <Todo todo={todo} key={todo.id}/>
                ))
            }
        </div>
    );
}
