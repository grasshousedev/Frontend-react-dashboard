import { SEARCH_OPERATORS, SEARCH_TYPES } from "../constants";

export function filterHandler(entries, filters, searchConfig) {

    if (!filters || filters.length === 0) return entries;
    const { fields_map } = searchConfig;

    const filtered = entries.filter(singleEntry => {
        const entry = singleEntry._entry ? singleEntry._entry : singleEntry;

        for (let filter of filters) {
            const { field, operator, value } = filter;

            switch (operator) {
                case SEARCH_OPERATORS.IN.value: {
                    if (Array.isArray(entry[field])) {
                        return entry[field].includes(value);
                    } else
                    if (typeof entry[field] === 'string') {
                        return entry[field].indexOf(value) >= 0;
                    }
                    break;
                }
                case SEARCH_OPERATORS.EQ.value: {
                    if (typeof entry[field] === 'string') {
                        if (fields_map[field].operator_type === SEARCH_TYPES.STRING)
                            return entry[field] === value;
                        if (fields_map[field].operator_type === SEARCH_TYPES.NUMBER)
                            return parseFloat(entry[field]) === parseFloat(value);
                    }
                    break;
                }
                case SEARCH_OPERATORS.GTE.value: {
                    if (fields_map[field].operator_type === SEARCH_TYPES.NUMBER) {
                        return parseFloat(entry[field]) >= parseFloat(value);
                    }
                    break;
                }
                case SEARCH_OPERATORS.LTE.value: {
                    if (fields_map[field].operator_type === SEARCH_TYPES.NUMBER) {
                        return parseFloat(entry[field]) <= parseFloat(value);
                    }
                    break;
                }
                default: {}
            }
        }

        return false;
    });

    return filtered;
}
