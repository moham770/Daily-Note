import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Register from './components/Authentecation/Register/Register.jsx'
import Auth from './components/Authentecation/Auth/Auth.jsx'
import Login from './components/Authentecation/Login/Login.jsx'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home/Home.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import NoteContextProvider from './context/NoteContext.jsx'

const reactQuery = new QueryClient()

const router = createBrowserRouter([
  {path:'',element:<App/> ,children:[
    {path:'auth',element:<Auth/>,children:[
      {index:true,element:<Register/>},
      {path:'register',element:<Register/>},
      {path:'login',element:<Login/>},
    ]},
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={reactQuery}>
    <UserContextProvider>
      <NoteContextProvider>
    <RouterProvider router={router} />
      </NoteContextProvider>
    </UserContextProvider>
    <Toaster/>
  </QueryClientProvider>



)
