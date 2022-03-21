import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  @Input() data: Array<any> = [];
  selectedRows:any = []
  constructor(private formBuilder:FormBuilder){

  }

  screenContent:string = ''

  formData:any = this.formBuilder.group({
    label2:"",
    label3:"",
    label4:""
  })

  columns:Array<{name:string,sort:any}> = [
    { name:'COLUMN_1',sort:''},
    { name:'COLUMN_2',sort:''},
    { name:'COLUMN_3',sort:''},
    { name:'COLUMN_4',sort:''},
    { name:'COLUMN_5',sort:''},
  ]

  ngOnInit(): void {
  }



  rowClasses( row:any ){
    let classes:Array<String> = []
    if(row && row[0]){
      let c = row[0].substring(row[0].length - 1, row[0].length);
      if(c == 0)      classes.push('text-red', 'bg-white')
      else if(c == 1) classes.push('text-green', 'bg-red')
      else if(c == 2) classes.push('text-blue', 'bg-white')
    }
    return classes
  }

  sortData( index:number ){
    this.columns[index].sort = this.columns[index].sort?-this.columns[index].sort:1
    this.data = this.data.concat().sort( ( a:Array<any>, b:Array<any> )=>
    {
      // Sort by the 2nd value in each array
      if ( a[index] == b[index] ) return 0;
      return a[index] > b[index] ? -this.columns[index].sort : this.columns[index].sort;
    });
  }

  onBtn121Click(){
    this.screenContent = "Btn 121 clicked"
  }
  onProcessClick(){
    this.screenContent = "Label 2 : "+this.formData.label2 + '<br>'
    this.screenContent += "Label 3 : "+this.formData.label3 + '<br>'
    this.screenContent += "Label 4 : "+this.formData.label4 + '<br>'

  }
  onRowTdClick( row:Array<any> ) {
    this.screenContent = '';
    this.columns.forEach((col,i)=>{
      this.screenContent += col.name +" : " + row[i] + '<br>';
    })
  }
  toggleSelected( row:any , index:number, event:any){
    let pElement = event.target.parentElement.parentElement;
    pElement.classList.toggle("selected")

    let selectedIndex:Number = this.selectedRows.indexOf(row[0]);
    selectedIndex === -1? this.selectedRows.push(row[0]):this.selectedRows.splice(selectedIndex, 1);
  }

  downloadSelected(){
    if(this.selectedRows && this.selectedRows.length) {
      let selectedData = this.data.filter((row)=>this.selectedRows.includes(row[0]))
      let output_text = selectedData.map((row)=>row.join(',')).join('\n')
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( output_text ));
      element.setAttribute('download', 'SAMPLE_OUTPUT.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

}
