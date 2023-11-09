import { Type } from "./enums/Type";

export interface Podcast {
  id: number;
  title: string;
  description: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  md5_image: string;
  tracklist: string;
  type: Type;
}

export interface PodcastEpisode {
  id: number;
  title: string;
  release_date: string;
  duration: number;
  picture: string;
  type: Type;
}
