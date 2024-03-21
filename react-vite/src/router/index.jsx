import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CreateAlbumModal from '../components/CreateAlbumModal';
import CreateSongModal from '../components/CreateSongModal';
import Layout from './Layout';
import Home from '../components/Pages/Home';
import ManageSongs from '../components/Pages/Manage/ManageSongs';
import ManageAlbums from '../components/Pages/Manage/ManageAlbums';
import AlbumList from '../components/Albums/AlbumList';
import AlbumShowPage from '../components/Albums/AlbumShowPage';
import AllSongList from '../components/Songs/AllSongList';
// import SongDetails from '../components/SongDetails/SongDetails';
import SearchSong from '../components/SearchSong'
import SearchAlbum from '../components/SearchAlbum';
import UpdateAlbumForm from '../components/UpdateAlbumForm';

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
        path: "/albums",
        element: <AlbumList />
      },
      {
        path: "/albums/:albumId",
        element: <AlbumShowPage />
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
      {
        path: "/songs",
        element: <AllSongList />
      },
      {
        path: "/songs/new",
        element: <CreateSongModal />
      },
      {
        path: "/search/songs",
        element: <SearchSong />
      },
      {
        path: "/search/albums",
        element: <SearchAlbum />
      }, 
      {
        path: "/albums/:albumId/edit",
        element: <UpdateAlbumForm />
      }
      // {
      //   path: "songs/:songId",
      //   element: <SongDetails />
      // },

    ],
  },
]);
