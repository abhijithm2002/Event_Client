import './App.css'
import { RouterProvider } from "react-router";
import { AppRouter } from "./router/index.router";

function App() {

  return (
       <RouterProvider router={AppRouter}/>
  )
}

export default App


