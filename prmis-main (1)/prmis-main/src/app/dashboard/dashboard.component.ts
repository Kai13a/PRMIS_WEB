import { Component, OnInit } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeTab = '';
  user$: Observable<User | null>;
  currentUser: User | null = null;
  fullName: string | undefined;
  isAdmin: boolean | undefined;
  constructor(
    private auth: Auth,
    private router: Router,
    private database: Database
  ) {
    this.user$ = user(auth);
    this.user$.subscribe((user) => {
      const claims = user?.getIdTokenResult();
      claims?.then((result) => {
        this.isAdmin = result.claims['isAdmin'] ?? false;
        console.log(`You are an admin: ${this.isAdmin}`);
      });
    });
  }

  ngOnInit(): void {
    const dbRef = ref(this.database, 'Users/PART1');
    onValue(dbRef, (snapshot) => {
      const users = snapshot.val();
      const currentUser = this.auth.currentUser;
      if (currentUser == null) {
        this.fullName = 'Anonymous User';
        return;
      }
      const userData = users[currentUser.uid];
      if (userData == null) {
        this.fullName = 'Anonymous User';
        return;
      }
      this.fullName = `${userData['firstname']} ${userData['lastname']}`;
    });
  }

  updateActiveTab() {
    const navContainer = document.querySelector('.nav-container');
    this.activeTab = this.router.url.split('/')[2];
    const allItems = navContainer?.querySelectorAll(`.nav-item`);
    allItems?.forEach((item) => {
      item.classList.remove('selected-nav-item');
    });
    const selectedItem = navContainer?.querySelector(
      `#${this.activeTab}-button`
    );
    selectedItem?.classList.add('selected-nav-item');
  }

  async navigateTab(tab: string) {
    if (this.activeTab === tab) return;
    this.closeUserMenu();
    await this.router.navigate([`/dashboard/${tab}`]);
    this.updateActiveTab();
  }
  toggleUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    const dropdownIcon = document.querySelector('#dropdown-icon');
    if (userMenu == null || dropdownIcon == null) return;
    userMenu.classList.toggle('hidden');
    dropdownIcon.classList.toggle('flip-180');
  }
  closeUserMenu() {
    const userMenu = document.querySelector('.user-menu');
    const dropdownIcon = document.querySelector('#dropdown-icon');
    if (userMenu == null || dropdownIcon == null) return;
    userMenu.classList.add('hidden');
    dropdownIcon.classList.remove('flip-180');
  }
  async navToProfile() {
    this.closeUserMenu();
    await this.router.navigate(['/dashboard/profile']);
    this.updateActiveTab();
  }
  async editProfile() {
    this.closeUserMenu();
    await this.router.navigate(['/dashboard/editProfile']);
    this.updateActiveTab();
  }
  async logOut() {
    this.closeUserMenu();
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
