import React from 'react';
import { Table, TableSorter, handleSortClick } from '@rcanalytics/table';
import '@rcanalytics/table/styles.css';
import './styles.scss';

const name = 'Fixed';

function Example() {
	const handleCellClick = ({ event }) => event.preventDefault();
	let data = [
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			city: 'New York',
			state: 'NY',
			countryCode: 'USA',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			city: 'Parachute',
			state: 'CO',
			countryCode: 'USA',
			size: 49024,
			comments:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			city: 'Carollington',
			state: 'TX',
			countryCode: 'USA',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			city: 'Westerville',
			state: 'OH',
			countryCode: 'USA',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			city: 'Allen',
			state: 'TX',
			countryCode: 'USA',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet, consectetur.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			city: 'McDonough',
			state: 'GA',
			countryCode: 'USA',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		},
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			city: 'New York',
			state: 'NY',
			countryCode: 'USA',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			city: 'Carollington',
			state: 'TX',
			countryCode: 'USA',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			city: 'Westerville',
			state: 'OH',
			countryCode: 'USA',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			city: 'Parachute',
			state: 'CO',
			countryCode: 'USA',
			size: 49024,
			comments:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			city: 'Allen',
			state: 'TX',
			countryCode: 'USA',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet, consectetur.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			city: 'McDonough',
			state: 'GA',
			countryCode: 'USA',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		},
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			city: 'New York',
			state: 'NY',
			countryCode: 'USA',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			city: 'Carollington',
			state: 'TX',
			countryCode: 'USA',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			city: 'Westerville',
			state: 'OH',
			countryCode: 'USA',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet tempor.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			city: 'Parachute',
			state: 'CO',
			countryCode: 'USA',
			size: 49024,
			comments:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			city: 'Allen',
			state: 'TX',
			countryCode: 'USA',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet, consectetur.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			city: 'McDonough',
			state: 'GA',
			countryCode: 'USA',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		},
	];
	let schema = [
		{
			id: 'date',
			header: (
				<TableSorter sortKey={1} handleClick={handleSortClick}>
					Date
				</TableSorter>
			),
			cellRenderer: row => row.date,
		},
		{
			id: 'property-name',
			header: (
				<TableSorter sortKey={1} handleClick={handleSortClick}>
					Property Name
				</TableSorter>
			),
			cellRenderer: (row, block) => (
				<Table.Link
					testId={`table-link-${row.loanNumber}`}
					className={block('table-link')}
					onClick={handleCellClick}
					row={row}
				>
					{row.propertyName}
				</Table.Link>
			),
		},
		{
			id: 'property-geo',
			header: (
				<React.Fragment>
					<TableSorter sortKey={2} handleClick={handleSortClick}>
						City,&nbsp;
					</TableSorter>
					<TableSorter sortKey={3} handleClick={handleSortClick}>
						State
					</TableSorter>
					<span>&nbsp;/&nbsp;</span>
					<TableSorter sortKey={4} handleClick={handleSortClick}>
						Country
					</TableSorter>
				</React.Fragment>
			),
			cellRenderer: (row, block) => (
				<React.Fragment>
					{row.city && (
						<span className={block('body-geo-city')}>{row.city}</span>
					)}
					{row.state && (
						<span className={block('body-geo-state')}>{row.state}</span>
					)}
					<span className={block('body-geo-country')}>{row.countryCode}</span>
				</React.Fragment>
			),
		},
		{
			id: 'size',
			header: (
				<TableSorter sortKey={6} handleClick={handleSortClick}>
					Size
				</TableSorter>
			),
			cellRenderer: (row, block) => (
				<React.Fragment>
					{row.size} <span className={block('qualifier')}>units</span>
				</React.Fragment>
			),
		},
		{
			id: 'comments',
			header: (
				<TableSorter sortKey={8} handleClick={handleSortClick}>
					Comments
				</TableSorter>
			),
			cellRenderer: row => row.comments,
		},
	];
	let props = {
		dataLookupId: 'id',
		data: data,
		componentName: 'TestTable--fixed',
		sort: {
			dir: 1,
			key: 'property-name',
		},
		options: {
			fixedHeader: true,
			handleBodyRowClick: () => false,
			cols: schema,
			rowModifiers: () => false,
		},
	};
	return <Table {...props} />;
}

Example.story = { name };
export const Comp = Example;
export default { title: 'Table' };
