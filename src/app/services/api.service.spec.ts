import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApiService} from "./api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {IEmployee} from "../models/IEmployee";
import {IAuth} from "../models/IAuth";

describe('Api Service', () => {
  let apiService: ApiService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
      declarations: []
    });
    apiService = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify()
  })

  it('should create', () => {
    expect(apiService).toBeDefined();
  });

  describe('getAllEmployees & getUser addUser', () => {
    let expectedEmpsData: IEmployee[];
    let expectedProfileData: IAuth;
    let id = '110557252217732081451'

    beforeEach(() => {
      expectedEmpsData = [{
        "imageUrl": "https://hub.dummyapis.com/Image?text=KW&height=120&width=120",
        "firstName": "Kim",
        "lastName": "Weimann",
        "email": "Kim.Weimann@dummyapis.com",
        "contactNumber": "4341291466",
        "age": 64,
        "dob": "30/08/1958",
        "salary": 1,
        "address": "Address1"
      }] as IEmployee[];

      expectedProfileData = {
        "userId": "110557252217732081451",
        "names": "John Kirathe",
        "email": "jnkratz@gmail.com",
        "imageUrl": "https://lh3.googleusercontent.com/a/ALm5wu0I_ZdxVKijly_aI_yhYIvwKLJfbYBQOKTo3fClAA=s96-c",
        "address": "147 Nairobi Kenya",
        "officeLocation": "Cape Town"
      } as IAuth;
    });

    //Test for get employee APIs
    it(' return employees by calling once', () => {
      apiService.getEmployees().subscribe(
        employees => {
          expect(employees).toEqual(expectedEmpsData, ' return expected employees'),
            fail
        }
      );

      const req = httpController.expectOne(apiService.url + '/employee');
      expect(req.request.method).toEqual('GET');

      req.flush(expectedEmpsData);
    });

    it('should be OK returning no employee', () => {
      apiService.getEmployees().subscribe(
        employees => expect(employees.length).toEqual(0, 'empty employee array'),
        fail
      );

      const req = httpController.expectOne(apiService.url + '/employee');
      req.flush([]);
    });

    it(' return expected employees when called multiple times', () => {
      apiService.getEmployees().subscribe();
      apiService.getEmployees().subscribe(
        employee => expect(employee).toEqual(expectedEmpsData, 'should return expected employees'),
        fail
      );

      const requests = httpController.match(apiService.url + '/employee');
      expect(requests.length).toEqual(2, 'calls to getAllEmployees()');

      requests[0].flush([]);
      requests[1].flush(expectedEmpsData);
    });

    //Test for get user APIs
    it(' return user by calling once', () => {
      apiService.getUser(id).subscribe(
        user => {
          expect(user).toEqual(expectedProfileData, ' return expected user'),
            fail
        }
      );

      const req = httpController.expectOne(apiService.url + '/user?userId='+ id);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedProfileData);
    });

    //Test for add user APIs
    it(' add  user and return it', () => {
      apiService.addUserData(expectedProfileData).subscribe(
        data => expect(data).toEqual(expectedProfileData, 'should return the employee'),
        fail
      );

      const req = httpController.expectOne(apiService.url + '/user');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedProfileData);

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'Created', body: expectedProfileData });
      req.event(expectedResponse);
    });
  });
});
