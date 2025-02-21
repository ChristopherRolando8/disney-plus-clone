import { render, screen } from '@testing-library/react';
import RenderIf from './render-if';

describe('Render If', () => {
	describe('View', () => {
		it('should render children if props isTrue equal to true', () => {
			render(<RenderIf isTrue>Children</RenderIf>);

			const childrenText = screen.getByText('Children');

			expect(childrenText).toBeInTheDocument();
		});

		it('should NOT render children if props isTrue equal to false', () => {
			render(<RenderIf isTrue={false}>Children</RenderIf>);

			const childrenText = screen.queryByText('Children');

			expect(childrenText).not.toBeInTheDocument();
		});
	});
});
