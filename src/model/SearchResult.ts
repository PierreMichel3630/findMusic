import { Album } from "./Album";
import { Artist } from "./Artist";
import { Type } from "./enums/Type";

export interface SearchResult {
  id: number;
  readable: true;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: true;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: Type;
}
