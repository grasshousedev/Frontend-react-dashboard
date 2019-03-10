import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/hopscotch.css';

const registeredLanguages = {};

export class CodeHighlight extends Component {
    constructor(props) {
        super(props);

        this.state = { loaded: false };
        this.codeNode = React.createRef();
    }

    componentDidMount() {
        const { language } = this.props;
        if (language && !registeredLanguages[language]) {
            try {
                const newLanguage = require(`highlight.js/lib/languages/${language}`);
                hljs.registerLanguage(language, newLanguage);
                registeredLanguages[language] = true;
                this.setState(
                    () => { return { loaded: true }; },
                    () => { this.highlight(); }
                );                
            } catch (e) {
                console.error(e);
                throw Error(`Cannot register and higlight language ${language}`);
            }
        } else {
            this.setState({ loaded: true });
        }
    }

    componentDidUpdate() {
        this.highlight();
    }

    highlight = () => {
        this.codeNode && this.codeNode.current && hljs.highlightBlock(this.codeNode.current);
    }

    render() {
        const { language, children } = this.props;
        const { loaded } = this.state;
        if (!loaded) return '';

        return <pre>
            <code ref={this.codeNode} className={language}>{children}</code>
        </pre>;
    }
}

CodeHighlight.propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string,
};
CodeHighlight.defaultProps = {
    language: 'javascript',
};