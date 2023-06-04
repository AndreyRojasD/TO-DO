import { Component } from '@angular/core';
import { TodoService } from '../services/Todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  Name = 'Todo';
  data: any;
  record: any;
  update = false;
  datosFormateados: string[] = [];
  index: number = 0;
  day:any
  month:any
  year:any
  dayOfWeek:any

count = 0
  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    try {
      this.record = await this.todoService.GetItem(this.Name);
      console.log(this.record)
      await this.getFormatteDate()
    } catch (error) {
      console.error(error);
    }
  }

  async getRecords() {
    try {
      this.record.push(await this.todoService.GetItem(this.Name));
    } catch (error) {}
  }

  async add() {
    try {
      await this.todoService.Createnewnote(this.Name, this.data);
      this.record = await this.todoService.GetItem(this.Name);
    } catch (error) {
      console.error(error);
    }
  }

  async delete(data: any) {
    try {
      let index = this.record.indexOf(data);
      this.todoService.RemoveItem(this.Name, index);
      this.record = await this.todoService.GetItem(this.Name);
    } catch (error) {
      console.error(error);
    }
  }

  async Select(data: any) {
    try {
      if (this.update) {
        this.data = '';
        this.update = false;
      } else {
        this.index = this.record.indexOf(data);
        this.data = data;
        this.update = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async Update() {
    try {
      await this.todoService.UpdateItem(this.Name, this.data, this.index);
      this.record = await this.todoService.GetItem(this.Name);
      this.update = false;
    } catch (error) {
      console.error(error);
    }
  }

 
  market(data: any): void {
    console.log(`Data en component${data}`)
    this.todoService.market(data);
  }

  isMarked(data: any) {
    return this.todoService.isMarked(data);
  }

  formatData() {
    this.datosFormateados = this.record.map((elemento:any, i:any) => {
      if (i === this.index) {
        return `<span style="text-decoration: line-through;">${elemento}</span>`;
      }
      return elemento;
    });
  }

  getFormatteDate(){
    try{
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    this.day = currentDate.getDate();
    this.month = months[currentDate.getMonth()];
    this.year = currentDate.getFullYear();
    this.dayOfWeek = daysOfWeek[currentDate.getDay()];
    }catch(error){
      console.error(error)
    }

  }

 sort(){
  try{
  this.record = this.record.sort()
  }catch(error){
    console.log(error)
  }
 }


 
}
