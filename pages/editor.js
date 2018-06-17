import React from 'react'
import withRoot from '../src/withRoot'
import HeaderInput from '../components/HeaderInput'
import ImageList from '../components/ImageList'
import ContentEditor from '../components/ContentEditor'
import { Button } from '@material-ui/core';
import { Router } from '../src/routes'
import { Query } from 'react-apollo';
import { POST } from '../queries/Post';


class PostEditor extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { existing, data } = this.props
        return (
            <div>
                <HeaderInput />
                <ContentEditor />
                <Button color="primary" variant="raised" type="submit" onClick={() => null}>
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
    }

    static async getInitialProps({ query }) {
        return { id: query.id }
    }

    render() {
        const { id } = this.props
        if (id) {
            console.log("id", id)
            return (
                <Query query={POST} variables={{ id }} fetchResults={false}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        return (
                            <PostEditor existing={true} data={data} />
                        )
                    }}
                </Query>
            )
        } else {
            return <PostEditor existing={false} data={null} />
        }
    }
}

export default withRoot(MyEditor);