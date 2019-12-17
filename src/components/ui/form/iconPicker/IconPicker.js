import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { ModalTrigger } from '../../Modal';
import { Input } from '../Input';

import { ICONS_LIST } from './icons';

const ICON_PICKER_CLASS = 'ui-icon-picker';
const ICON_PICKER_TRIGGER_CONTAINER_CLASS = `${ICON_PICKER_CLASS}__trigger__container`;
const ICON_PICKER_TRIGGER_ICON_CLASS = `${ICON_PICKER_CLASS}__trigger__icon`;
const ICON_PICKER_CONTAINER_CLASS = `${ICON_PICKER_CLASS}__container`;
const ICON_PICKER_ICON_TILE_CLASS = `${ICON_PICKER_CLASS}__icon-tile`;
const ICON_PICKER_ICON_TILE_SELECTED_CLASS = `${ICON_PICKER_ICON_TILE_CLASS}--selected`;
const ICON_PICKER_ICON_CLASS = `${ICON_PICKER_ICON_TILE_CLASS}__icon`;
const ICON_PICKER_ICON_SELECTED_CLASS = `${ICON_PICKER_ICON_CLASS}--selected`;
const ICON_PICKER_ICON_TILE_DESCRIPTION_CLASS = `${ICON_PICKER_ICON_TILE_CLASS}__description`;
const ICON_PICKER_ICON_TILE_DESCRIPTION_NAME_CLASS = `${ICON_PICKER_ICON_TILE_DESCRIPTION_CLASS}__name`;
const ICON_PICKER_ICON_TILE_DESCRIPTION_CLEAN_NAME_CLASS = `${ICON_PICKER_ICON_TILE_DESCRIPTION_CLASS}__clean-name`;

const DEFAULT_VIEW_MODE = 'grid';
const DEFAULT_ICON_SIZE = 'big';
let CLEANED_ICON_NAMES = {};

export function IconPicker({ onPickConfirm, initialIcon='', containerProps={}, iconTileProps={} }) {
    const [selectedIcon, setSelectedIcon] = useState(initialIcon);
    const [search, setSearch] = useState('');
    const [iconSize, setIconSize] = useState(DEFAULT_ICON_SIZE);
    const [viewMode, setViewMode] = useState(DEFAULT_VIEW_MODE);

    useState(() => {
        for (let iconName of ICONS_LIST) {
            CLEANED_ICON_NAMES[iconName] = iconName.replace('_', ' ');
        };
    }, []);

    return <ModalTrigger
        Trigger={({ setViewModalWindow }) => {
            return <div className={`${ICON_PICKER_TRIGGER_CONTAINER_CLASS}`}>
                {initialIcon && <Icon name={initialIcon} size="small" className={ICON_PICKER_TRIGGER_ICON_CLASS} />}
                <Button classes={['small']} onClick={() => setViewModalWindow(true)}>Pick</Button>
                {initialIcon && <Button classes={['small']} onClick={() => onPickConfirm('')}>
                    <Icon name="close" size="small" />
                </Button>}
            </div>;
        }}
        getModalWindowProps={({ setViewModalWindow }) => {
            return {
                maximized: true,
                title: <div className="flex-container--middle">
                    Icon Picker
                    <Icon name="apps" size="small"
                        className={`cursor-pointer m-l-15 ${viewMode === 'grid' ? 'primary' : ''}`}
                        onClick={() => setViewMode('grid')}
                    />
                    <Icon name="format_list_bulleted" size="small"
                        className={`cursor-pointer m-l-5 m-r-15 ${viewMode === 'list' ? 'primary' : ''}`}
                        onClick={() => setViewMode('list')}
                    />
                    <Icon name="format_size" size="small"
                        className={`cursor-pointer m-r-15`}
                        onClick={() => setIconSize(iconSize === 'small'
                            ? 'normal'
                            : iconSize ==='normal' ? 'big' : 'small')}
                    />
                    <Input value={search}
                        style={{ maxWidth: 130 }}
                        onChange={e => setSearch(e.target.value)} placeholder="Search..."
                    />

                </div>,
                content: <IconSelector
                    selectedIcon={selectedIcon}
                    setSelectedIcon={setSelectedIcon}
                    containerProps={containerProps}
                    iconTileProps={{ iconSize, ...iconTileProps }}
                    search={search}
                    viewMode={viewMode}
                />,
                footer: <Fragment>
                    <div>
                        <div className="m-r-10 flex-container--middle" style={{ display: 'inline-flex' }}>
                            <span className="grey-d1">Selected</span>:
                            <span className="primary m-l-5 m-r-5">
                                {selectedIcon || 'No icon selected'}
                            </span>
                            {selectedIcon && <Icon size="small" name={selectedIcon} />}
                        </div>
                        <Button classes={['small']} onClick={() => setSelectedIcon('')}>Clear</Button>
                    </div>
                    <div>
                        <Button onClick={() => setViewModalWindow(false)}>Cancel</Button>
                        <Button classes='primary' onClick={() => {
                            onPickConfirm(selectedIcon);
                            setViewModalWindow(false);
                        }}>Confirm</Button>
                    </div>
                </Fragment>
            };
        }}
    />;
}

