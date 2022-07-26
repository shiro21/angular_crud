import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService} from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getActivatedRouter();
  }

  getParamId: any;
  getActivatedRouter() {
    this.getParamId = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.getParamId) {
      this.apiService.getSingleData(this.getParamId)
      .subscribe(res => {
        // Update Data 불러오기
        this.userForm.patchValue({
          fullname: res.data[0].fullname,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
        })
      });
    }
  }

  userForm = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)
  });

  errMsg: String = '';
  successMsg: String = '';

  // user Create
  userSubmit() {
    if(this.userForm.valid) {
      this.apiService.createData(this.userForm.value)
      .subscribe(res => {
        this.userForm.reset();
        this.successMsg = 'Data Inserted';
        this.errMsg = '';
      })
    } else this.errMsg = 'All Field is Required !'; this.successMsg = '';
  }

  // user Update
  userUpdate() {
    console.log(this.userForm.value, 'Update Form');
    if(this.userForm.valid) {
      this.apiService.updateData(this.userForm.value, this.getParamId)
      .subscribe(res => {
        this.getActivatedRouter();
        this.successMsg = res.message;
      });
    } else this.errMsg = 'All field is Required';
  }
}
