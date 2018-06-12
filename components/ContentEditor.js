import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Head from 'next/head';
import Button from 'material-ui/Button';

const emptyContentState = convertFromRaw({
    entityMap: {},
    blocks: [
        {
            text: '',
            key: 'contentRoot',
            type: 'unstyled',
            entityRanges: [],
        },
    ],
});

const styles = {
    button: {
        border: "1px solid #999",
        padding: 2,
        display: "inline-block",
        cursor: "pointer"
    }
};

class EditButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            console.log(this.props);
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        return (
            <div style={styles.button} onMouseDown={this.onToggle}>
                {this.props.label}
            </div>
        )
    }
}

class EditToolbar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <EditButton label="Heading" style="header-two" onToggle={this.props.onToggle} />
                <Button variant="flat" color="primary" onClick={() => this.props.onToggle("header-two")}>
                    Header
                </Button>
            </div>
        )
    }
}

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createWithContent(emptyContentState) };
        this.onChange = (editorState) => {
            this.setState({ editorState })
            console.log(convertToRaw(editorState.getCurrentContent()));
        };
        this.toggleBlock = this._toggleBlock.bind(this);
    }

    _toggleBlock(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <link key="draftcss" rel="stylesheet" href="/static/Draft.css" />
                </Head>
                <EditToolbar onToggle={this.toggleBlock} />
                <div style={{ border: '1px solid black', padding: 10 }}>
                    <Editor
                        editorKey="editor1"
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder="Write something!"
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor