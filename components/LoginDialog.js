import { Dialog } from "material-ui";
import { DialogTitle } from "material-ui";
import { DialogContent } from "material-ui";
import { DialogContentText } from "material-ui";
import { DialogActions } from "material-ui";
import { Button } from "material-ui";
import { LOGIN } from "../queries/User";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import TextField from "../components/formik/TextField"
import * as yup from "yup"
import { LinearProgress } from "material-ui";

export default class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Mutation mutation={LOGIN}>
                {mutate => (
                    <Formik
                        validationSchema={yup.object().shape({
                            email: yup.string().email().required(),
                            password: yup.string().required()
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            mutate({
                                variables: {
                                    email: values.email,
                                    password: values.password
                                }
                            }).then(
                                data => {
                                    console.log(data)
                                    localStorage.setItem('token', data.data.login.token)
                                    localStorage.setItem('user', data.data.login.user.name)
                                    setSubmitting(false)
                                },
                                error => {
                                    setSubmitting(false)
                                    console.log(error)
                                }
                            )
                        }}
                        render={({ handleSubmit, isSubmitting, values }) => (
                            <Form>
                                <Dialog
                                    open={this.props.open}
                                    onClose={this.props.handleClose}
                                >
                                    <DialogTitle>Login</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Login
                                    </DialogContentText>
                                        <Field
                                            name="email"
                                            label="Email address"
                                            type="email"
                                            fullWidth
                                            component={TextField} />
                                        <Field
                                            name="password"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            component={TextField} />
                                    </DialogContent>
                                    {isSubmitting && <LinearProgress />}
                                    <DialogActions>
                                        <Button onClick={this.props.handleClose}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSubmit}>
                                            Login
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Form>
                        )}
                    />
                )}
            </Mutation>
        )
    }
}