/**
 * Welcome to @rcanalytics/table!
 *
 * Accessible components to build custom tables in React.
 *
 * @see Source   https://github.com/rcanalytics/component-library/tree/master/packages/table
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#table
 */

import Table, {
	SortContext,
	ITableProps,
	ITableCols,
	ITableSort,
	ISelectable,
	LinkProps,
	SortDir,
	LinkOnClickProps,
} from './Table';

import TableSorter, {
	TableSorterHandleClick,
	ITableSorterProps,
} from './TableSorter';

export {
	Table,
	ITableProps,
	ITableCols,
	ITableSort,
	ISelectable,
	LinkProps,
	LinkOnClickProps,
	TableSorter,
	SortDir,
	SortContext,
	TableSorterHandleClick,
	ITableSorterProps,
};
