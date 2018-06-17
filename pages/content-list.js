import React from 'react'
import ReactDOM from 'react-dom'
import withRoot from '../src/withRoot'
import { Query } from 'react-apollo';
import { POST_LIST } from '../queries/Post';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { Router } from '../src/routes'

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={POST_LIST}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div>
                            <Button variant="fab" color="primary" onClick={() => Router.pushRoute('/editor')}>
                                <AddIcon />
                            </Button>
                            <List>
                                {data.posts.map(post => (
                                    <ListItem>
                                        <ListItemText primary={post.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    )
                }}
            </Query>
        );
    }
}

export default withRoot(MyEditor);