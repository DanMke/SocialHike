import User from './user';

export default class UserBuilder {

    firstName = ""
    lastName = ""
    email = ""
    username = ""
    weight = 0
    height = 0
    avatar = ""
    birth = new Date()
    createdAt = new Date()
    followers = ""
    following = ""
    gender = ""

    constructor(){
        
    }

    setFirstName(firstName: string){
        this.firstName = firstName
    }

    setLastName(lastName : string){
        this.lastName = lastName
    }

    setEmail(email: string){
        this.email = email
    }

    setUsername(username: string){
        this.username = username
    }

    setWeight(weight: number){
        this.weight = weight
    }

    setHeight(height: number){
        this.height = height
    }

    setAvatar(avatar: string){
        this.avatar = avatar
    }

    setBirth(birth: Date){
        this.birth = birth
    }

    setCreatedAt(createdAt: Date){
        this.createdAt = createdAt
    }

    setFollowers(followers: string){
        this.followers = followers
    }

    setFollowing(following: string){
        this.following = following
    }

    setGender(gender : string){
        this.gender = gender
    }

    build() : User {
        return new User(this)
    }

    getAllValues(){
        return this
    }
}