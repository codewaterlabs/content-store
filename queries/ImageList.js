import { gql } from 'apollo-boost';

const IMAGE_LIST = gql`
    {
        images {
            id,
            filename
        }
    }
`;

export default { IMAGE_LIST };