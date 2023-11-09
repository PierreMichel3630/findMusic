import { Artist } from "./Artist";
import { Contributor } from "./Contributor";
import { Genre } from "./Genre";
import { Track } from "./Track";
import { Type } from "./enums/Type";

export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  release_date: string;
  type: Type;
}

export interface AlbumDetail {
  id: number;
  title: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  genres: {
    data: Array<Genre>;
  };
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: Date;
  record_type: string;
  available: boolean;
  tracklist: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  contributors: Array<Contributor>;
  artist: Artist;
  type: Type;
  tracks: {
    data: Array<Track>;
  };
}
