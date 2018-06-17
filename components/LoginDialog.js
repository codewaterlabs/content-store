import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { LOGIN } from "../queries/User";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import TextField from "../components/formik/TextField"
import * as yup from "yup"
import { LinearProgress } from "@material-ui/core";
import { auth } from "../src/session"
import Typography from "@material-ui/core/Typography";
import { Router } from "../src/routes"

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
                                ({ data }) => {
                                    console.log(data)
                                    auth(data.login.token, data.login.user.name)
                                    Router.pushRoute("/content-list")
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
                                    <Typography variant="headline">Login</Typography>
                                    <Field
                                        name="email"
                                        label="Email address"
                                        type="email"
                                        fullWidth
                                        autoFocus={true}
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
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}>
                                        Login
                                    </Button>
                                    <Button onClick={() => Router.pushRoute('/create-user')}>
                                        Create account
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