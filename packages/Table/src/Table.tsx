import React from 'react';
import _ from 'lodash';
import { b } from '@rcanalytics/utils';
import './Table.scss';

export const SortContext = React.createContext({
	dir: null,
	key: null,
});

export interface ISelectable {
	isSelected?: boolean;
}

export interface ITableSort<S> {
	dir: SortDir;
	key: S;
}

export type ITableCols<T> = Array<{
	id: string;
	header: string | JSX.Element | Function;
	cellAccessor?: string;
	cellRenderer?: (row: T, block: any) => JSX.Element | string;
}>;

export interface ITableProps<T, S = string | number> {
	dataLookupId: string;
	data: Array<T & ISelectable>;
	componentName: string;
	sort?: ITableSort<S>;
	options: {
		fixedHeader?: boolean;
		handleBodyRowClick?: (row: T) => void;
		cols: ITableCols<T>;
		rowModifiers?: (row: T) => { [k: string]: boolean | string };
	};
}

export enum SortDir {
	ASC = 'ASC',
	DESC = 'DESC',
}

export default function Table<T>(props: ITableProps<T>) {
	const { data, dataLookupId, options, sort, componentName } = props;
	const { cols, handleBodyRowClick, rowModifiers = row => ({}) } = options;
	const block = b.with(componentName);
	return (
		<SortContext.Provider value={sort}>
			<div className={block()} data-testid={block()}>
				<div className={block('viewport')} data-testid={'viewport'}>
					<table className={block('table')} data-testid={'table'}>
						<thead>
							<tr
								data-testid={'header-row'}
								className={block('header-row', {
									'is-fixed': options.fixedHeader,
								})}
							>
								{cols.map(col => {
									const header =
										typeof col.header === 'function'
											? col.header(block)
											: col.header;
									return (
										<th
											key={col.id}
											data-testid={`header-cell-${col.id}`}
											className={block('header-cell', { [col.id]: true })}
										>
											{options.fixedHeader ? (
												<div
													className={block('header-cell-fixed-content')}
													data-testid="header-cell-fixed-content"
												>
													{header}
												</div>
											) : (
												header
											)}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{data.map(row => (
								<tr
									key={row[dataLookupId]}
									data-testid={`body-row-${row[dataLookupId]}`}
									className={block('body-row', {
										'is-selected': row.isSelected,
										...rowModifiers(row),
									})}
									onClick={
										handleBodyRowClick && (() => handleBodyRowClick(row))
									}
								>
									{cols.map(col => (
										<td
											key={`${row[dataLookupId]}-${col.id}`}
											data-testid={`body-cell-${row[dataLookupId]}-${col.id}`}
											className={block('body-cell', { [col.id]: true })}
										>
											{col.cellAccessor
												? _.get(row, col.cellAccessor)
												: col.cellRenderer
												? col.cellRenderer(row, block)
												: null}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</SortContext.Provider>
	);
}

export type LinkProps = {
	testId: string;
	className?: string;
	onClick: (opts: LinkOnClickProps) => void;
	children: JSX.Element | string;
	[prop: string]: any;
};

export type LinkOnClickProps = { event: any } & Omit<
	LinkProps,
	'testId' | 'className' | 'onClick' | 'children'
>;

Table.Link = ({
	testId,
	className,
	onClick,
	children,
	...props
}: LinkProps) => {
	return (
		<button
			data-testid={testId}
			className={className}
			onClick={event => onClick({ event, ...props })}
		>
			{children}
		</button>
	);
};
