import React, { useState, ReactElement } from 'react';
import { b } from '../../utils/bem';
import { IBaseFields } from '../../models/base/fields';
import './PropertyDetailsSideBar.scss';

export const componentName = 'PropertyDetailsSideBar';

const block = b.with(componentName);

export enum LoanEventIds {
	Outstanding = 1,
	Watchlist = 2,
	SpecialServicing = 3,
	REO = 4,
	PaidOff = 5,
}

export enum LoanEventTypes {
	Watchlist = 'Watchlist',
	SpecialServicing = 'Special Service',
	REO = 'REO',
}

export interface IPropertyDetailsSideBarProps extends IBaseFields {
	isOpen?: boolean;
	loan?: any;
	handleClose?: () => void;
}

const PropertyDetailsSideBar: React.FC<IPropertyDetailsSideBarProps> = ({
	testId,
	isOpen,
	loan,
	handleClose,
}): ReactElement => {
	const [selectedTab, setSelectedTab] = useState<string | null>(
		// Temporarily turning this off as per George's request in CD-23161 - see comments in ticket
		// Once data has been corrected we will revert, for now default to `Watchlist`
		// loan ? LoanEventTypes[LoanEventIds[loan.loanEventId]] : null
		LoanEventTypes.Watchlist
	);

	const isDisabled: (type: string) => boolean = type => {
		let disabled = false;
		switch (type) {
			case LoanEventTypes.Watchlist:
				disabled = !(
					loan &&
					loan.watchlistComments &&
					!!loan.watchlistComments.length
				);
				break;
			case LoanEventTypes.SpecialServicing:
				disabled = !(
					loan &&
					loan.specialServicerComments &&
					!!loan.specialServicerComments.length
				);
				break;
			case LoanEventTypes.REO:
				disabled = !(loan && loan.reoComments && !!loan.reoComments.length);
				break;
			default:
				throw new Error('Invalid loan event type');
		}
		return disabled;
	};

	const renderHeader: () => string = () => {
		let header = '';

		if (loan) {
			switch (loan.loanEventId) {
				case LoanEventIds.Outstanding:
					header = 'Loan is current';
					break;
				case LoanEventIds.Watchlist:
					header = `Loan is on the ${loan.loanEvent}`;
					break;
				case LoanEventIds.SpecialServicing:
					header = `Loan is in ${loan.loanEvent}`;
					break;
				case LoanEventIds.REO:
					header = 'The lender has taken control of the property';
					break;
				default:
					throw new Error(`Invalid loan event id: ${loan.loanEventId}`);
			}
		}
		return header;
	};

	const getComments = (type, text) => (!text ? `No ${type} comments` : text);

	const renderComments: () => JSX.Element = () => {
		let troubledComments = '';
		if (selectedTab && loan) {
			switch (selectedTab) {
				case LoanEventTypes.Watchlist:
					troubledComments = getComments(
						LoanEventTypes.Watchlist,
						loan.watchlistComments
					);
					break;
				case LoanEventTypes.SpecialServicing:
					troubledComments = getComments(
						LoanEventTypes.SpecialServicing,
						loan.specialServicerComments
					);
					break;
				case LoanEventTypes.REO:
					troubledComments = getComments(LoanEventTypes.REO, loan.reoComments);
					break;
				default:
					throw new Error('Invalid loan event type');
			}
			return <p>{troubledComments}</p>;
		}
	};

	const renderBtns: JSX.Element[] = Object.keys(LoanEventTypes)
		.map(key => LoanEventTypes[key])
		.map(type => (
			<a
				key={type}
				data-testid={`${testId}-${type}-btn`}
				onClick={() => setSelectedTab(type)}
				className={block('btn', {
					active: selectedTab === type,
					// Temporarily removing this feature as per George's request in CD-23161 - see comments in ticket
					// Once data has been corrected we will revert, for now remove `disabled` state
					// disabled: isDisabled(type),
				})}
			>
				{type}
			</a>
		));

	return (
		<div className={block({ 'is-open': isOpen })} data-testid={testId}>
			<button
				data-testid={`${testId}-close-button`}
				className={block('close')}
				onClick={handleClose}
			></button>
			<div data-testid={`${testId}-content`} className={block('content')}>
				<h1 data-testid={`${testId}-header`} className={block('header')}>
					{renderHeader()}
				</h1>
				<div data-testid={`${testId}-btn-group`} className={block('btn-group')}>
					{renderBtns}
				</div>
				<div data-testid={`${testId}-comments`} className={block('comments')}>
					{renderComments()}
				</div>
			</div>
		</div>
	);
};

export default PropertyDetailsSideBar;
