#!/usr/bin/env bash

declare COMPONENT_NAME=$1;

[ -d "./src/components/$COMPONENT_NAME" ] && echo "Component already exists." && exit 0;

mkdir ./src/components/$COMPONENT_NAME;

echo "import React from 'react';
import {b} from '../../utils/bem';
import {IBaseFields} from '../../models/base/fields';
import './$COMPONENT_NAME.scss';

const block = b.with('$COMPONENT_NAME');

export interface I${COMPONENT_NAME}Props extends IBaseFields {}

const $COMPONENT_NAME = ({testId, ...props}: I${COMPONENT_NAME}Props) => (
    <div className={block()} data-testid={testId}>
        Hello $COMPONENT_NAME!
    </div>
);
export default $COMPONENT_NAME;" > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx;

echo ".$COMPONENT_NAME {
}" > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.scss;

echo "import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import $COMPONENT_NAME, {
	I${COMPONENT_NAME}Props,
} from './$COMPONENT_NAME';
import { render } from '@testing-library/react';

describe('<$COMPONENT_NAME />', () => {
	let props: I${COMPONENT_NAME}Props;
	beforeEach(() => {
		props = {
			testId: 'TestId',
		};
	});

	it('should render with the correct classes', () => {
		const { queryByTestId } = render(<$COMPONENT_NAME {...props} />);
		expect(queryByTestId(props.testId)).toHaveClass('$COMPONENT_NAME');
	});
});" > ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.test.tsx;

echo "import React from 'react';
import { storiesOf } from '@storybook/react';
import $COMPONENT_NAME from '../../src/components/$COMPONENT_NAME/$COMPONENT_NAME';

storiesOf('$COMPONENT_NAME', module).add('Example', () => <$COMPONENT_NAME />);" > ./stories/components/$COMPONENT_NAME.story.tsx;
