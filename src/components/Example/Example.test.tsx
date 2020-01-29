import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Example, { IExampleProps } from './Example';

describe('<Example />', () => {
	let props: IExampleProps;
	beforeEach(() => {
		props = {
			testId: 'TestId',
		};
	});

	it('should render correctly', () => {
		expect(render(<Example {...props} />)).toBeTruthy();
	});

	it('should render with the correct classes', () => {
		const { queryByTestId } = render(<Example {...props} />);
		expect(queryByTestId(props.testId)).toHaveClass('Example');
	});
});
