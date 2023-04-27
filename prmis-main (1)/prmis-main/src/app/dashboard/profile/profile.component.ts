import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  fullName: string = 'Anonymous User';
  role: string = '-n/a-';
  idNumber: string = '-n/a-';
  location: string = '-n/a-';
  phoneNumber: string = '-n/a-';
  joinedDate: string = '-n/a-';
  image: string = 'assets/images/user.png';

  constructor(private auth: Auth, private database: Database) {}

  ngOnInit(): void {
    const dbRef = ref(this.database, 'Users/PART1');
    onValue(dbRef, (snapshot) => {
      const users = snapshot.val();
      const currentUser = this.auth.currentUser;
      if (currentUser == null) {
        return;
      }
      const userData = users[currentUser.uid];
      if (userData == null) {
        return;
      }
      console.log(userData);
      this.image = userData['image'];
      this.fullName = `${userData['firstname']} ${userData['lastname']}`;
      this.role = userData['role'];
      this.location = userData['poo'];
      this.phoneNumber = userData['phonenum'];
    });
  }
}
