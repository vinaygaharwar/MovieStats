import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import About from './components/Body/About/About';
import Contact from './components/Body/Contact/Contact';
import FavMovie from './components/Body/FavMovie/FavMovie';

import SearchMovie from './components/Body/SearchMovie/SearchMovie';

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      
      {
        path:"/",
        element:<SearchMovie/>
        },
      {
        path:"/about",
        element:<About/>
        },
      {
        path:"/contact",
        element:<Contact/>
        },
      {
        path:"/fav",
        element:<FavMovie/>
        },
    ],
    
    },
  
])
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
  
)

