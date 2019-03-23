export function createCategoriesTree(categories) {
    if (categories.length === 0) return [];

    const categoriesList = categories
        .filter(cat => cat.parent === null)
        .map(cat => { return { category: cat, children: createSubCategories(cat, categories) }; });

    return categoriesList;
}

function createSubCategories(category, categories) {
    const subCategories = categories.filter(cat => cat.parent === category.id);
    if (subCategories.length === 0) return [];

    const subCategoriesList = subCategories.map(cat => {
        return { category: cat, children: createSubCategories(cat, categories) };
    });

    return subCategoriesList;
}