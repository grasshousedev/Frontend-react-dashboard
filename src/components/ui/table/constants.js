export const SCROLLBAR_SIZE = 16;

export const UI_TABLE_BASE_CLASS = 'ui-table';

export const SEARCH_OPERATORS = {
    IN: { value: 'IN', label: 'In' },
    EQ: { value: 'EQ', label: '=' },
    GTE: { value: 'GTE', label: '>=' },
    LTE: { value: 'LTE', label: '<=' },
};

export const SEARCH_TYPES = {
    STRING: 'string',
    NUMBER: 'number',
};

export const SEARCH_FILTER_OPERATORS = {
    [SEARCH_TYPES.STRING]: [SEARCH_OPERATORS.IN, SEARCH_OPERATORS.EQ],
    [SEARCH_TYPES.NUMBER]: [SEARCH_OPERATORS.EQ, SEARCH_OPERATORS.GTE, SEARCH_OPERATORS.LTE],
};
