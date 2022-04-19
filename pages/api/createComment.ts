// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Variables } from '../../constants'
import sanityClient from '@sanity/client'

const client = sanityClient(Variables.CONFIG_API);

export default async function createComment(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { _id, title, name, email, comment } = JSON.parse(req.body);

    try {
        await client.create({
            _type: 'comment',
            blog: {
                _type: 'reference',
                _ref: _id
            },
            title, name, email, comment
        });
    } catch (err) {
        return res.status(500).json({ message: "Bình luận chưa được đăng tải. Vui lòng thử lại sau!", err });
    }



    res.status(200).json({ message: 'Bình luận đã được tạo.' })
}
