import { CardContentProps } from '@/ui/components/card-content';

export interface CardTvWrapperProps {
	id: number;
	mediaType: 'tv';
	mode?: CardContentProps['mode'];
}
