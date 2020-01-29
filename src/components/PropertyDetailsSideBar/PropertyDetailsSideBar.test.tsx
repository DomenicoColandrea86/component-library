import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import PropertyDetailsSideBar, {
	LoanEventIds,
	LoanEventTypes,
	componentName,
	IPropertyDetailsSideBarProps,
} from './PropertyDetailsSideBar';
import { render, fireEvent, wait } from '@testing-library/react';
import { Loan } from './data';

describe('<PropertyDetailsSideBar />', () => {
	let props: IPropertyDetailsSideBarProps;
	beforeEach(() => {
		props = {
			testId: 'Test',
			isOpen: true,
			loan: Loan,
			handleClose: jest.fn(),
		};
	});

	const getCloseButton = queryByTestId =>
		queryByTestId(`${props.testId}-close-button`);
	const getContent = queryByTestId => queryByTestId(`${props.testId}-content`);
	const getHeader = queryByTestId => queryByTestId(`${props.testId}-header`);
	const getBtnGroup = queryByTestId =>
		queryByTestId(`${props.testId}-btn-group`);
	const getComments = queryByTestId =>
		queryByTestId(`${props.testId}-comments`);
	const getWatchListBtn = queryByTestId =>
		queryByTestId(`${props.testId}-${LoanEventTypes.Watchlist}-btn`);
	const getSpecialServicingBtn = queryByTestId =>
		queryByTestId(`${props.testId}-${LoanEventTypes.SpecialServicing}-btn`);
	const getREOBtn = queryByTestId =>
		queryByTestId(`${props.testId}-${LoanEventTypes.REO}-btn`);
	const mockFuncs = {
		formatFinancingSummary: jest.fn(),
		formatCurrency: jest.fn(),
		formatInterest: jest.fn(),
		showDate: jest.fn(),
		formatDate: jest.fn(),
		formatFinancingComments: jest.fn(),
		formatLoanAmount: jest.fn(),
		formatQualifier: jest.fn(),
	};
	const mockComment =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	const watchlistHeaderString = `Loan is on the ${LoanEventTypes.Watchlist}`;
	const specialServicingHeaderString = `Loan is in ${LoanEventTypes.SpecialServicing}`;
	const reoHeaderString = `The lender has taken control of the property`;

	it('should render correctly', () => {
		expect(render(<PropertyDetailsSideBar {...props} />)).toMatchSnapshot();
	});

	it('should render with the correct classes', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(queryByTestId(props.testId)).toHaveClass(componentName);
		expect(getCloseButton(queryByTestId)).toHaveClass(
			`${componentName}__close`
		);
		expect(getContent(queryByTestId)).toHaveClass(`${componentName}__content`);
		expect(getHeader(queryByTestId)).toHaveClass(`${componentName}__header`);
		expect(getBtnGroup(queryByTestId)).toHaveClass(
			`${componentName}__btn-group`
		);
		expect(getWatchListBtn(queryByTestId)).toHaveClass(`${componentName}__btn`);
		expect(getSpecialServicingBtn(queryByTestId)).toHaveClass(
			`${componentName}__btn`
		);
		expect(getREOBtn(queryByTestId)).toHaveClass(`${componentName}__btn`);
		expect(getComments(queryByTestId)).toHaveClass(
			`${componentName}__comments`
		);
	});

	it('should set close button test id', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(getCloseButton(queryByTestId)).toBeTruthy();
	});

	it('should set content test id', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(getContent(queryByTestId)).toBeTruthy();
	});

	it('should set header test id', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(getHeader(queryByTestId)).toBeTruthy();
	});

	it('should set button group test id', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(getBtnGroup(queryByTestId)).toBeTruthy();
	});

	it('should set comments test id', () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(getComments(queryByTestId)).toBeTruthy();
	});

	it('should have correct modifier class', async () => {
		const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
		expect(queryByTestId(props.testId)).toHaveClass(
			`${componentName}--is-open`
		);
	});

	describe('close button', () => {
		it('should call handleClose', async () => {
			const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
			const button = getCloseButton(queryByTestId);
			fireEvent.click(button);
			await wait(() => expect(props.handleClose).toHaveBeenCalled());
		});
	});

	describe('watchlist', () => {
		beforeEach(() => {
			props.loan = {
				...Loan,
				...mockFuncs,
				loanEventId: LoanEventIds.Watchlist,
				loanEvent: LoanEventTypes.Watchlist,
				watchlistComments: mockComment,
				specialServicerComments: null,
				reoComments: null,
			};
		});

		describe('header', () => {
			it('should display correct string', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getHeader(queryByTestId)).toHaveTextContent(
					watchlistHeaderString
				);
			});
		});

		describe('btn-group', () => {
			it('should set correct modifier classes', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getWatchListBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn--active`
				);
				expect(getSpecialServicingBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn`
				);
				expect(getREOBtn(queryByTestId)).toHaveClass(`${componentName}__btn`);
			});
		});
	});

	describe('special servicing', () => {
		beforeEach(() => {
			props.loan = {
				...Loan,
				...mockFuncs,
				loanEventId: LoanEventIds.SpecialServicing,
				loanEvent: LoanEventTypes.SpecialServicing,
				watchlistComments: mockComment,
				specialServicerComments: mockComment,
				reoComments: null,
			};
		});

		describe('header', () => {
			it('should display correct string', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getHeader(queryByTestId)).toHaveTextContent(
					specialServicingHeaderString
				);
			});
		});

		describe('btn-group', () => {
			it('should set correct modifier classes', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getWatchListBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn--active`
				);
				expect(getSpecialServicingBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn`
				);
				expect(getREOBtn(queryByTestId)).toHaveClass(`${componentName}__btn`);
			});
		});
	});

	describe('reo', () => {
		beforeEach(() => {
			props.loan = {
				...Loan,
				...mockFuncs,
				loanEventId: LoanEventIds.REO,
				loanEvent: LoanEventTypes.REO,
				watchlistComments: mockComment,
				specialServicerComments: mockComment,
				reoComments: mockComment,
			};
		});

		describe('header', () => {
			it('should display correct string', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getHeader(queryByTestId)).toHaveTextContent(reoHeaderString);
			});
		});

		describe('btn-group', () => {
			it('should set correct modifier classes', async () => {
				const { queryByTestId } = render(<PropertyDetailsSideBar {...props} />);
				expect(getWatchListBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn--active`
				);
				expect(getSpecialServicingBtn(queryByTestId)).toHaveClass(
					`${componentName}__btn`
				);
				expect(getREOBtn(queryByTestId)).toHaveClass(`${componentName}__btn`);
			});
		});
	});
});
