import { LinearProgress, Paper } from "material-ui";
import { Button } from "material-ui";
import { CREATE_USER } from "../queries/User"
import { Mutation } from "react-apollo"
import { Formik, Form, Field } from "formik"
import TextField from "../components/formik/TextField"
import * as yup from "yup"
import { auth } from "../src/session";
import Typography from "material-ui/Typography";
import Router from "next/router"

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
                                data => {
                                    console.log(data)
                                    auth(data.signup.token, data.signup.name)
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
                                    <Button variant="raised" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                                        Create user
                                    </Button>
                                    <Button onClick={() => Router.push({ pathname: '/' })}>
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