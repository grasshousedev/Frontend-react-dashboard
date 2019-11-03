/*
TABLE BODY
Component: TableBody
Description: generate style for the container and
    the body columns (TD) and cells (SPAN inside TD)
 */

export function getBodyContainerStyle(config) {
    const style = {};

    if (config.maxHeight)
        style.maxHeight = config.maxHeight;
    if (config.height)
        style.height = config.height;

    return style;
}

export function getBodyColClass(baseClass, { config, evenOrOdd }) {
    const borderClass = config.borderType ? `${baseClass}--${config.borderType}-border` : '';
    const evenOrOddClass = `${baseClass}--${evenOrOdd}`;
    const verticalAlignmentClass = config.verticalAlignment ? `${baseClass}--vertical-alignment-${config.verticalAlignment}` : '';
    const zebraClass = config.zebra && evenOrOdd === 'odd' ? `${baseClass}--zebra-dark` : '';

    return `${baseClass} ${borderClass} ${evenOrOddClass} ${verticalAlignmentClass} ${zebraClass}`;
}

export function getBodyCellClass(baseClass, { config }) {
    const singleLineClass = config.singleLine ? `${baseClass}--single-line` : '';

    return `${baseClass} ${singleLineClass}`;
}
