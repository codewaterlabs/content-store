import { withStyles } from '@material-ui/core/styles'
import TextField from './formik/TextField'
import { Field } from 'formik';

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
            <Field
                label="Heading"
                name="title"
                InputProps={{
                    classes: {
                        input: classes.textField
                    }
                }}
                fullWidth
                component={TextField} />
        )
    }
}

export default withStyles(styles)(HeaderInput)