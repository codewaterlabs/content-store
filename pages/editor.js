import React from 'react'
import withRoot from '../src/withRoot'
import HeaderInput from '../components/HeaderInput'
import ImageList from '../components/ImageList'
import ContentEditor from '../components/ContentEditor'
import { Button } from '@material-ui/core';
import { Router } from '../src/routes'
import { Query, Mutation } from 'react-apollo';
import { POST, UPSERT_POST, POST_LIST } from '../queries/Post';
import { Formik, Form } from 'formik';
import * as yup from "yup"
import { convertToRaw } from 'draft-js';

class PostEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { existing, data, regEditorState, isSubmitting, handleSubmit } = this.props
        return (
            <div>
                <HeaderInput />
                <ContentEditor regEditorState={regEditorState} />
                <Button
                    color="primary"
                    variant="raised"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}>
                    Save
                </Button>
                <Button onClick={() => Router.pushRoute('/content-list')}>
                    Content list
                </Button>
                <ImageList />
            </div>
        )
    }
}


class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.editorState = null
    }

    static async getInitialProps({ query }) {
        return { id: query.id }
    }

    editor = (id, regEditorState, isSubmitting, handleSubmit) => {
        if (id) {
            console.log("id", id)
            return (
                <Query query={POST} variables={{ id }} fetchResults={false}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        console.log("Data", data)
                        return (
                            <PostEditor
                                existing={true}
                                data={data}
                                regEditorState={regEditorState}
                                isSubmitting={isSubmitting}
                                handleSubmit={handleSubmit} />
                        )
                    }}
                </Query>
            )
        } else {
            return (
                <PostEditor
                    existing={false}
                    data={null}
                    regEditorState={regEditorState}
                    isSubmitting={isSubmitting}
                    handleSubmit={handleSubmit} />
            )
        }
    }

    render() {
        const { id } = this.props
        return (
            <Mutation mutation={UPSERT_POST}>
                {(mutate) => (
                    <Formik
                        validationSchema={yup.object().shape({
                            title: yup.string().required()
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            let variables = {
                                title: values.title,
                                text: JSON.stringify(convertToRaw(this.editorState.getCurrentContent()))
                            }
                            if (id) {
                                variables.id = id
                            }
                            console.log("Test", variables)
                            mutate({
                                variables,
                                refetchQueries: [{
                                    query: POST_LIST
                                }]
                            }).then(
                                ({ data }) => {
                                    console.log(data)
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
                                {this.editor(id, (edState) => this.editorState = edState, isSubmitting, handleSubmit)}
                            </Form>
                        )} />
                )}
            </Mutation>
        )
    }
}

export default withRoot(MyEditor);