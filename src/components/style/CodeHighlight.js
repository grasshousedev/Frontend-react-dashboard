import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
//import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

const registeredLanguages = {};

export class CodeHighlight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            visible: props.toggle && props.toggle.initial === true,
        };
        this.codeNode = React.createRef();
    }

    componentDidMount() {
        const { language } = this.props;
        if (language && !registeredLanguages[language]) {
            try {
                const languages = [];
                if (language === 'jsx') {
                    languages.push('javascript');
                    languages.push('xml');
                } else {
                    languages.push([language]);
                }
                languages.forEach(languageToAdd => {
                    const newLanguage = require(`highlight.js/lib/languages/${languageToAdd}`);
                    hljs.registerLanguage(languageToAdd, newLanguage);
                    registeredLanguages[languageToAdd] = true;
                });
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
        const { language, children, toggle } = this.props;
        const { loaded, visible } = this.state;
        if (!loaded) return '';

        const showCode = !toggle || visible;
        const toggleStyle = { marginBottom: '0.5rem', cursor: 'pointer' };
        return <Fragment>
            {toggle &&
                <div onClick={() => this.setState({ visible: !visible })} style={toggleStyle}>
                    {visible ? 'Hide code' : 'View code'}
                </div>
            }
            {showCode &&
                <pre>
                    <code
                        style={{ overflow: 'auto' }}
                        ref={this.codeNode} className={language}
                    >{children}</code>
                </pre>
            }
        </Fragment>;
    }
}

CodeHighlight.propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string,
    toggle: PropTypes.shape({
        initial: PropTypes.bool,
    }),
};

CodeHighlight.defaultProps = {
    language: 'javascript',
};