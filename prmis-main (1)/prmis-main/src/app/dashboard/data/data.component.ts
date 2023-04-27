import { Component, OnInit } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  tableHeaders: string[] = [];
  tableData: string[][] = [];
  tableFullData: string[][] = [];
  constructor(private database: Database) {}

  async ngOnInit(): Promise<void> {
    this.loadFormAData();
  }

  onSearch(searchQuery: string) {
    alert(searchQuery);
  }

  onFormSelect(form: string) {
    if (form == 'a') this.loadFormAData();
    else if (form == 'b') this.loadFormBData();
    else if (form == 'c') this.loadFormCData();
  }

  loadFormAData() {
    const newTable: string[][] = [];
    const headers: string[] = [
      'No.',
      'SR-Code',
      'First Name',
      'Middle Name',
      'Last Name',
      'Age',
      'Gender',
      'Email',
      'Date of Birth',
      'Phone Number',
      'Place of Origin',
      'Civil Status',
      'Role',
      'Campus',
    ];
    const dbRef = ref(this.database, 'Users/PART1');
    onValue(dbRef, (snapshot) => {
      var no = 1;
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.exportVal();
        if (data['age'] == null) return;
        var row: string[] = [
          no.toString(),
          data['srcode'],
          data['firstname'],
          data['middlename'],
          data['lastname'],
          data['age'],
          data['gender'],
          data['email'],
          data['dob'],
          data['phonenum'],
          data['poo'],
          data['civil'],
          data['role'],
          data['campus'],
        ];
        no++;
        newTable.push(row);
      });
      this.tableHeaders = headers;
      this.tableFullData = newTable;
      this.tableData = newTable;
    });
  }

  loadFormBData() {
    const newTable: string[][] = [];
    const headers: string[] = [
      'No.',
      'Highest Educational Attainment',
      'Elem (School)',
      'Elem (Yr. Started)',
      'Elem (Yr. Graduated)',
      'JHS (School)',
      'JHS (Yr. Started)',
      'JHS (Yr. Graduated)',
      'SHS (School)',
      'SHS (Yr. Started)',
      'SHS (Yr. Graduated)',
      'College (School)',
      'College (Yr. Started)',
      'College (Yr. Graduated)',
      'Course Taken',
    ];
    const dbRef = ref(this.database, 'Users/PART2');
    onValue(dbRef, (snapshot) => {
      var no = 1;
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.exportVal();
        // console.log(data);
        if (data['hea'] == null) return;
        var row: string[] = [
          no.toString(),
          data['hea'],
          data['elem_sch'],
          data['elem_yr_st'],
          data['elem_yr_grad'],
          data['jhs_sch'],
          data['jhs_yr_st'],
          data['jhs_yr_grad'],
          data['shs_sch'],
          data['shs_yr_st'],
          data['shs_yr_grad'],
          data['coll_sch'],
          data['coll_yr_st'],
          data['coll_yr_grad'],
          data['course_taken'],
        ];
        no++;
        newTable.push(row);
      });
      this.tableHeaders = headers;
      this.tableFullData = newTable;
      this.tableData = newTable;
    });
  }

  loadFormCData() {
    const newTable: string[][] = [];
    const headers: string[] = [
      'No.',
      'FT/PT',
      'Baccalaureate',
      'BA Spec',
      'Masters',
      'Doctorate',
      'PHD Spec',
      'PLE',
      'Tenure Appointment',
      'Rank',
      'Teaching Load',
      'Subject Taught',
      'Annual Salary',
      'DOA',
      'Years of Service',
    ];
    const dbRef = ref(this.database, 'Users/PART3');
    onValue(dbRef, (snapshot) => {
      var no = 1;
      snapshot.forEach((childSnapshot) => {
        var data = childSnapshot.exportVal();
        if (data['ft_pt'] == null) return;
        var row: string[] = [
          no.toString(),
          data['ft_pt'],
          data['baccalaureate'],
          data['ba_specific'],
          data['masters'],
          data['doctorate'],
          data['phd_spec'],
          data['prof_lic_earned'],
          data['ten_app'],
          data['rank'],
          data['teach_load'],
          data['subj_taught'],
          data['ann_sal'],
          data['doa'],
          data['yrs_of_serv'],
        ];
        no++;
        newTable.push(row);
      });
      this.tableHeaders = headers;
      this.tableFullData = newTable;
      this.tableData = newTable;
    });
  }

  async searchInCurrentForm(searchQuery: string) {}
}
