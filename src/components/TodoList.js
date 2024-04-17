import { useEffect } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from "../redux/todos/thunks";
import { Spinner } from "./Spinner";

export default function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.entities);
    const filters = useSelector(state => state.filters);
    const status = useSelector(state => state.todos.status);

      useEffect(() => {
			if (status === "idle") {
				dispatch(fetchTodos());
			}
		}, [status, dispatch]);

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

    let content;
    if(status === 'pending') {
        content = <Spinner text="Loading...."/>;
    } else {
        content = (
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
        )
    }


    return (
        <section>
            {content}
        </section>
    );
}
