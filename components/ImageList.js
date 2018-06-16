import DropZone from 'react-dropzone';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { IMAGE_LIST } from '../queries/ImageList'

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
    constructor() {
        super();
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