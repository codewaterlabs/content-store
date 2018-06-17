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
        const userId = getUserId(ctx)
        const { stream, filename } = await image
        await storeUpload({ stream, filename })
        console.log("Filename: ", filename);
        return ctx.db.mutation.createImage(
            {
                data: {
                    filename,
                    user: {
                        connect: { id: userId }
                    }
                }
            },
            info
        )
    },
    async deleteImage(parent, { id }, ctx: Context, info) {
        //const userId = getUserId(ctx)
        const imageExists = await ctx.db.exists.Image({
            id,
        })
        if (!imageExists) {
            throw new Error(`Image not found`)
        }

        return ctx.db.mutation.deleteImage({ where: { id } })
    },
}
