import UserBuilder from './user.builder';

export default class User {

    firstName: string
    lastName: string
    email: string
    username: string
    weight: number
    height: number
    avatar: string
    birth: Date
    createdAt: Date
    followers: string
    following: string
    gender: string

    constructor(builder : UserBuilder) {
        this.firstName = builder.firstName
        this.lastName = builder.lastName
        this.email = builder.email
        this.username = builder.username
        this.weight = builder.weight
        this.height = builder.height
        this.avatar = builder.avatar
        this.birth = builder.birth
        this.createdAt = builder.createdAt
        this.followers = builder.followers
        this.following = builder.following
        this.gender = builder.gender
    }

}