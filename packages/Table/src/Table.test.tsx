import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import Table, { ITableProps, LinkProps, SortDir } from './Table';
import TableSorter from './TableSorter';

describe('<Table />', () => {
	interface IData {
		id: number;
		name: string;
		count: number;
	}

	let props: ITableProps<IData>;
	let first = null;
	beforeEach(() => {
		props = {
			dataLookupId: 'id',
			data: [
				{
					id: 1,
					name: 'sam',
					count: 1000,
				},
			],
			componentName: 'TestTable',
			sort: {
				dir: SortDir.DESC,
				key: 'name',
			},
			options: {
				fixedHeader: true,
				handleBodyRowClick: jest.fn(),
				cols: [
					{
						id: 'id',
						header: 'id',
						cellAccessor: 'id',
					},
					{
						id: 'name',
						header: 'name',
						cellAccessor: 'name',
					},
				],
				rowModifiers: jest.fn(),
			},
		};
		first = props.data[0];
	});

	it('renders block', () => {
		const { queryByTestId } = render(<Table {...props} />);
		expect(queryByTestId(props.componentName)).toBeTruthy();
	});
	it('renders viewport', () => {
		const { queryByTestId } = render(<Table {...props} />);
		expect(queryByTestId('viewport')).toBeTruthy();
	});
	it('renders table', () => {
		const { queryByTestId } = render(<Table {...props} />);
		expect(queryByTestId('table')).toBeTruthy();
	});

	describe('sort', () => {
		it('sets sort context value to sort prop', () => {
			const key = 'count';
			props.sort.key = key;
			props.options.cols.push({
				id: key,
				cellAccessor: key,
				header: (
					<TableSorter sortKey={props.sort.key} handleClick={jest.fn()}>
						Test
					</TableSorter>
				),
			});
			const { queryByTestId } = render(<Table {...props} />);
			const elm = queryByTestId(`header-cell-${key}`);
			expect(getByTestId(elm, 'sort-desc')).toBeTruthy();
		});
	});

	describe('header', () => {
		describe('fixed', () => {
			describe('true', () => {
				beforeEach(() => {
					props.options.fixedHeader = true;
				});

				it('renders with header row with fixed modifier', () => {
					const { queryByTestId } = render(<Table {...props} />);
					expect(queryByTestId('header-row').className).toContain('is-fixed');
				});
				it('wraps header cell with fixed-content class', () => {
					const { queryAllByTestId } = render(<Table {...props} />);
					expect(queryAllByTestId('header-cell-fixed-content')).toBeTruthy();
				});
			});
			describe('false', () => {
				beforeEach(() => {
					props.options.fixedHeader = false;
				});
				it('renders with header row without fixed modifier', () => {
					const { queryByTestId } = render(<Table {...props} />);
					expect(queryByTestId('header-row').className).not.toContain(
						'is-fixed'
					);
				});
				it('does not wraps header cell with fixed-content class', () => {
					const { queryByTestId } = render(<Table {...props} />);
					expect(queryByTestId('header-cell-fixed-content')).not.toBeTruthy();
				});
			});
		});

		it('renders row using header-row class', () => {
			const { queryByTestId } = render(<Table {...props} />);
			expect(queryByTestId(`header-row`)).toBeTruthy();
		});

		it('renders cells using header-cell class', () => {
			const { queryAllByTestId } = render(<Table {...props} />);
			expect(queryAllByTestId(`header-cell`)).toBeTruthy();
		});

		it('renders cells using header-cell modifier class', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(queryByTestId(`header-cell-${col.id}`)).toBeTruthy();
			});
		});

		it('renders header text', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(queryByTestId(`header-cell-${col.id}`)).toHaveTextContent(
					col.header as string
				);
			});
		});

		it('renders header componet & passes block', () => {
			const key = 'count';
			props.options.cols.push({
				id: key,
				cellAccessor: key,
				header: block => (
					<div className={block('count')} data-testid={key}>
						Count
					</div>
				),
			});
			const { queryByTestId } = render(<Table {...props} />);
			expect(queryByTestId(key)).toBeTruthy();
			expect(queryByTestId(key)).toHaveTextContent('Count');
			expect(queryByTestId(key).className).toContain('count');
		});
	});

	describe('body', () => {
		it('generates a row for each item in data', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.data.forEach(row => {
				expect(queryByTestId(`body-row-${row.id}`)).toBeTruthy();
			});
		});

		describe('isSelected', () => {
			describe('false', () => {
				beforeEach(() => {
					first.isSelected = false;
				});

				it('does not add selected modifier to row', () => {
					const { queryByTestId } = render(<Table {...props} />);
					expect(queryByTestId(`body-row-${first.id}`).className).not.toContain(
						'is-selected'
					);
				});
			});
			describe('true', () => {
				beforeEach(() => {
					first.isSelected = true;
				});

				it('adds selected modifier to row', () => {
					const { queryByTestId } = render(<Table {...props} />);
					expect(queryByTestId(`body-row-${first.id}`).className).toContain(
						'is-selected'
					);
				});
			});
		});
		describe('rowModifiers', () => {
			it('can generate class modifier unique to each row', () => {
				const second = {
					id: 2,
					name: 'joe',
					count: 2000,
				};
				props.data.push(second);
				props.options.rowModifiers = r => {
					if (r.id === first.id) {
						return {
							first: true,
						};
					}
					return {};
				};
				const { queryByTestId } = render(<Table {...props} />);
				expect(queryByTestId(`body-row-${first.id}`).className).toContain(
					'first'
				);
				expect(queryByTestId(`body-row-${second.id}`).className).not.toContain(
					'first'
				);
			});
		});
		it('can click a row', () => {
			const { queryByTestId } = render(<Table {...props} />);
			const rowEl = queryByTestId(`body-row-${first.id}`);
			fireEvent.click(rowEl);
			expect(props.options.handleBodyRowClick).toHaveBeenCalledWith(first);
		});

		it('renders cells using table schema', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(queryByTestId(`body-cell-${first.id}-${col.id}`)).toBeTruthy();
			});
		});

		it('renders cells using body-cell class', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(
					queryByTestId(`body-cell-${first.id}-${col.id}`).className
				).toContain('body-cell');
			});
		});

		it('renders cells using body-cell modifier class', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(
					queryByTestId(`body-cell-${first.id}-${col.id}`).className
				).toContain(`body-cell--${col.id}`);
			});
		});

		it('renders cell using cellAccessor', () => {
			const { queryByTestId } = render(<Table {...props} />);
			props.options.cols.forEach(col => {
				expect(
					queryByTestId(`body-cell-${first.id}-${col.id}`)
				).toHaveTextContent(first[col.cellAccessor]);
			});
		});
		it('renders cell using cellRenderer', () => {
			const key = 'count';
			const output = row => row.name + row.count;
			const cellRenderer = (row, block) => (
				<span className={block('cell-renderer')}>{output(row)}</span>
			);
			props.options.cols.push({
				id: key,
				header: 'count',
				cellRenderer,
			});
			const { queryByTestId } = render(<Table {...props} />);
			props.data.forEach(row => {
				const rowEl = queryByTestId(`body-cell-${row.id}-${key}`);
				expect(rowEl).toHaveTextContent(output(row));
				expect(rowEl.children[0].className).toContain('cell-renderer');
			});
		});
	});

	describe('<Table.Link />', () => {
		let onClick = jest.fn();
		let linkProps: LinkProps;
		beforeEach(() => {
			onClick = jest.fn();
			linkProps = {
				testId: 'test',
				className: 'abc',
				children: 'test',
				onClick,
				something: 'toBubble',
			};
		});

		it('renders button', () => {
			const { queryByTestId } = render(<Table.Link {...linkProps} />);
			expect(queryByTestId(linkProps.testId)).toBeTruthy();
		});
		describe('onClick()', () => {
			it('bubbles event + props', () => {
				const { queryByTestId } = render(<Table.Link {...linkProps} />);
				fireEvent.click(queryByTestId(linkProps.testId));
				expect(onClick).toHaveBeenCalled();
				expect(onClick.mock.calls[0][0]).toMatchObject({
					something: linkProps.something,
				});
			});
		});
	});
});
