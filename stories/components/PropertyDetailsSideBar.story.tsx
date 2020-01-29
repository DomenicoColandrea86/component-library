import React from 'react';
import { storiesOf } from '@storybook/react';
import PropertyDetailsSideBar, {
	IPropertyDetailsSideBarProps,
} from '../../src/components/PropertyDetailsSideBar/PropertyDetailsSideBar';
import { Loan } from '../../src/components/PropertyDetailsSideBar/data';
import '../styles/styles.scss';

const props: IPropertyDetailsSideBarProps = {
	testId: 'Story',
	isOpen: true,
	loan: Loan,
	handleClose: () => (props.isOpen = false),
};

storiesOf('PropertyDetailsSideBar', module)
	.add('Opened', () => <PropertyDetailsSideBar {...props} />)
	.add('Closed', () => (
		<PropertyDetailsSideBar {...{ ...props, isOpen: false }} />
	));
