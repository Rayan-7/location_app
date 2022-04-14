class Note {
    constructor(id,date,title,body,userId,location) {
      console.log("this location "+JSON.stringify(location))
      this.id=id  
      this.date=date
      this.title=title
      this.body = body
      this.isHide=false
      this.userId=userId
      this.location=location
      return {
        id:this.id, 
        date:this.date,
        title: this.title,
        body: this.body,
        isHide:false,
        userId:this.userId,
        location:this.location
      };
    }
}

export default Note;