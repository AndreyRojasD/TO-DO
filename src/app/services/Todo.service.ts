import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private count: number = 0;
  constructor() {}

 async Createnewnote(name: string, data: any) {
    try {
      const existingArray = localStorage.getItem(name)
      let newArray: any[] = existingArray ? JSON.parse(existingArray): [];
      newArray.push(data)
      localStorage.setItem(name, JSON.stringify(newArray));
    } catch (error) {
      console.error(error);
    }
  }

  async UpdateItem(name:string, data:any, index: number) {
    try{
      const existingArray = localStorage.getItem(name)
      let newArray: any[] = existingArray ? JSON.parse(existingArray): [];
      console.log(`El indes a actualiar es: ${index} lo que ditaremos es: ${newArray[index]}`)
      newArray[index] = data
     await localStorage.setItem(name, JSON.stringify(newArray))
    }catch(error){
      console.error(error)
    }
  }

  async GetItem(name: string) {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
    }
  }

  async RemoveItem(name: string, index:number) {
    try {
      const existingArray = localStorage.getItem(name);
      let newArray: any[] = existingArray ? JSON.parse(existingArray) : [];
      newArray.splice(index, 1);
      localStorage.setItem(name, JSON.stringify(newArray));
        } catch (error) {
      console.log(error);
    }
  }


  async market(data: any): Promise<void> {
    try {
      const markedItems = localStorage.getItem('markedItems');
      let markedArray: string[] = markedItems ? JSON.parse(markedItems) : [];
      console.log(markedArray)
      if (!this.isMarked(data)) {
        // Si el elemento no está marcado, incrementamos el contador
        this.count++;
        if (this.count === 2) {
          console.log(data)
          markedArray.push(data);
          console.log('Lo marcamos');
          this.count = 0; // Reiniciamos el contador
        }
      } else {
        // Si el elemento está marcado, incrementamos el contador
        this.count++;
        if (this.count === 2) {
          markedArray = markedArray.filter(item => item !== data);
          console.log('No market');
          this.count = 0; // Reiniciamos el contador
        }
      }
  
      localStorage.setItem('markedItems', JSON.stringify(markedArray));
    } catch (error) {
      console.error(`${error}`);
    }
  }
  
  isMarked(data: string): boolean {
    try{
      const markedItems = localStorage.getItem('markedItems');
      const markedArray: string[] = markedItems ? JSON.parse(markedItems) : [];
      return markedArray.includes(data);
    }catch(error){
      console.log(error)
      return false
    }
  }
  
  
  

}
