import React from 'react';

import { PageBody } from 'components/ui/PageBody';
import { RowBlock, ColumnBlock, Block } from 'components/ui/Blocks';

import { FinanceWidgets } from './FinanceWidgets';

import { LuasForecast,  } from 'apps/luas/src/components/LuasForecast';
import { LuasMultiForecast } from 'apps/luas/src/components/LuasMultiForecast';
import { STATIONS } from 'apps/luas/src/constants';
// import { mockRequests } from 'apps/luas/tests/mock';
// mockRequests();


export function Home() {
    return <PageBody fullHeight={true}>
        <RowBlock>
            <ColumnBlock className="col-xs-12 col-md-4">
                <h1 style={{ textAlign: 'center' }}>LUAS</h1>
                <Block isOutstanding={true}>
                    <LuasForecast station={STATIONS.GAL} />
                </Block>
                <Block isOutstanding={true}>
                    <LuasMultiForecast stations={[STATIONS.DAW, STATIONS.STS, STATIONS.HAR]} />
                </Block>
            </ColumnBlock>
            <ColumnBlock className="col-xs-12 col-md-4">
                <h1 style={{ textAlign: 'center' }}>Finance</h1>
                <FinanceWidgets />
            </ColumnBlock>
            <ColumnBlock className="col-xs-12 col-md-4">
            </ColumnBlock>
        </RowBlock>
    </PageBody>;
}
