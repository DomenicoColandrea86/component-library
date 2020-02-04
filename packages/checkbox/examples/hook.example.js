import React, { useRef, useState } from 'react';
import { useMixedCheckbox } from '@rca-component-library/checkbox';
import '@rca-component-library/checkbox/styles.css';

let name = 'With useMixedCheckbox hook';

function Example() {
	const [checked, setChecked] = useState(true);
	let inputRef = useRef(null);
	let [inputProps] = useMixedCheckbox(inputRef, {
		checked,
		onChange: event => setChecked(event.target.checked),
	});
	return (
		<div>
			<label>
				<input {...inputProps} ref={inputRef} />
				How about this cool example?
			</label>
			<button onClick={() => setChecked('mixed')}>Mix it up</button>
		</div>
	);
}

Example.story = { name };
export const Comp = Example;
export default { title: 'Checkbox' };
