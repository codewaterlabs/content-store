import { Dialog, LinearProgress } from "material-ui";
import { DialogTitle } from "material-ui";
import { DialogContent } from "material-ui";
import { DialogContentText } from "material-ui";
import { DialogActions } from "material-ui";
import { Button } from "material-ui";
import { CREATE_USER } from "../queries/User"
import { Mutation } from "react-apollo"
import { Formik, Form, Field } from "formik"
import TextField from "../components/formik/TextField"
import * as yup from "yup"

export default class SignupDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Mutation mutation={CREATE_USER}>
                {mutate => (
                    <Formik
                        validationSchema={yup.object().shape({
                            name: yup.string().required(),
                            email: yup.string().email().required(),
                            password: yup.string().required()
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                setSubmitting(false)
                                console.log(values)
                            }, 2000)
                        }}
                        render={({ handleSubmit, isSubmitting, values }) => (
                            <Form>
                                <Dialog
                                    open={this.props.open}
                                    onClose={this.props.handleClose}
                                >
                                    <DialogTitle>Create user</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Create user
                                    </DialogContentText>
                                        <Field
                                            name="name"
                                            label="Name"
                                            fullWidth
                                            component={TextField} />
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
                                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                                            Create user
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