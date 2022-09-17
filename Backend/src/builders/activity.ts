import ActivityBuilder from './activity.builder';

export default class Activity {

    start: Date
    end: Date
    type: string
    likes: Array<Object>
    comments: Array<Object>
    initialCoord: Object
    points: Array<Object>
    pointsOfInterest: Array<Object>
    distance: number
    averageSpeed: number
    maxSpeed: number
    averageElevation: number
    maxElevation: number
    maxPace: number
    calories: number
    user: Object
    createdAt: Date
    paces: Array<Object>
    elevations: Array<Object>
    sumPaces: number
    sumElevations: number
    mapImage: string
    distanceFromMe: number
    photos: Array<Object>  
 
    constructor(builder : ActivityBuilder) {
        this.start = builder.start
        this.end = builder.end
        this.type = builder.type
        this.likes = builder.likes
        this.comments = builder.comments
        this.initialCoord = builder.initialCoord
        this.points = builder.points
        this.pointsOfInterest = builder.pointsOfInterest
        this.distance = builder.distance
        this.averageSpeed = builder.averageSpeed
        this.maxSpeed = builder.maxSpeed
        this.averageElevation = builder.averageElevation
        this.maxElevation = builder.maxElevation
        this.maxPace = builder.maxPace
        this.calories = builder.calories
        this.user = builder.user
        this.createdAt = builder.createdAt
        this.paces = builder.paces
        this.elevations = builder.elevations
        this.sumPaces = builder.sumPaces
        this.sumElevations = builder.sumElevations
        this.mapImage = builder.mapImage
        this.distanceFromMe = builder.distanceFromMe
        this.photos = builder.photos
    }
}