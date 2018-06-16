import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import { getCookie, logout, UserContext } from '../src/session';
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
        return (
            <div>
                <UserContext.Consumer>
                    {({ token, name }) => (
                        <AppBar position="static">
                            <Toolbar>
                                {token && (
                                    <span>
                                        <span>{name}</span>
                                        <Button onClick={this.handleLogout}>Logout</Button>
                                    </span>
                                )}
                            </Toolbar>
                        </AppBar>
                    )}
                </UserContext.Consumer>
            </div >
        )
    }
}