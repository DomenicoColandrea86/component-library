// import { checkStyles } from "@rcanalytics/utils";
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
	jest.unmock('@rcanalytics/utils');
	const utils = require('@rcanalytics/utils');
	utils.checkStyles = jest.fn();
});

afterEach(() => {
	//
});
