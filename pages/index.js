import React from 'react'
import ReactDOM from 'react-dom'
import withRoot from '../src/withRoot'
import HeaderInput from '../components/HeaderInput'
import ImageList from '../components/ImageList'
import ContentEditor from '../components/ContentEditor'
import TopBar from '../components/TopBar'

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopBar />
                <HeaderInput />
                <ContentEditor />
                <ImageList />
            </div>
        );
    }
}

export default withRoot(MyEditor);