import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

constructor(private msalService: MsalService, private http: HttpClient) {}

getAccessTokenAndCallApi() {
  const account = this.msalService.instance.getAllAccounts()[0];

  this.msalService.instance.acquireTokenSilent({
    scopes: ['user.read'],
    account: account
  }).then(result => {
    const token = result.accessToken;

    // Lagre i minnet eller bruk direkte
    this.http.get('http://localhost:8080/api/student', {
      headers: new HttpHeaders({
        'Authorization': Bearer ${token}
      })
    }).subscribe(response => {
      console.log('Respons fra API:', response);
    });
  });
}