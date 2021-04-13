import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyservicesService } from '../myservices.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  data:any[] = []
  tempData:any[] = undefined ;
  closeResult = '';
  name: any;
  price: any;
  id: any;
  
  constructor(
    private _myservice: MyservicesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getItems();
    // this.getItem();
   

    this._myservice.getSearchText().subscribe(result=>{
  
        this.serachText(result.trim());
    
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  private getItems(){
    this._myservice.getItems().subscribe((results:any[])=>{
      this.data = results["Data"]
      console.log(this.data)
    },err=>{
      console.error("Error fetching data");
    })
  }

  // private getItem(content){
  //   this._myservice.getItem().subscribe((results:any)=>{
  //     this.data = results["Data"]
  //     console.log(this.data)
  //     this.open(content)
  //   },err=>{
  //     console.error("Error fetching data");
  //   })
  // }

  private viewPriceDetails(item,content){
    this.price = item.DefaultPriceConcessionID;
    this.name = item.Name;
    this.id = item.Id;
    console.log(item["Name"])
    this.open(content)
  }


  private serachText(searchText){
    this._myservice.searchText(searchText).subscribe((result:any)=>{
      this.tempData = this.tempData===undefined?this.data:this.tempData;
      this.data = result["Data"];

      this.data  = searchText===""?this.tempData:this.data;
    },err=>{
      console.error("failed to search data");
    })
  }


}
