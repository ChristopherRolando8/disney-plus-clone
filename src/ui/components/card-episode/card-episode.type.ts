export interface CardEpisodeProps {
  id: string;
  name: string;
  season: number;
  episode: number;
  duration: number;
  airDate: string;
  overview: string;
  posterUrl: string;
  loading?: boolean;
}
