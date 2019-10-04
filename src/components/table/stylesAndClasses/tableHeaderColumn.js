export function getColClass(baseClass, initialClasses, { isHovered }) {
    const hoveredClass = isHovered ? `${baseClass}--hovered` : '';

    return `${initialClasses} ${hoveredClass}`;
}

export function getColStyle(initialStyle, { isPinned }) {
    return {
        ...initialStyle,
        ...(isPinned ? { visibility: 'hidden' } : {})
    };
}

export function getCellClass(baseClass, initialClasses, { isHovered }) {
    const hoveredClass = isHovered ? `${baseClass}--hovered` : '';

    return `${initialClasses} ${hoveredClass}`;
}
