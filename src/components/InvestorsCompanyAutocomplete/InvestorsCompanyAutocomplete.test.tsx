import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import InvestorsCompanyAutocomplete, {
	IInvestorsCompanyAutocompleteProps,
	propsFromAngular,
} from './InvestorsCompanyAutocomplete';
import { render, fireEvent, wait } from '@testing-library/react';

describe('<InvestorsCompanyAutocomplete />', () => {
	let props: IInvestorsCompanyAutocompleteProps;
	beforeEach(() => {
		props = {
			testId: 'Test',
			items: [],
			isExpanded: false,
			handleExpandToggle: jest.fn(),
			handleClear: jest.fn(),
		};
	});

	const getInput = queryByTestId =>
		queryByTestId(`${props.testId}-search-input`);
	const getList = queryByTestId =>
		queryByTestId(`${props.testId}-suggestion-list`);
	const getClearButton = queryByTestId =>
		queryByTestId(`${props.testId}-clear-button`);
	const getSearchButton = queryByTestId =>
		queryByTestId(`${props.testId}-search-button`);

	it('should render with the correct classes', () => {
		const { queryByTestId } = render(
			<InvestorsCompanyAutocomplete {...props} />
		);
		expect(queryByTestId(props.testId)).toHaveClass(
			'InvestorsCompanyAutocomplete'
		);
	});

	it('should set search input test id', () => {
		const { queryByTestId } = render(
			<InvestorsCompanyAutocomplete {...props} />
		);
		expect(queryByTestId(`${props.testId}-search-input`)).toBeTruthy();
	});

	describe('clear button', () => {
		it('should be displayed when input value is not empty', () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			let button = getClearButton(queryByTestId);
			expect(button).toBeFalsy();
			fireEvent.change(input, { target: { value: 'hello ' } });
			button = getClearButton(queryByTestId);
			expect(button).toBeTruthy();
		});

		it('should call handleClear with downshift', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			const button = getClearButton(queryByTestId);
			fireEvent.click(button);
			await wait(() => expect(props.handleClear).toHaveBeenCalled());
		});
	});

	describe('search button', () => {
		it('should be displayed when input is empty', () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			let button = getSearchButton(queryByTestId);
			expect(button).toBeTruthy();
			fireEvent.change(input, { target: { value: 'hello ' } });
			button = getSearchButton(queryByTestId);
			expect(button).toBeFalsy();
		});

		it('should call handleExpandToggle', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const button = getSearchButton(queryByTestId);
			fireEvent.click(button);
			await wait(() =>
				expect(props.handleExpandToggle).toHaveBeenCalledWith(!props.isExpanded)
			);
		});

		it('should display expanded icon when expanded', async () => {
			props.isExpanded = true;
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const button = getSearchButton(queryByTestId);
			expect(button.children[0]).toHaveAttribute(
				'src',
				'/assets/images/iconMagnifyGlassActive.png'
			);
		});

		it('should display regular icon when not expanded', async () => {
			props.isExpanded = false;
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const button = getSearchButton(queryByTestId);
			expect(button.children[0]).toHaveAttribute(
				'src',
				'/assets/images/iconMagnifyGlass.svg'
			);
		});
	});

	describe('suggstions', () => {
		beforeEach(() => {
			props.items = [
				{
					id: 1,
					text: 'First',
					html: `<span>First</span>`,
				},
				{
					id: 2,
					text: 'Second',
					html: `<span>Second</span>`,
				},
				{
					id: 3,
					html: `<span>Third</span>`,
				},
			];
		});

		it('should open when input changed', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			const list = getList(queryByTestId);
			expect(list).toBeFalsy();
			fireEvent.change(input, { target: { value: 'hello ' } });
			await wait(() => expect(getList(queryByTestId)).toBeTruthy());
		});

		it('should display each suggestion', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			await wait(() => {
				const list = getList(queryByTestId);
				expect(list.children[0]).toHaveTextContent('First');
				expect(list.children[1]).toHaveTextContent('Second');
			});
		});

		it('should default first item highlighted', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			await wait(() => {
				const list = getList(queryByTestId);
				expect(list.children[0]).toHaveClass(
					'InvestorsCompanyAutocomplete__suggestion-item InvestorsCompanyAutocomplete__suggestion-item--is-highlighted'
				);
			});
		});

		it('should select item when clicked', async () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			await wait(async () => {
				const list = getList(queryByTestId);
				fireEvent.click(list.children[0]);
				expect(input).toHaveValue(props.items[0].text);
			});
		});

		it('should select item when clicked even if text empty', async () => {
			props.items = [
				{
					id: 1,
				},
			];
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			await wait(async () => {
				const list = getList(queryByTestId);
				fireEvent.click(list.children[0]);
				expect(input).toHaveValue('');
			});
		});
	});

	describe('propsFromAngular()', () => {
		let handleSelectedItem;
		let getSuggestions;
		beforeEach(() => {
			handleSelectedItem = jest.fn();
			getSuggestions = jest.fn();
			props = propsFromAngular(handleSelectedItem, getSuggestions);
			props.items = [
				{
					id: 1,
					text: 'text',
					html: 'html',
				},
			];
		});

		it('sets test id', () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			expect(queryByTestId(props.testId)).toHaveClass(
				'InvestorsCompanyAutocomplete'
			);
		});

		const showList = () => {
			const { queryByTestId } = render(
				<InvestorsCompanyAutocomplete {...props} />
			);
			const input = getInput(queryByTestId);
			fireEvent.change(input, { target: { value: 'hello ' } });
			return { queryByTestId };
		};

		describe('clear button', () => {
			const setup = async () => {
				const { queryByTestId } = showList();
				await wait(() => expect(getList(queryByTestId)).toBeTruthy());
				const clearButton = getClearButton(queryByTestId);
				fireEvent.click(clearButton);
				return { queryByTestId };
			};

			it('closes the suggestion list', async () => {
				const { queryByTestId } = await setup();
				await wait(() => expect(getList(queryByTestId)).toBeFalsy());
			});
			it('clears the items', async () => {
				await setup();
				expect(props.items).toEqual([]);
			});
			it('clears the input', async () => {
				const { queryByTestId } = await setup();
				await wait(() => expect(getInput(queryByTestId)).toHaveValue(''));
			});
		});

		describe('selecting an item', () => {
			const setup = async () => {
				const { queryByTestId } = showList();
				await wait(() => {
					const list = getList(queryByTestId);
					expect(list).toBeTruthy();
					fireEvent.click(list.children[0]);
				});

				return { queryByTestId };
			};

			describe('it is handled', () => {
				beforeEach(() => {
					handleSelectedItem.mockReturnValue(true);
				});

				it('clears the items', async () => {
					await setup();
					await wait(() => {
						expect(props.items).toEqual([]);
					});
				});
				it('clears the input', async () => {
					const { queryByTestId } = await setup();
					await wait(() => {
						expect(getInput(queryByTestId)).toHaveValue('');
					});
				});
			});

			describe('it is not handled', () => {
				beforeEach(() => {
					handleSelectedItem.mockReturnValue(false);
				});

				it('does not clears the items', async () => {
					await setup();
					await wait(() => {
						expect(props.items).not.toEqual([]);
					});
				});
				it('does not clear the input', async () => {
					const { queryByTestId } = await setup();
					await wait(() => {
						expect(getInput(queryByTestId)).not.toHaveValue('');
					});
				});
			});
		});

		describe('input change', () => {
			const value = 'hello';
			const setup = () => {
				const out = render(<InvestorsCompanyAutocomplete {...props} />);
				const input = getInput(out.queryByTestId);
				fireEvent.change(input, { target: { value } });
				return out;
			};

			it('calls get suggestions', async () => {
				setup();
				await wait(() => {
					expect(getSuggestions).toHaveBeenCalledWith(value);
				});
			});
			it('renders suggestions', async () => {
				const result = [
					{
						company_tx: 'company_tx',
						displayString: '<strong>Sam</strong>',
						company_id: '1234',
					},
				];
				getSuggestions.mockResolvedValue(result);
				const { queryByTestId, rerender } = setup();
				await wait(() => {
					rerender(<InvestorsCompanyAutocomplete {...props} />);
					const list = getList(queryByTestId);
					expect(list.children[0]).toHaveTextContent('Sam');
				});
			});
		});

		const setupList = () => {
			const out = render(<InvestorsCompanyAutocomplete {...props} />);
			const input = getInput(out.queryByTestId);
			fireEvent.change(input, { target: { value: 'hello' } });
			return out;
		};

		describe('mouse up', () => {
			const setupMouseUp = () => {
				const out = setupList();
				const { container } = out;
				fireEvent.mouseUp(container.parentElement);
				return out;
			};

			it('clears the items', async () => {
				setupMouseUp();
				await wait(() => {
					expect(props.items).toEqual([]);
				});
			});
			it('clears the input', async () => {
				const { queryByTestId } = setupMouseUp();
				await wait(() => {
					expect(getInput(queryByTestId)).toHaveValue('');
				});
			});
		});

		describe('escape', () => {
			const escapeSetup = () => {
				const out = setupList();
				const { queryByTestId } = out;
				const input = getInput(queryByTestId);
				fireEvent.keyDown(input, { key: 'Escape' });
				return out;
			};

			it('clears the items', async () => {
				escapeSetup();
				await wait(() => {
					expect(props.items).toEqual([]);
				});
			});
			it('clears the input', async () => {
				const { queryByTestId } = escapeSetup();
				await wait(() => {
					expect(getInput(queryByTestId)).toHaveValue('');
				});
			});
		});
	});
});
