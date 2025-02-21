import { render, screen } from '@testing-library/react';
import CardGrid from './card-grid';

describe('Card Grid', () => {
	describe('View', () => {
		it('should render children', () => {
			render(<CardGrid title="Popular Searches">Children</CardGrid>);

			const childrenText = screen.getByText('Children');

			expect(childrenText).toBeInTheDocument();
		});

		it('should render title', () => {
			render(<CardGrid title="Popular Searches">Children</CardGrid>);

			const title = screen.getByText('Popular Searches');

			expect(title).toBeInTheDocument();
		});

		it('should render title as <h2 />', () => {
			render(<CardGrid title="Popular Searches">Children</CardGrid>);

			const title = screen.getByRole('heading', { level: 2 });

			expect(title).toBeInTheDocument();
		});

		it('should not render title if title is not given', () => {
			render(<CardGrid>Children</CardGrid>);

			const title = screen.queryByRole('heading', { level: 2 });

			expect(title).not.toBeInTheDocument();
		});
	});
});
