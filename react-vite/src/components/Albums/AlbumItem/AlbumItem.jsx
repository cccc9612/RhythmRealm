import { IoMdPlay } from "react-icons/io";
import './AlbumItem.css'


function AlbumItem({ album }) {
  return (
    <div className='album-card-container'>
      <span className="tooltiptext"><IoMdPlay /></span>
      <img src={album.cover_img} alt={album.name} />
      <div className='album-card-name-artist'>
        <span>{album.name}</span>
        <span>By {album.artist.first_name} {album.artist.last_name}</span>
      </div>
    </div>
  )
}

export default AlbumItem;
