import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import SignupDialog from './SignupDialog';
import LoginDialog from './LoginDialog';

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

    render() {
        const user = localStorage.getItem('user');
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button onClick={this.handleLoginOpen}>Login</Button>
                        <Button onClick={this.handleSignupOpen}>Create user</Button>
                        <LoginDialog open={this.state.loginOpen} handleClose={this.handleLoginClose} />
                        <SignupDialog open={this.state.signupOpen} handleClose={this.handleSignupClose} />
                        {user && user}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}