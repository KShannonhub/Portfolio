import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { MainAppComponent } from './main-app.component';
import { MyService } from '../services/service';

describe('MainAppComponent', () => {
  let component: MainAppComponent;
  let fixture: ComponentFixture<MainAppComponent>;
  let myService: MyService;

  beforeEach(() => {
    const myServiceSpy = jasmine.createSpyObj('MyService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [ MainAppComponent ],
      providers: [ { provide: MyService, useValue: myServiceSpy } ]
    });

    fixture = TestBed.createComponent(MainAppComponent);
    component = fixture.componentInstance;
    myService = TestBed.inject(MyService);
  });

  it('should call getData on ngOnInit', () => {
    const data = { coord: { lon: -0.1257, lat: 51.5085 }, weather: [ { id: 300, main: 'Drizzle' } ] };
    spyOn(myService, 'getData').and.returnValue(of(data));

    component.ngOnInit();

    expect(myService.getData).toHaveBeenCalledWith(51.5085, -0.1257);
    expect(myService.getData).toHaveBeenCalledTimes(1);
  });
});