import { MediaType } from '@/redux/slices';

export interface CardContentProps {
	id: number;
	title: string;
	overview: string;
	posterUrl: string;
	backdropUrl: string;
	mediaType: MediaType;
	isInWatchlist?: boolean;
	onAddToWatchlistClick?: () => void;
	onRemoveFromWatchlistClick?: () => void;
	buttonLoading?: boolean;
	loading?: boolean;
	selected?: boolean;
	mode?: 'default' | 'select';
	onSelect?: (reason: 'add' | 'remove') => void;
}
