import React from 'react';
import ReactDOM from 'react-dom';
import { RichUtils, Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Head from 'next/head';
import Button from 'material-ui/Button';
import withRoot from '../src/withRoot';
import DropZone from 'react-dropzone';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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

class ImageList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
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

const uploadFileMutation = gql`
    mutation($image: Upload!) {
        uploadImage(image: $image) {
            id
        }
    }
`;

const onDrop = (acceptedFiles, rejectedFiles) => {

}

const ImageUpload = () =>
    <Mutation mutation={uploadFileMutation}>
        {mutate => (
            <DropZone onDrop={(acceptedFiles, rejectedFiles) => {
                const image = acceptedFiles[0];
                mutate({ variables: { image } })
            }}>
                <p>Upload image</p>
            </DropZone>
        )}
    </Mutation>

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
                <ImageUpload />
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

export default withRoot(MyEditor);