import { Component, OnInit } from '@angular/core';

// services
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  readData: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // GET Data
    this.getData();
  }

  // GET Data
  getData() {
    this.apiService.getAllData()
    .subscribe(res => {
      console.log(res, "res ==> ");

      this.readData = res.data;
    });
  }

  // GET DeletedId
  deletedMsg: String = '';
  deleteId(id: any) {
    console.log(id, 'DELETED');
    this.apiService.deleteData(id)
    .subscribe(res => {
      console.log(res, 'Deleted');
      this.deletedMsg = res.message;

      // GET Data
      this.getData();
    });
  }

}
