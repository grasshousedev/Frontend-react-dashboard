export function getHeaderColumnClass(baseClass, { config }) {
    const borderClass = config.borderType ? `${baseClass}--${config.borderType}-border` : '';

    return `${baseClass} ${borderClass}`;
}

export function getHeaderCellClass(baseClass, { config }) {
    const singleLineClass = config.singleLine ? `${baseClass}--single-line` : '';

    return `${baseClass} ${singleLineClass}`;
}

export function getContainerClass(baseClass, containerConfig) {
    const other = containerConfig && containerConfig.classes ? containerConfig.classes : '';

    return `${baseClass} ${other}`;
}