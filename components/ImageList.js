import DropZone from 'react-dropzone';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { IMAGE_LIST, DELETE_IMAGE } from '../queries/ImageList'
import { GridListTileBar, IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'

const uploadFileMutation = gql`
    mutation($image: Upload!) {
        uploadImage(image: $image) {
            id,
            filename
        }
    }
`;

const ImageUpload = () => (
    <Mutation mutation={uploadFileMutation}>
        {mutate => (
            <DropZone onDrop={(acceptedFiles, rejectedFiles) => {
                const image = acceptedFiles[0];
                mutate({
                    variables: { image },
                    refetchQueries: [{
                        query: IMAGE_LIST
                    }]
                })
            }}>
                <p>Upload image</p>
            </DropZone>
        )}
    </Mutation>);

class ImageList extends React.Component {
    state = {
        deleteOpen: false
    }

    constructor(props) {
        super(props);
    }

    handleDeleteOpen = () => {
        this.setState({
            deleteOpen: true
        })
    }

    handleDeleteClose = () => {
        this.setState({
            deleteOpen: false
        })
    }

    handleDelete = (id) => {

    }

    render() {
        return (
            <Query query={IMAGE_LIST}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div>
                            <GridList cols={3}>
                                {data.images.map(image => (
                                    <GridListTile key={image.id}>
                                        <img src={`/uploads/${image.filename}`} />
                                        <GridListTileBar
                                            title={image.filename}
                                            actionIcon={
                                                <IconButton onClick={this.handleDeleteOpen}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        />
                                        <Mutation mutation={DELETE_IMAGE}>
                                            {mutate =>
                                                <Dialog open={this.state.deleteOpen}>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Delete image {image.filename}?
                                                </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handleDeleteClose}>Cancel</Button>
                                                        <Button onClick={() => {
                                                            mutate({
                                                                variables: {
                                                                    id: image.id
                                                                },
                                                                refetchQueries: [{
                                                                    query: IMAGE_LIST
                                                                }]
                                                            }).then(
                                                                ({ data }) => this.handleDeleteClose(),
                                                                error => console.log(error)
                                                            )
                                                        }}>Delete</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            }
                                        </Mutation>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default () =>
    <div>
        <ImageUpload />
        <ImageList />
    </div>