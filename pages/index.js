import React from 'react'
import ReactDOM from 'react-dom'
import withRoot from '../src/withRoot'
import LoginDialog from "../components/LoginDialog"

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LoginDialog />
            </div>
        );
    }
}

export default withRoot(Index);