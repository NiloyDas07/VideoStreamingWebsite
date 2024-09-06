import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPlaylists } from "../actions/playlistActions";
import { Container, PlaylistCard, SearchBox } from "../components/";

const Playlists = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { playlists } = useSelector((state) => state.playlists);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        dispatch(getUserPlaylists({ userId: user._id }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="py-4">
      <SearchBox />
      <h1 className="mb-4 text-3xl font-bold">Your Playlists</h1>
      <div className="flex flex-wrap gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Playlists;
