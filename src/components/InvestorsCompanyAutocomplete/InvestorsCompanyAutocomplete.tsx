import React from 'react';

import Downshift, {
	StateChangeOptions,
	ControllerStateAndHelpers,
	DownshiftState,
} from 'downshift';
import { b } from '../../utils/bem';
import { IBaseFields } from '../../models/base/fields';
import * as lodash from 'lodash';
import './InvestorsCompanyAutocomplete.scss';

const block = b.with('InvestorsCompanyAutocomplete');

export interface IInvestorsCompanyAutocompleteProps extends IBaseFields {
	handleClear?: (helpers: ControllerStateAndHelpers<any>) => void;
	stateReducer?: (
		state: DownshiftState<any>,
		changes: StateChangeOptions<any>
	) => Partial<StateChangeOptions<any>>;
	items?: any;
	isExpanded?: boolean;
	handleExpandToggle?: (isExpanded: boolean) => void;
}

export const propsFromAngular = (
	handleSelectedItem,
	getSuggestions,
	setItems?
): IInvestorsCompanyAutocompleteProps => {
	const internals = {
		handleInputValueChange: lodash.debounce(async inputValue => {
			if (inputValue.length < 2) return;

			const first20 = inputValue.substr(0, 20);
			const result = await getSuggestions(first20);
			const items = lodash.map(result, suggestion => ({
				text: suggestion.company_tx,
				html: suggestion.displayString,
				id: suggestion.company_id,
				value: suggestion,
			}));
			internals.setItems(items);
		}, 15),
		setItems: items => {
			if (setItems) {
				setItems(items);
			} else {
				internals.props.items = items;
			}
		},
		props: {
			items: [],
			stateReducer: (state, changes) => {
				if (changes.selectedItem) {
					if (handleSelectedItem(changes.selectedItem)) {
						internals.setItems([]);

						return {
							...changes,
							selectedItem: null,
							inputValue: '',
						};
					}

					return state;
				}

				switch (changes.type) {
					case Downshift.stateChangeTypes.changeInput:
						internals.handleInputValueChange(changes.inputValue);
						return changes;
					case Downshift.stateChangeTypes.keyDownEscape:
					case Downshift.stateChangeTypes.mouseUp:
						internals.setItems([]);
						return changes;
					default:
						return changes;
				}
			},
			handleClear: ({ reset }) => {
				reset();
				internals.setItems([]);
			},
			isExpanded: false,
			handleExpandToggle: lodash.noop,
			testId: 'company-name-search',
		} as IInvestorsCompanyAutocompleteProps,
	};

	return internals.props;
};

const InvestorsCompanyAutocomplete = ({
	testId,
	stateReducer,
	handleClear,
	isExpanded,
	handleExpandToggle,
	items,
}: IInvestorsCompanyAutocompleteProps) => {
	return (
		<div className={block({ 'is-expanded': isExpanded })} data-testid={testId}>
			<Downshift
				defaultHighlightedIndex={0}
				stateReducer={stateReducer}
				itemToString={item => (item && item.text) || ''}
			>
				{downshift => {
					const {
						getInputProps,
						getItemProps,
						getMenuProps,
						isOpen,
						inputValue,
						highlightedIndex,
					} = downshift;
					return (
						<div>
							<div className={block('search-input-container')}>
								<input
									{...getInputProps({
										placeholder: 'Enter Company or Name(s)',
										className: `${block('search-input')} form-control`,
										'data-testid': `${testId}-search-input`,
									})}
								/>
								<div className={block('search-icon-container')}>
									{!!inputValue ? (
										<button
											className={block('clear-button')}
											onClick={() => handleClear(downshift)}
											data-testid={`${testId}-clear-button`}
										>
											<span
												className={`glyphicon glyphicon-remove-circle ${block(
													'input-icon'
												)}`}
											/>
										</button>
									) : (
										<button
											className={block('search-button')}
											onClick={() => handleExpandToggle(!isExpanded)}
											data-testid={`${testId}-search-button`}
										>
											<img
												className={block('input-icon', { search: true })}
												src={
													isExpanded
														? '/assets/images/iconMagnifyGlassActive.png'
														: '/assets/images/iconMagnifyGlass.svg'
												}
											/>
										</button>
									)}
								</div>
							</div>
							{isOpen && items.length > 0 ? (
								<ul
									{...getMenuProps({
										className: block('suggestion-list'),
									})}
									data-testid={`${testId}-suggestion-list`}
								>
									{items.map((item, index) => {
										return (
											<li
												{...getItemProps({
													key: item.id,
													index,
													item,
													className: block('suggestion-item', {
														'is-highlighted': highlightedIndex === index,
													}),
												})}
												data-testid={`${testId}-suggestion-item`}
											>
												<img
													className={block('suggestion-item-icon')}
													src="/assets/images/iconAutoCompany.svg"
													data-testid={`${testId}-suggestion-icon`}
												/>
												<div
													className={block('suggestion-item-text')}
													data-testid={`${testId}-suggestion-text`}
													dangerouslySetInnerHTML={{ __html: item.html }}
												/>
											</li>
										);
									})}
								</ul>
							) : null}
						</div>
					);
				}}
			</Downshift>
		</div>
	);
};
export default InvestorsCompanyAutocomplete;
