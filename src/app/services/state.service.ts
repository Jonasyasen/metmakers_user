import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private courseSelectedTypeSubject = new BehaviorSubject<number | null>(null);
  private CourseTypename = new BehaviorSubject<string | null>(null);

  courseSelectedType$: Observable<number | null> = this.courseSelectedTypeSubject.asObservable();
  courseTypeName$: Observable<string | null> = this.CourseTypename.asObservable(); // ✅ هذا هو المطلوب

  constructor() {}

  setCourseSelectedType(courseTypeId: number | null, name: string | null): void {
    console.log('Setting course type ID:', courseTypeId);
    this.courseSelectedTypeSubject.next(courseTypeId);
    this.CourseTypename.next(name);
    console.log(name, 'ttt');
  }

  getSelectedCourseType(): number | null {
    return this.courseSelectedTypeSubject.getValue();
  }
}
