import { CardContentProps } from '@/ui/components/card-content';

export interface CardMovieWrapperProps {
	id: number;
	mediaType: 'movie';
	mode?: CardContentProps['mode'];
}
