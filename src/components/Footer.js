import {useSelector, useDispatch} from 'react-redux';
import { filterByColor, filterByStatus } from '../redux/filters/filterSlice';


export default function Footer() {
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos.entities);
    const filters = useSelector((state) => state.filters);
    const { colors } = filters;

    const taskLeft = todos?.reduce((total, todo) => total += todo.completed? 0: 1, 0);

    const handleColorFilter = (color) => {
        if (colors.includes(color)) {
            dispatch(filterByColor({color, type: "REMOVE"}));
        } else {
            dispatch(filterByColor({color, type: "ADD"}));
        }
    };

    return (
        <div className="mt-4 flex justify-between text-xs text-gray-500">
            <p>{`${taskLeft} tasks left`}</p>
            <ul className="flex space-x-1 items-center text-xs">
                <li className="cursor-pointer font-bold" onClick={() => dispatch(filterByStatus("all"))}>All</li>
                <li>|</li>
                <li className="cursor-pointer" onClick={() => dispatch(filterByStatus("incomplete"))}>Incomplete</li>
                <li>|</li>
                <li className="cursor-pointer" onClick={() => dispatch(filterByStatus("complete"))}>Complete</li>
                <li></li>
                <li></li>
                <li className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
                        colors.includes("green") && "bg-green-500"
                    }`} onClick={() => handleColorFilter("green")}></li>
                <li className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
                        colors.includes("red") && "bg-red-500"
                    }`} onClick={() => handleColorFilter("red")}></li>
                <li className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
                        colors.includes("yellow") && "bg-yellow-500"
                    }`} onClick={() => handleColorFilter("yellow")}></li>
            </ul>
        </div>
    );
}
