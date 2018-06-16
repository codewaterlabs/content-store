import { Paper } from "material-ui";
import { Button } from "material-ui";
import { LOGIN } from "../queries/User";
import { Mutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import TextField from "../components/formik/TextField"
import * as yup from "yup"
import { LinearProgress } from "material-ui";
import { auth } from "../src/session"
import Typography from "material-ui/Typography";
import Router from "next/router"

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
                                    Router.push({ pathname: "/editor" })
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
                                        component={TextField} />
                                    <Field
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        component={TextField} />
                                    {isSubmitting && <LinearProgress />}
                                    <Button variant="raised" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                                        Login
                                    </Button>
                                    <Button onClick={() => Router.push({ pathname: '/create_user' })}>
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