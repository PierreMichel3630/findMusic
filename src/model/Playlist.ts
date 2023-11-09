import { Track } from "./Track";
import { Type } from "./enums/Type";

export interface Playlist {
  id: number;
  title: string;
  description: string;
  nb_tracks: number;
  fans: number;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  md5_image: string;
  tracklist: string;
  type: Type;
  tracks: {
    data: Array<Track>;
  };
}
