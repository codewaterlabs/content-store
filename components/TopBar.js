import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import { getCookie, logout } from '../src/session';
import Router from "next/router"

export default class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginOpen: false,
            signupOpen: false
        }
    }

    handleSignupClose = () => {
        this.setState({ signupOpen: false })
    }

    handleSignupOpen = () => {
        this.setState({ signupOpen: true })
    }

    handleLoginClose = () => {
        this.setState({ loginOpen: false })
    }

    handleLoginOpen = () => {
        this.setState({ loginOpen: true })
    }

    handleLogout = () => {
        logout()
        Router.push({ pathname: "/" })
    }

    render() {
        const user = getCookie("name");
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {user && (
                            <div>
                                user
                                <Button onClick={this.handleLogout}>Logout</Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div >
        )
    }
}