IconPicker.propTypes = {
    onPickConfirm: PropTypes.func.isRequired,
    initialIcon: PropTypes.string,
    viewMode: PropTypes.string,
    containerProps: PropTypes.object,
    iconTileProps: PropTypes.object,
};

function IconSelector({ selectedIcon='', setSelectedIcon, search='', viewMode=DEFAULT_VIEW_MODE, containerProps={}, iconTileProps={} }) {
    const containerClass = `${ICON_PICKER_CONTAINER_CLASS} ${containerProps.className || ''}`;

    return <div className={containerClass}>
        {ICONS_LIST
        .filter(iconName => {
            return !search || iconName.indexOf(search) >= 0 || CLEANED_ICON_NAMES[iconName].indexOf(search) >= 0;
        }).map(iconName => {
            const isSelected = iconName === selectedIcon;

            const { className, iconSize, iconClassName, ...iconTileRest } = iconTileProps;
            const selectedIconClass = isSelected
                ? `${isSelected ? ICON_PICKER_ICON_TILE_SELECTED_CLASS : ''}` : '';
            const iconTileClassName = `${ICON_PICKER_ICON_TILE_CLASS} ${ICON_PICKER_ICON_TILE_CLASS}--${viewMode} ${selectedIconClass} ${className || ''}`;
            const iconSize_ = iconSize || 'small';
            const iconClassName_ = `${iconClassName || ''} ${ICON_PICKER_ICON_CLASS} ${isSelected ? ICON_PICKER_ICON_SELECTED_CLASS : ''}`;

            return <div key={iconName}
                {...iconTileRest}
                className={iconTileClassName}
                onClick={() => {
                    setSelectedIcon(iconName);
                }}
            >
                <Icon size={iconSize_} name={iconName} className={iconClassName_} />
                {viewMode === 'list' && <div className={ICON_PICKER_ICON_TILE_DESCRIPTION_CLASS}>
                    <div className={ICON_PICKER_ICON_TILE_DESCRIPTION_NAME_CLASS}>{iconName}</div>
                    <div className={ICON_PICKER_ICON_TILE_DESCRIPTION_CLEAN_NAME_CLASS}>{CLEANED_ICON_NAMES[iconName]}</div>
                </div>}
            </div>;
        })}
    </div>;
}

IconSelector.propTypes = {
    selectedIcon: PropTypes.string,
    setSelectedIcon: PropTypes.func.isRequired,
    search: PropTypes.string,
    viewMode: PropTypes.string,
    containerProps: PropTypes.object,
    iconTileProps: PropTypes.object,
};