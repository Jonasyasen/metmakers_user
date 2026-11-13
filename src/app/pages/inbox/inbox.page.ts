import { Component, OnInit } from '@angular/core';
import { CourseTypeService, LaserReservationPayload } from 'src/app/services/courses.service';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  currentDate = new Date();
  timeStart = '09:00';
  timeEnd = '18:45';
  reservations: any[] = [];
  displayBlocks: any[] = [];
  currentTime: string = '';
  isFormOpen = false;
  reservationDetails = { title: '', start: '', end: '' };
  freeRange = { start: '', end: '' };
  weekDays: { label: string, date: Date, selected: boolean, disabled: boolean, weekend: boolean }[] = [];

  constructor(
    private courseService: CourseTypeService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.generateWeekDays();
    const todayTab = this.weekDays.find(d => !d.disabled) || this.weekDays[0];
    this.selectDay(todayTab);
  }
  async showNotice() {
    const toast = await this.toastCtrl.create({
      message: 'Currently, only Laser Cutter is available for booking.',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    toast.present();
  }
  
  generateWeekDays() {
    const today = new Date();
    const currentWeekDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentWeekDay + 1);

    this.weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
      const isPast = day < new Date(today.setHours(0, 0, 0, 0));

      this.weekDays.push({
        label: `${day.getDate()} ${day.toLocaleDateString('en-US', { weekday: 'short' })}`,
        date: day,
        selected: false,
        disabled: isWeekend || isPast,
        weekend: isWeekend
      });
    }
  }

  selectDay(dayObj: any) {
    if (dayObj.disabled) return;
    this.weekDays.forEach(d => d.selected = false);
    dayObj.selected = true;
    this.currentDate = new Date(dayObj.date);
    this.currentTime = this.formatTime(new Date());
    this.loadReservationsFromApi();
  }

  loadReservationsFromApi() {
    const fullDate = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(this.currentDate.getDate()).padStart(2, '0')}`;

    this.courseService.getLaserReservationsByDate(fullDate).subscribe({
      next: (data) => {
        this.reservations = data.map((item: any) => {
          const start = new Date(item.start_time);
          const end = new Date(item.end_time);

          return {
            start: format(start, 'HH:mm'),
            end: format(end, 'HH:mm'),
            title: item.notes || 'No Title'
          };
        });

        this.displayBlocks = this.generateDisplayBlocks();
      },
      error: (err) => {
        console.error('Error loading reservations:', err);
      }
    });
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
      day: 'numeric',
    });
  }

  generateDisplayBlocks(): any[] {
    const blocks = [];
    const sorted = [...this.reservations].sort((a, b) =>
      this.convertToMinutes(a.start) - this.convertToMinutes(b.start)
    );

    let current = this.timeStart;

    for (const res of sorted) {
      if (this.convertToMinutes(res.start) > this.convertToMinutes(current)) {
        blocks.push({ type: 'free', start: current, end: res.start });
      }
      blocks.push({ type: 'reserved', ...res });
      current = res.end;
    }

    if (this.convertToMinutes(current) < this.convertToMinutes(this.timeEnd)) {
      blocks.push({ type: 'free', start: current, end: this.timeEnd });
    }

    return blocks;
  }

  convertToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  getOffsetMinutes(time: string): number {
    const [hour, minute] = time.split(':').map(Number);
    const [baseHour, baseMinute] = this.timeStart.split(':').map(Number);
    return (hour - baseHour) * 60 + (minute - baseMinute);
  }

  getMinutes(start: string, end: string): number {
    return this.convertToMinutes(end) - this.convertToMinutes(start);
  }

  openReservationForm(start: string, end: string) {
    this.freeRange = { start, end };
    this.reservationDetails = { title: '', start: '', end: '' };
    this.isFormOpen = true;
  }

  getTimeOptionsInFreeRange(): string[] {
    const options: string[] = [];
    let currentMin = this.convertToMinutes(this.freeRange.start);
    const endMin = this.convertToMinutes(this.freeRange.end);

    while (currentMin < endMin) {
      const hours = Math.floor(currentMin / 60);
      const minutes = currentMin % 60;
      options.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
      currentMin += 15;
    }

    return options;
  }

  getAvailableEndTimes(): string[] {
    const startMin = this.convertToMinutes(this.reservationDetails.start || this.freeRange.start);
    const endMin = this.convertToMinutes(this.freeRange.end);
    const options: string[] = [];

    let currentMin = startMin + 15;
    while (currentMin <= endMin) {
      const hours = Math.floor(currentMin / 60);
      const minutes = currentMin % 60;
      options.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
      currentMin += 15;
    }

    return options;
  }

  closeReservationForm() {
    this.isFormOpen = false;
  }

  async confirmReservation() {
    if (!this.reservationDetails.start ||
        !this.reservationDetails.end ||
        this.convertToMinutes(this.reservationDetails.end) <= this.convertToMinutes(this.reservationDetails.start)) {
      alert('Please select a valid time range.');
      return;
    }

    const fullDate = this.currentDate.toISOString().split('T')[0];
    const start_time = `${fullDate}T${this.reservationDetails.start}:00+02:00`;
    const end_time = `${fullDate}T${this.reservationDetails.end}:00+02:00`;

    const payload: LaserReservationPayload = {
      start_time,
      end_time,
      notes: this.reservationDetails.title,
    };

    this.courseService.reserveLaserCutter(payload).subscribe({
      next: async () => {
        this.reservations.push({
          start: this.reservationDetails.start,
          end: this.reservationDetails.end,
          title: this.reservationDetails.title
        });
        this.displayBlocks = this.generateDisplayBlocks();
        this.isFormOpen = false;

        const toast = await this.toastCtrl.create({
          message: 'Reservation confirmed!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Reservation failed. Please try again.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  isPastBlock(block: any): boolean {
    const now = new Date();
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    now.setSeconds(0, 0);

    const isToday =
      now.getFullYear() === today.getFullYear() &&
      now.getMonth() === today.getMonth() &&
      now.getDate() === today.getDate();

    const blockEndMin = this.convertToMinutes(block.end);
    const nowMin = now.getHours() * 60 + now.getMinutes();

    return isToday && blockEndMin <= nowMin;
  }

  isPastReservation(block: any): boolean {
    if (block.type !== 'reserved') return false;

    const now = new Date();
    const today = new Date(this.currentDate);
    today.setHours(0, 0, 0, 0);
    now.setSeconds(0, 0);

    const isToday =
      now.getFullYear() === today.getFullYear() &&
      now.getMonth() === today.getMonth() &&
      now.getDate() === today.getDate();

    const blockEndMin = this.convertToMinutes(block.end);
    const nowMin = now.getHours() * 60 + now.getMinutes();

    return isToday && blockEndMin <= nowMin;
  }
}
