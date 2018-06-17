import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { getCookie, logout, UserContext } from '../src/session';
import { Router } from "../src/routes"


const UserControls = ({ userData, handleLogout }) => {
    if (userData.token) {
        return (
            <span>
                <span>{userData.name}</span>
                <Button onClick={handleLogout}>Logout</Button>
            </span>
        )
    } else {
        return null
    }
}

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
        Router.pushRoute("/")
    }

    render() {
        return (
            <div>
                <UserContext.Consumer>
                    {userData => (
                        <AppBar position="static">
                            <Toolbar>
                                <UserControls userData={userData} handleLogout={this.handleLogout} />
                            </Toolbar>
                        </AppBar>
                    )}
                </UserContext.Consumer>
            </div >
        )
    }
}