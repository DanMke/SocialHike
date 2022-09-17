import Activity from './activity';

export default class ActivityBuilder {

    start = new Date()
    end = new Date()
    type = ""
    likes = []
    comments = []
    initialCoord = {
        latitude: 0,
        longitude: 0
    }
    points = []
    pointsOfInterest = []
    distance = 0
    averageSpeed = 0
    maxSpeed = 0
    averageElevation = 0
    maxElevation = 0
    maxPace = 0
    calories = 0
    user = {}
    createdAt = new Date()
    paces = []
    elevations = []
    sumPaces = 0
    sumElevations = 0
    mapImage = ""
    distanceFromMe = 0
    photos = []    

    constructor(){
        
    }

    setStart(start: Date){
        this.start = start
    }

    setEnd(end: Date){
        this.end = end
    }

    setType(type: string){
        this.type = type
    }

    setLikes(likes: []){
        this.likes = likes
    }

    setComments(comments: []){
        this.comments = comments
    }

    setInitialCoord(initialCoord: {
        latitude: number,
        longitude: number
    }){
        this.initialCoord = initialCoord
    }   

    setPoints(points: []){
        this.points = points
    }

    setPointsOfInterest(pointsOfInterest: []){
        this.pointsOfInterest = pointsOfInterest
    }

    setDistance(distance: number){
        this.distance = distance
    }

    setAverageSpeed(averageSpeed: number){
        this.averageSpeed = averageSpeed
    }

    setMaxSpeed(maxSpeed: number){
        this.maxSpeed = maxSpeed
    }

    setAverageElevation(averageElevation: number){
        this.averageElevation = averageElevation
    }

    setMaxElevation(maxElevation: number){
        this.maxElevation = maxElevation
    }

    setMaxPace(maxPace: number){
        this.maxPace = maxPace
    }

    setCalories(calories: number){
        this.calories = calories
    }

    setUser(user: Object){
        this.user = user
    }

    setCreatedAt(createdAt: Date){
        this.createdAt = createdAt
    }

    setPaces(paces: []){
        this.paces = paces
    }

    setElevations(elevations: []){
        this.elevations = elevations
    }

    setSumPaces(sumPaces: number){
        this.sumPaces = sumPaces
    }

    setSumElevations(sumElevations: number){
        this.sumElevations = sumElevations
    }

    setMapImage(mapImage: string){
        this.mapImage = mapImage
    }

    setDistanceFromMe(distanceFromMe: number){
        this.distanceFromMe = distanceFromMe
    }

    setPhotos(photos: []){
        this.photos = photos
    }

    build(){
        return new Activity(this)
    }
    
    getAllValues(){
        return this
    }
}