import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/Home.tsx'
import Create from './pages/Create.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        Component: HomePage
      },
      {
        path: "/create",
        Component: Create
      },
    ])} />
  </StrictMode>,
)
