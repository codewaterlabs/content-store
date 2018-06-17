import { LinearProgress, Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CREATE_USER } from "../queries/User"
import { Mutation } from "react-apollo"
import { Formik, Form, Field } from "formik"
import TextField from "../components/formik/TextField"
import * as yup from "yup"
import { auth } from "../src/session";
import Typography from "@material-ui/core/Typography";
import { Router } from "../src/routes"

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
                            mutate({
                                variables: {
                                    name: values.name,
                                    email: values.email,
                                    password: values.password
                                }
                            }).then(
                                ({ data }) => {
                                    console.log(data)
                                    auth(data.signup.token, data.signup.user.name)
                                    Router.pushRoute("/editor")
                                },
                                error => {
                                    setSubmitting(false)
                                    console.log(error)
                                }
                            )
                        }}
                        render={({ handleSubmit, isSubmitting, values }) => (
                            <Form>
                                <Paper style={{ width: 400, margin: "auto", marginTop: 50, padding: 25 }}>
                                    <Typography variant="headline">Create user</Typography>
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
                                    {isSubmitting && <LinearProgress />}
                                    <Button
                                        variant="raised"
                                        type="submit"
                                        color="primary"
                                        onClick={handleSubmit} disabled={isSubmitting}>
                                        Create user
                                    </Button>
                                    <Button onClick={() => Router.pushRoute('/')}>
                                        Login
                                    </Button>
                                </Paper>
                            </Form>
                        )}
                    />
                )}
            </Mutation>
        )
    }
}