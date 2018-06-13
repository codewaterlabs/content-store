import { Dialog, TextField } from "material-ui";
import { DialogTitle } from "material-ui";
import { DialogContent } from "material-ui";
import { DialogContentText } from "material-ui";
import { DialogActions } from "material-ui";
import { Button } from "material-ui";

export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Login
                    </DialogContentText>
                    <TextField
                        id="email"
                        label="Email address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleLogin}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}