import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  currentDate = new Date();
  timeStart = '09:00';
  timeEnd = '18:45';
  timeSlots = this.generateTimeSlots(this.timeStart, this.timeEnd);
  reservations: any[] = [];
  currentTime: string = this.formatTime(this.currentDate);
  isFormOpen = false; // To control modal visibility
  reservationDetails = { title: '', start: '', end: '' }; // To store the reservation form data

  constructor() {
    this.loadFakeReservations();
  }

  ngOnInit(): void {
    this.loadFakeReservations();
  }

  generateTimeSlots(start: string, end: string) {
    const slots = [];
    let [hour, minute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      slots.push(label);
      minute += 15;
      if (minute >= 60) {
        hour++;
        minute -= 60;
      }
    }

    return slots;
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  loadFakeReservations() {
    this.reservations = [
      { start: '09:00', end: '10:30', title: 'Student 1' },
      { start: '11:00', end: '12:00', title: 'Student 2' },
      { start: '13:15', end: '15:15', title: 'Student 3' }
    ];
  }

  // Method to check if a time slot is already reserved
  isReserved(time: string): boolean {
    return this.reservations.some(res => res.start === time);
  }

  // Method to open the reservation form modal
  openReservationForm(time: string) {
    this.reservationDetails.start = time;
    this.reservationDetails.end = this.getEndTime(time);
    this.isFormOpen = true;
  }

  // Method to close the reservation form modal
  closeReservationForm() {
    this.isFormOpen = false;
  }

  // Method to confirm the reservation and add it to the list
  confirmReservation() {
    const newReservation = { 
      start: this.reservationDetails.start, 
      end: this.reservationDetails.end, 
      title: this.reservationDetails.title 
    };
    this.reservations.push(newReservation);
    this.isFormOpen = false; // Close the form after confirming the reservation
  }

  // Helper function to calculate end time of a reservation
  getEndTime(start: string): string {
    const [hour, minute] = start.split(':').map(Number);
    const endMinute = minute + 30; // Example: Default reservation duration is 30 minutes
    const endHour = hour + Math.floor(endMinute / 60);
    return `${String(endHour).padStart(2, '0')}:${String(endMinute % 60).padStart(2, '0')}`;
  }

  // Get the number of minutes from the start time (timeStart)
  getOffsetMinutes(time: string): number {
    const [hour, minute] = time.split(':').map(Number);
    const [baseHour, baseMinute] = this.timeStart.split(':').map(Number);
    
    return (hour - baseHour) * 60 + (minute - baseMinute);
  }

  getMinutes(start: string, end: string): number {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return (eh * 60 + em) - (sh * 60 + sm);
  }
}
