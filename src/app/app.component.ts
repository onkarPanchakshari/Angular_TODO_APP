import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodolistModel } from './module/Todo';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todoapp';

  Todolist: FormGroup = new FormGroup({});
 
  TodolistObj: TodolistModel = new TodolistModel();

  todolistlist: TodolistModel[] =[];
  

  constructor(){
    this.createrFrom();
    debugger;
    const oldData =localStorage.getItem("todoData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.todolistlist= parseData;
    }

  }

  reset(){
    this.TodolistObj =new TodolistModel();
    this.createrFrom();
  }

  createrFrom(){
    this.Todolist=new FormGroup({
      id: new FormControl(this.TodolistObj.id),
      task: new FormControl(this.TodolistObj.task,[Validators.required]),
      Stats: new FormControl(this.TodolistObj.Stats,[Validators.required]),
      DueData: new FormControl(this.TodolistObj.DueData),
      complet: new FormControl(this.TodolistObj.complet)
    })
  }

  onSave() {
    debugger
    const oldData = localStorage.getItem("todoData");

    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.Todolist.controls['id'].setValue(parseData.length +1);
      this.todolistlist.unshift(this.Todolist.value);
    }else{
      this.todolistlist.unshift(this.Todolist.value);
    }
    localStorage.setItem("todoData",JSON.stringify(this.todolistlist))
     this.reset();
  }

  onEdit(item: TodolistModel){
    this.TodolistObj= item;
    this.createrFrom();
  }

  onUpdate(){
    const record = this.todolistlist.find(m=>m.id == this.Todolist.controls['id'].value);
    if(record != undefined) {
      record.task = this.Todolist.controls['task'].value;
      record.Stats=this.Todolist.controls['Stats'].value;
      record.DueData = this.Todolist.controls['DueData'].value;
    }
    localStorage.setItem("todoData",JSON.stringify(this.todolistlist))
   this.reset();
  }

  onDelete(id:number){
    const isDelete= confirm("Are You Sure Want To Delete");

    if(isDelete){
      const index = this.todolistlist.findIndex(m=>m.id == id);
      this.todolistlist.splice(index,1);
      localStorage.setItem("todoData",JSON.stringify(this.todolistlist))
    }
  }


}
