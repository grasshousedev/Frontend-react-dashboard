import { SEARCH_TYPES } from "../constants";

const DEFAULT_TYPE = SEARCH_TYPES.STRING;

export function getSearchConfig(columns, config) {
    if (!config.searchBar) return {};

    const fields = columns
        .filter(col => !col.search || !col.search.exclude)
        .map(col => {
            const value = col.prop;
            const label = col.title || (col.search ? col.search.title || value : value);
            const operator_type = col.search ? col.search.type || DEFAULT_TYPE : DEFAULT_TYPE;

            return { value, label, operator_type };
        });

    const fields_map = fields.reduce((fm, field) => ({ ...fm, [field.value]: field }), {});

    return {
        fields,
        fields_map,
    };
}
