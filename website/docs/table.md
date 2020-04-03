---
id: table
title: Table
sidebar_label: Table
---

# @rcanalytics/table

[Source](https://www.npmjs.com/package/@rcanalytics/table) | [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#table)

Accessible components to build custom tables in React.

## Install
Using npm:
```
npm install @rcanalytics/table --save
```
Using yarn:

```javascript
yarn add @rcanalytics/table
```

## Simple
A simple example with no frills.

```javascript
import { Table } from '@rcanalytics/table';

<Table {...props} />
```

## Fixed Header
An example of a table with scrollable rows and fixed column headers.

```javascript
// table.js
import { Table, TableSorter } from '@rcanalytics/table';
  
let props = {
  data: [{
    name: 'Dom',
    birthday: '1986-02-19T00:00:00+00:00',
  }],
  componentName: 'FixedHeaderTable',
  options: {
    fixedHeader: true,
    cols: [{
      id: 'name',
      header: (
        <TableSorter sortKey={1} handleClick={handleSortClick}>
          Name
        </TableSorter>
      ),
      cellRenderer: (row, block) => (
        <Table.Link
          testId={`table-link-${row.loanNumber}`}
          className={block('table-link')}
          onClick={handleCellClick}
          row={row}
        >
          {row.name}
        </Table.Link>
      ),
    },
    {
      id: 'Birthday',
      header: (
        <TableSorter sortKey={1} handleClick={handleSortClick}>
          Birthday
        </TableSorter>
      ),
      cellAccessor: 'birthday',
    }]
  },
};

<Table {...props} />
```
```scss
// table.scss
@import "@rcanalytics/Table/Table.scss";

.FixedHeaderTable {
  // uses an exposed SASS Mixin, `Table()`
	@include Table(
		$fixed-header-height: 30px,
		$fixed-table-height: 600px
  );

```
