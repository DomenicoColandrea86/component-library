import { getByTestId, queryByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import TableSorter, { ITableSorterProps } from './TableSorter';
import { SortContext, SortDir } from './Table';

describe('<TableSorterSorter />', () => {
	let props: ITableSorterProps;
	beforeEach(() => {
		props = {
			sortKey: 'test',
			children: 'hello',
			handleClick: jest.fn(),
		};
	});

	const getEl = (sortDir = null): HTMLElement => {
		const sort = {
			key: sortDir === null ? 'somethingelse' : props.sortKey,
			dir: sortDir,
		};
		const { queryByTestId } = render(
			<SortContext.Provider value={sort}>
				<TableSorter {...props} />
			</SortContext.Provider>
		);
		const el = queryByTestId(props.sortKey as string);
		expect(el).toBeTruthy();
		return el;
	};

	it('renders block', () => {
		expect(getEl().className).toContain('TableSorter');
	});

	it('renders children', () => {
		expect(getEl()).toHaveTextContent(props.children as string);
	});

	describe('multi', () => {
		beforeEach(() => {
			props.multi = 'right';
		});

		it('renders children in multi-container', () => {
			const el = getEl();
			const multi = getByTestId(el, 'multi-container');
			expect(multi).toBeTruthy();
		});

		it('applies multi modifier to block', () => {
			const el = getEl();
			expect(el.className).toContain(props.multi);
		});
	});

	describe('is sorted', () => {
		it('renders asc icon', () => {
			const el = getEl(SortDir.ASC);
			expect(getByTestId(el, 'sort-asc')).toBeTruthy();
		});
		it('renders desc icon', () => {
			const el = getEl(SortDir.DESC);
			expect(getByTestId(el, 'sort-desc')).toBeTruthy();
		});
	});

	describe('is not sorted', () => {
		it('does not render asc icon', () => {
			const el = getEl();
			expect(queryByTestId(el, 'sort-asc')).not.toBeTruthy();
		});
		it('does not render desc icon', () => {
			const el = getEl();
			expect(queryByTestId(el, 'sort-desc')).not.toBeTruthy();
		});
	});

	describe('onClick', () => {
		it('calls handle click with sort key + current direction', () => {
			const sortDir = SortDir.ASC;
			const el = getEl(sortDir);
			fireEvent.click(el);
			expect(props.handleClick).toHaveBeenCalledWith({
				sortDir,
				sortKey: props.sortKey,
			});
		});
	});
});
