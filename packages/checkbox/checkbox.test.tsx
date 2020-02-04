import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '@testing-library/react';
import { MixedCheckbox } from './src/index';

describe('<MixedCheckbox />', () => {
	let props: any;
	beforeEach(() => {
		props = {};
	});

	it('should render correctly', () => {
		expect(render(<MixedCheckbox {...props} />)).toMatchSnapshot();
	});
});
