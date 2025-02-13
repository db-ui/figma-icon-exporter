#!/usr/bin/env node

import {fieOptions} from './data';
import {OptionsType} from '../types';
import startProgram from '../program';
import exportIcons from './index';

const action = async (_: string, options: { _optionValues: OptionsType }) => {
	const values = options._optionValues;
	await exportIcons(values);
};

startProgram(
	'@db-ux/fie - Figma Icon Exporter',
	'CLI to export icons from figma file',
	fieOptions,
	action
);
