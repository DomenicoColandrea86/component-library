import React from 'react';
import { Table } from '@rcanalytics/Table';
const name = 'No Frills';
function Example() {
	let data = [
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			size: 49024,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			size: 49024,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2019-01-01T20:44:27+0000',
			propertyName: 'Westin New York Grand Central',
			size: 774,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-07-01T20:44:27+0000',
			propertyName: 'Motel 6',
			size: 138443,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-06-01T20:44:27+0000',
			propertyName: 'InVentiv Health',
			size: 97000,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2018-09-01T20:44:27+0000',
			propertyName: 'Alenco',
			size: 49024,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2017-02-01T20:44:27+0000',
			propertyName: 'Experian Information Systems',
			size: 292700,
			comments: 'Lorem ipsum dolor sit amet.',
		},
		{
			date: '2016-01-01T20:44:27+0000',
			propertyName: 'Georgia Power Company',
			size: 111911,
			comments: 'Lorem ipsum dolor sit amet.',
		},
	];
	let schema = [
		{
			id: 'date',
			header: 'Date',
			cellAccessor: 'date',
		},
		{
			id: 'property-name',
			header: 'Property Name',
			cellAccessor: 'propertyName',
		},
		{
			id: 'size',
      header: 'Size',
      cellAccessor: 'size',
		},
		{
			id: 'comments',
      header: 'Comments',
      cellAccessor: 'comments',
		},
	];
	let props = {
		dataLookupId: 'id',
		data: data,
		componentName: 'TestTable--no-styles',
		sort: {
			dir: 1,
			key: 'property-name',
		},
		options: {
			fixedHeader: false,
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
