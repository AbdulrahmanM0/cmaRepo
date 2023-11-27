import {   
    createBrowserRouter,
    RouterProvider,
    Route,
    Link, } from 'react-router-dom'
import Index from './Pages/FormPage';
  
export const router = createBrowserRouter([
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ]);