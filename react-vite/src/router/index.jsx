import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CreateAlbumModal from '../components/CreateAlbumModal';
import Layout from './Layout';
import Home from '../components/Pages/Home';
import ManageSongs from '../components/Pages/Manage/ManageSongs';
import ManageAlbums from '../components/Pages/Manage/ManageAlbums';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/albums/new",
        element: <CreateAlbumModal />
      },
      {
        path: "/users/current/albums",
        element: <ManageAlbums />
      },
      {
        path: "/users/current/songs",
        element: <ManageSongs />
      },
    ],
  },
]);
