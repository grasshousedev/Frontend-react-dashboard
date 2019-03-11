
import React, { Fragment } from 'react';
import { Lorem } from 'components/ui/Lorem';
import { CodeHighlight } from 'components/style/CodeHighlight';

const sectionSample = `// define a block, will have margin on top and bottom
// Note the columns created by flex on <p> tags
<div className="ui-section">
    <Lorem />
</div>
`;

const sectionDivSample = `// to avoid unwanted flex columns, wrap the Components inside a div
<div className="ui-section">
    <div><Lorem /></div>
</div>
`;

const sectionDivTitleSample = `// add the class ui-section__title to an header to remove top margin
<div className="ui-section">
    <div>
        <h2 className="ui-section__title">Title</h2>
        <Lorem />
    </div>
</div>
`;

const sectionTextSample = `// use ui-section__text inside ui-section to have a max width of 900
<div className="ui-section">
    <div className="ui-section__text">
        <Lorem />
    </div>
</div>
`;
const sectionColumnSample = `// use ui-section__column inside ui-section to have columns
<div className="ui-section">
    <div className="ui-section__column">
        <Lorem />
    </div>
    <div className="ui-section__column">
        <Lorem />
    </div>
    <div className="ui-section__column">
        <Lorem />
    </div>
</div>
`;


export function Sections() {
    return <Fragment>
        <h3>Description</h3>
        <div className="ui-section">
            <div className="ui-section__text">
                Sections are container for Components. By default, display property is set to flex.
            </div>
        </div>
        <h3>Examples</h3>
        <div className="ui-section">
            <Lorem />
        </div>
        <CodeHighlight>{sectionSample}</CodeHighlight>
        <hr className="ui-divider" />
        <div className="ui-section">
            <div><Lorem /></div>            
        </div>
        <CodeHighlight>{sectionDivSample}</CodeHighlight>
        <hr className="ui-divider" />
        <div className="ui-section">
            <div>
                <h2 className="ui-section__title">Title</h2>
                <Lorem />
            </div>
        </div>
        <CodeHighlight>{sectionDivTitleSample}</CodeHighlight>
        <hr className="ui-divider" />
        <div className="ui-section">
            <div className="ui-section__text">
                <Lorem />
            </div>
        </div>
        <CodeHighlight>{sectionTextSample}</CodeHighlight>
        <hr className="ui-divider" />
        <div className="ui-section">
            <div className="ui-section__column">
                <Lorem />
            </div>
            <div className="ui-section__column">
                <Lorem />
            </div>
            <div className="ui-section__column">
                <Lorem />
            </div>
        </div>
        <CodeHighlight>{sectionColumnSample}</CodeHighlight>
    </Fragment>;
};
