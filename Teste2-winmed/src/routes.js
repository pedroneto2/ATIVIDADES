import Todo from "views/Todo.js";
import Other from "views/Other.js";

const routes = [
  {
    path: "/todo",
    name: "todo",
    icon: "nc-icon nc-paper",
    component: (props) => <Todo {...props} />,
  },
  {
    path: "/other",
    name: "other",
    icon: "nc-icon nc-air-baloon",
    component: (props) => <Other {...props} />,
  },
];

export default routes;
