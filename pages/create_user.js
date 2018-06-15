import React from 'react'
import withRoot from '../src/withRoot'
import SignupDialog from "../components/SignupDialog"

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SignupDialog />
            </div>
        );
    }
}

export default withRoot(Index);