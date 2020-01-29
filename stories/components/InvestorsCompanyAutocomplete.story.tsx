import React from 'react';
import { storiesOf } from '@storybook/react';
import InvestorsCompanyAutocomplete, {
	propsFromAngular,
} from '../../src/components/InvestorsCompanyAutocomplete/InvestorsCompanyAutocomplete';

const handleSelectedItem = item => {
	alert(`Selected Item:

    ${JSON.stringify(item)}
  `);
};

const getSuggestionsMock = input => {
	const results = [
		{
			company_tx: 'Black & Decker Corp',
			isLegalEntity: false,
			company_id: 'd7eeb4cc-235f-42d7-a145-3254564ed030',
			displayString: '<strong>Black</strong> & Decker Corp',
		},
		{
			company_tx: 'Black Diamond CRE & Dev',
			isLegalEntity: false,
			company_id: 'c03dc151-a769-4b21-bed4-cd648f5fc09d',
			displayString: '<strong>Black</strong> Diamond CRE & Dev',
		},
		{
			company_tx: 'Black Bear Management',
			isLegalEntity: false,
			company_id: 'f8956aea-d5da-42cf-aa8b-f459dacddbe3',
			displayString: '<strong>Black</strong> Bear Management',
		},
		{
			company_tx: 'Black Dog Holdings LLC',
			isLegalEntity: true,
			company_id: '1227117',
			displayString: '<strong>Black</strong> Dog Holdings LLC',
		},
	];
	return Promise.resolve(results);
};

const withBlack = () => {
	const [items, setItems] = React.useState([]);
	const props = propsFromAngular(
		handleSelectedItem,
		getSuggestionsMock,
		setItems
	);
	props.items = items;
	return <InvestorsCompanyAutocomplete {...props} />;
};

const withResponsive = () => {
	const [items, setItems] = React.useState([]);
	const [isExpanded, setIsExpanded] = React.useState(false);
	const props = propsFromAngular(
		handleSelectedItem,
		getSuggestionsMock,
		setItems
	);
	props.items = items;
	props.isExpanded = isExpanded;
	props.handleExpandToggle = () => setIsExpanded(c => !c);
	return <InvestorsCompanyAutocomplete {...props} />;
};

storiesOf('InvestorsCompanyAutocomplete', module)
	.add('Search Black', withBlack)
	.add('Responsive + Icon Toggle', withResponsive);
