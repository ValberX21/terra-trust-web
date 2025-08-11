import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  ngOnInit(): void {
    this.sidebarOpen = window.innerWidth >= 992; // open on desktop, closed on mobile
  }

  @HostListener('window:resize')
  onResize(): void {
    const wasDesktop = this.sidebarOpen && window.innerWidth >= 992;
    this.sidebarOpen = window.innerWidth >= 992 ? true : wasDesktop ? false : this.sidebarOpen;
    if (window.innerWidth >= 992) this.sidebarOpen = true; // always open on desktop
  }

  closeOnMobile(): void {
    if (window.innerWidth < 992) this.sidebarOpen = false;
  }

  isMobile(): boolean {
    return window.innerWidth < 992;
  }
}
