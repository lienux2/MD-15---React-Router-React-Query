import './index.css'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';

//page imports
import { Home } from './routes/pages/Home';
import { About } from './routes/pages/About';
import { Create } from './routes/pages/Create';
import { Id } from './routes/pages/Id';
import { Posts } from './routes/pages/Posts';
import { Error } from './routes/pages/Error';

//layout imports
import { PostsLayout } from './routes/layouts/PostsLayout';
import { RootLayout } from './routes/layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='posts' element={<PostsLayout />}>
        <Route index element={<Posts />} />
        <Route path=':id' element={<Id />} />
      </Route>
      <Route path='about' element={<About />} />
      <Route path='create' element={<Create />} />

      <Route path='*' element={<Error />} />
    </Route>
  )
)

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App