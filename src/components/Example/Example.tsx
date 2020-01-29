import React from 'react';
import { b } from '../../utils/bem';
import { IBaseFields } from '../../models/base/fields';
import './Example.scss';

const block = b.with('Example');

export interface IExampleProps extends IBaseFields {
	title?: string;
}

const Example = ({ testId, title }: IExampleProps) => (
	<div className={block()} data-testid={testId}>
		<p>{title || 'Default Title'} 🔥</p>
	</div>
);
export default Example;
