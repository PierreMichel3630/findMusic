import { createClient } from "@supabase/supabase-js";
import { Type } from "src/model/enums/Type";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getRequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
};

export const searchNext = (url: string) => {
  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const searchAll = (query: string, type?: Type, limit?: number) => {
  const url = `https://api.deezer.com/search${
    type ? `/${type}` : ""
  }?q=${query}${limit ? `&limit=${limit}` : ""}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getArtistById = (id: number) => {
  const url = `https://api.deezer.com/artist/${id}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getAlbumsByArtistId = (id: number) => {
  const url = `https://api.deezer.com/artist/${id}/albums`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopTrackByArtistId = (id: number) => {
  const url = `https://api.deezer.com/artist/${id}/top?limit=50`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getPlaylistById = (id: number) => {
  const url = `https://api.deezer.com/playlist/${id}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getAlbumById = (id: number) => {
  const url = `https://api.deezer.com/album/${id}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getPodcastById = (id: number) => {
  const url = `https://api.deezer.com/podcast/${id}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getEpisodeByPodcastId = (id: number) => {
  const url = `https://api.deezer.com/podcast/${id}/episodes`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopArtists = (limit: number) => {
  const url = `https://api.deezer.com/chart/0/artists?limit=${limit}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopTracks = (limit: number) => {
  const url = `https://api.deezer.com/chart/0/tracks?limit=${limit}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopAlbums = (limit: number) => {
  const url = `https://api.deezer.com/chart/0/albums?limit=${limit}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopPlaylists = (limit: number) => {
  const url = `https://api.deezer.com/chart/0/playlists?limit=${limit}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};

export const getTopPodcats = (limit: number) => {
  const url = `https://api.deezer.com/chart/0/podcasts?limit=${limit}`;

  return supabase.functions.invoke("api-deezer", {
    body: { url },
  });
};
