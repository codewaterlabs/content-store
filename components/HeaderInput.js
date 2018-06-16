import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
    textField: {
        fontSize: 35
    }
};

class HeaderInput extends React.Component {
    render() {
        console.log(this.props);
        const { classes } = this.props;
        return (
            <TextField
                label="Heading"
                id="heading"
                InputProps={{
                    classes: {
                        input: classes.textField
                    }
                }}
                fullWidth />
        )
    }
}

export default withStyles(styles)(HeaderInput);