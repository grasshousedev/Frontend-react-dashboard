export function createCategoriesTree(categoriesObj) {
    const categories = Object.values(categoriesObj);

    if (categories.length === 0) return [];

    const categoriesList = categories
        .filter(cat => cat.parent === null)
        .sort((c1, c2) => c1.name > c2.name ? 1 : -1)
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