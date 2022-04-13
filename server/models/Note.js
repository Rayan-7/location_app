class Note {
    constructor(id,date,title,body,userId) {
      this.id=id  
      this.date=date
      this.title=title
      this.body = body
      this.isVisible=false
      this.userId=userId
      return {
        id:this.id, 
        date:this.date,
        title: this.title,
        body: this.body,
        isVisible:false,
        userId:this.userId
      };
    }
}

export default Note;