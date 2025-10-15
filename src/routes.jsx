import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
    children:[
        {
            path:'/home',
            element:<Home />
        }
    ]
  },
]);

export default router;