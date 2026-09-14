export const questionBase = [
   { id: 0, type: 'short-text', typeLabel: 'Short Text Input', inputType: 'string' },
   { id: 1, type: 'long-text', typeLabel: 'Long Text Input', inputType: 'string' },
   { id: 2, type: 'single-select-boolean', typeLabel: 'True or False', inputType: 'boolean' },
   { id: 3, type: 'single-select-text', typeLabel: 'Single Option From List (text)', inputType: 'string' },
   { id: 4, type: 'single-select-number', typeLabel: 'Single Option From List (number)', inputType: 'number' },
   { id: 5, type: 'multi-select', typeLabel: 'Multiple Options Checkbox', inputType: 'string' },
];

export enum QuestionTypes {
   'short-text',
   'long-text',
   'single-select-boolean',
   'single-select-text',
   'single-select-number',
   'multi-select',
}
