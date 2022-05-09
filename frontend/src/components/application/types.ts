export type postType = {
    name: string,
    description: string
}

export type actionType = {
    type: string,
    name: string
    post: postType,
    posts: postType[]
}