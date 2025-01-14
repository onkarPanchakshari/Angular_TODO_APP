export class TodolistModel{

    id:number;
    task:String;
    Stats:String;
    DueData: Date;
    complet: Boolean;


    constructor(){
        this.id=1;
        this.task="";
        this.Stats="";
        this.DueData= new Date();
        this.complet= Boolean("") ;
    }
}
