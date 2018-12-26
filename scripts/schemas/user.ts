import { Schema } from '../types/schema'

const schema: Schema = {
    model: 'user',
    properties: [
        {
            name: 'nickname',
            type: 'string',
            desc: 'Nickname'
        },
        {
            name: 'email',
            type: 'string',
            desc: 'Email'
        }
    ]
}

export default schema