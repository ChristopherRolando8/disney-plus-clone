import { render, screen } from '@testing-library/react';
import TabPanel from './tab-panel';

describe('Tab Panel', () => {
	describe('View', () => {
		it('should render children if value matches currentValue', () => {
			render(
				<TabPanel currentValue="value" value="value">
					Children
				</TabPanel>,
			);

			const tabPanel = screen.getByRole('tabpanel');
			const childrenText = screen.getByText('Children');

			expect(tabPanel).toBeInTheDocument();
			expect(childrenText).toBeInTheDocument();
		});

		it('should NOT render children if value does not matches currentValue', () => {
			render(
				<TabPanel currentValue="value" value="incorrect value">
					Children
				</TabPanel>,
			);

			const tabPanel = screen.queryByRole('tabpanel');

			expect(tabPanel).not.toBeInTheDocument();
		});
	});
});
