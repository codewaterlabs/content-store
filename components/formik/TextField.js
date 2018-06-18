import { TextField } from "@material-ui/core"

export default class FTextField extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, onChange, onBlur } = this.props.field
        const { touched, errors, isSubmitting } = this.props.form
        return (
            <TextField
                label={this.props.label}
                fullWidth={this.props.fullWidth}
                error={touched[name] && !!errors[name]}
                helperText={errors[name] ? errors[name] : this.props.helperText}
                disabled={isSubmitting}
                onChange={onChange}
                onBlur={onBlur}
                type={this.props.type}
                InputProps={this.props.InputProps}
                name={name} />
        )
    }
}