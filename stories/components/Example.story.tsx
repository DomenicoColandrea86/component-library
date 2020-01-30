import React from 'react';
import { storiesOf } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import Example from '../../src/components/Example/Example';

storiesOf('Example', module)
	.addDecorator(jsxDecorator)
	.add('Default', () => <Example />)
	.add('Custom', () => <Example title="Custom Title" />);
