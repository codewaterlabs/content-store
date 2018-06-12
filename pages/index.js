import React from 'react';
import ReactDOM from 'react-dom';
import withRoot from '../src/withRoot';
import HeaderInput from '../components/HeaderInput';
import ImageList from '../components/ImageList'
import ContentEditor from '../components/ContentEditor'

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HeaderInput />
                <ContentEditor />
                <ImageList />
            </div>
        );
    }
}

export default withRoot(MyEditor);