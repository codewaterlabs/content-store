import { getUserId, Context } from '../../utils'
import { createWriteStream } from 'fs';

const storeUpload = ({ stream, filename }) =>
    new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream('./../uploads/' + filename))
            .on("finish", () => resolve())
            .on("error", reject)
    );

export const image = {
    async uploadImage(parent, { image }, ctx: Context, info) {
        //const userId = getUserId(ctx)
        const { stream, filename } = await image
        await storeUpload({ stream, filename })
        console.log("Filename: ", filename);
        return ctx.db.mutation.createImage(
            {
                data: {
                    filename
                }
            },
            info
        )
    },
}
