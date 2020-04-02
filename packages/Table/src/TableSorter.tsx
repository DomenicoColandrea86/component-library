import React from 'react';
import { b } from '@rcanalytics/utils';
import { SortContext, SortDir } from './Table';
import './TableSorter.scss';

const block = b.with('TableSorter');

const SortDirection = ({ dir }) => {
	switch (dir) {
		default:
			return null;
		case SortDir.DESC:
			return (
				<i
					data-testid="sort-desc"
					className={`${block('icon')} glyphicon glyphicon-triangle-bottom`}
				></i>
			);
		case SortDir.ASC:
			return (
				<i
					data-testid="sort-asc"
					className={`${block('icon')} glyphicon glyphicon-triangle-top`}
				></i>
			);
	}
};

export type TableSorterHandleClick = ({
	sortKey: string,
	sortDir: SortDir,
}) => void;

export interface ITableSorterProps {
	sortKey: string | number;
	children?: string | JSX.Element;
	handleClick: TableSorterHandleClick;
	multi?: 'right' | 'left';
}

export default function TableSorter(props: ITableSorterProps) {
	const { sortKey, children, handleClick, multi } = props;
	const sort = React.useContext(SortContext);
	return (
		<button
			data-testid={sortKey}
			className={block({ multi })}
			onClick={() => handleClick({ sortKey, sortDir: sort.dir })}
		>
			{sort.key === sortKey && <SortDirection {...sort} />}
			{multi ? (
				<span
					data-testid="multi-container"
					className={block('multi-container')}
				>
					{children}
				</span>
			) : (
				children
			)}
		</button>
	);
}
