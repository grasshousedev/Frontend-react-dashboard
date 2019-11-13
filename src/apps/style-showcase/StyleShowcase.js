import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, useParams, useLocation, matchPath } from 'react-router-dom';

import { Badge } from 'components/ui/Badge';
import { Block } from 'components/ui/Blocks';
import { Breadcrumbs } from 'components/ui/Breadcrumbs';
import { Page } from 'components/ui/Page';
import { PageBody } from 'components/ui/PageBody';
import { PageHeader } from 'components/ui/PageHeader';
import { Sidebar } from 'components/ui/Sidebar';
import { SidebarMenu } from 'components/ui/SidebarMenu';

import { ShowCaseButton } from './components/ShowCaseButton';
import { ShowCaseCard } from './components/ShowCaseCard';
import { ShowCaseDropDown } from './components/ShowCaseDropDown';
import { ShowCaseLoaders } from './components/ShowCaseLoaders';
import { ShowCaseModal } from './components/ShowCaseModal';
import { ShowCaseSidebar } from './components/ShowCaseSidebar';
import { ShowCaseTable } from './components/ShowCaseTable';
import { ShowCaseTabs } from './components/ShowCaseTabs';
import { ShowCaseTiles } from './components/ShowCaseTiles';
import { Colors } from './Colors';
import { Typography } from './typography/Typography';
import { GridComponent } from './GridComponent';
import { TimelineComponent } from './TimelineComponent';

import './style-showcase.scss';
import { Panels } from './Panels';


const STYLE_SHOWCASE_URL = '/style-showcase';

const SECTIONS = {
    BADGE: { component: ComingSoon, label: 'Badges', comingSoon: true },
    BLOCKS: { component: ComingSoon, label: 'Blocks', comingSoon: true },
    BREADCRUMBS: { component: ComingSoon, label: 'Breadcrumbs', comingSoon: true },
    BUTTON: { component: ShowCaseButton, label: 'Buttons' },
    CARDS: { component: ShowCaseCard, label: 'Cards' },
    COLORS: { component: Colors, label: 'Colors' },
    DROP_DOWN: { component: ShowCaseDropDown, label: 'Drop Downs' },
    GRID_COMPONENT: { component: GridComponent, label: 'Grids' },
    GRID_SYSTEM: { component: ComingSoon, label: 'Grid System', comingSoon: true },
    LOADERS: { component: ShowCaseLoaders, label: 'Loaders' },
    MODAL: { component: ShowCaseModal, label: 'Modals' },
    PAGE: { component: ComingSoon, label: 'Page', comingSoon: true },
    PANELS: { component: Panels, label: 'Panels' },
    TABS: { component: ShowCaseTabs, label: 'Tabs' },
    TABLE: { component: ShowCaseTable, label: 'Tables' },
    TILES: { component: ShowCaseTiles, label: 'Tiles' },
    TIMELINE: { component: TimelineComponent, label: 'Timeline' },
    TYPOGRAPHY: { component: Typography, label: 'Typography' },
    SIDEBAR: { component: ShowCaseSidebar, label: 'Sidebar' },
    SIDEBAR_MENU: { component: ComingSoon, label: 'Sidebar Menu', comingSoon: true },
};


export function StyleShowcase() {
    const pageBodyRef = useRef(null);
    const { pathname } = useLocation();
    const routeMatch = matchPath(pathname, {
        path: `${STYLE_SHOWCASE_URL}/sectionName`,
        exact: true,
        strict: true
    });
    const sectionName = routeMatch ? routeMatch.params.sectionName : '';
    const sections = getNavigatorSections({ sectionName });

    return <Fragment>
        <div style={{ display: 'flex' }}>
            <Sidebar
                disableTrigger={true}
                initialStatus={'open'}
                top={() => ShowCaseSidebarNavigator({ sections })}
            />
            <Page style={{ width: 'calc(100% - 350px)'}}>
                <PageHeader scrollRef={pageBodyRef}>
                    <Breadcrumbs breadcrumbs={[
                        { link: '/', label: 'Dashboard' },
                        { label: 'Style Showcase' },
                    ]} />
                    Style Showcase
                </PageHeader>
                <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
                    <Switch>
                        <Route exact path={STYLE_SHOWCASE_URL} component={StyleShowcaseLanding} />
                        <Route path={`${STYLE_SHOWCASE_URL}/:sectionName`} component={StyleShowcaseComponentView} />
                    </Switch>
                </PageBody>
            </Page>
        </div>
    </Fragment>;
};


function StyleShowcaseLanding() {
    return <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
        <div>
            <h1>The main page is coming soon!</h1>
            <p>
                In the meantime, you can use the navigator to view the available documentation.
            </p>
        </div>
    </Block>;

}

function StyleShowcaseComponentView() {
    const { sectionName } = useParams();
    const sectionNameKey = sectionName.toUpperCase().replace('-', '_');

    if (!SECTIONS[sectionNameKey]) return <InvalidSection />;

    const SelectedComponent = SECTIONS[sectionNameKey].component;

    return <SelectedComponent />;

}


function ComingSoon() {
    return <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
        <h1>This component documentation is coming soon!</h1>
    </Block>;
}


function InvalidSection() {
    return <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
        <h1>This section does not exists.</h1>
    </Block>;
}

function getNavigatorSections() {
    const getItem = (section) => {
        return {
            ...SECTIONS[section],
            key: section,
            to: `${STYLE_SHOWCASE_URL}/${section.toLowerCase().replace('_', '-')}`,
        };
    };

    return [
        {
            title: 'Typography & Style',
            items: [
                getItem('TYPOGRAPHY'),
                getItem('PAGE'),
                getItem('BLOCKS'),
                getItem('COLORS'),
                getItem('GRID_SYSTEM'),
            ]
        },
        {
            title: 'Components',
            items: [
                getItem('BADGE'),
                getItem('BREADCRUMBS'),
                getItem('BUTTON'),
                getItem('DROP_DOWN'),
                getItem('CARDS'),
                getItem('TILES'),
                getItem('LOADERS'),
                getItem('TABS'),
                getItem('MODAL'),
                getItem('SIDEBAR'),
                getItem('SIDEBAR_MENU'),
            ]
        },
        {
            title: 'Data Visualization',
            items: [
                getItem('TABLE'),
                getItem('TIMELINE'),
            ]
        },
    ];
}


function ShowCaseSidebarNavigator({ sectionName, sections }) {
    return <SidebarMenu isPadded={true}>
        {sections.map((section, index) => {
            return <Fragment key={section.title}>
                {index > 0 && <SidebarMenu.Separator />}
                <SidebarMenu.Title>{section.title}</SidebarMenu.Title>
                {section.items.map(item => {
                    return <SidebarMenu.Entry
                        key={item.key}
                        isActive={item.key === sectionName}
                        tag={Link}
                        to={item.to}
                    >
                        {item.label}
                        {item.comingSoon &&
                            <Badge backgroundColor="blue" color="neutral-light-l2"
                                style={{ marginLeft: '10px' }}
                            >
                                Coming Soon
                            </Badge>
                        }
                    </SidebarMenu.Entry>;
                })}
            </Fragment>;
        })}
    </SidebarMenu>;
}

ShowCaseSidebarNavigator.propTypes = {
    sectionName: PropTypes.string,
    sections: PropTypes.array,
};
