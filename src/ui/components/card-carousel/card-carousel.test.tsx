import { render, screen } from '@testing-library/react';
import CardCarousel from './card-carousel';

// TODO: Improve later
describe('Card Carousel', () => {
	describe('View', () => {
		it('should render children', async () => {
			render(<CardCarousel title="Popular Searches">Children</CardCarousel>);

			const children = screen.getByTestId(`card-carouselPopular Searches`);

			expect(children).toBeInTheDocument();
		});
	});

	describe('Interaction & Logic', () => {
		it('should not render prev and next arrow by default when not hovered', async () => {
			render(<CardCarousel title="Popular Searches">Children</CardCarousel>);

			const prevButton = screen.queryByTestId('prev-button');
			const nextButton = screen.queryByTestId('next-button');

			expect(prevButton).not.toBeInTheDocument();
			expect(nextButton).not.toBeInTheDocument();
		});
	});
});
