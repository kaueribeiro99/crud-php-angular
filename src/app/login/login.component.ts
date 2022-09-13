import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private provider: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    return new Promise(resolve => {
      const dados = {
        requisicao : 'login',
        email: email,
        password: password
       };
      this.provider.Api(dados, 'users.php').subscribe(data => {
        if(data['success']){
          this.router.navigate(['/usuarios']);
        }else{
          alert('Dados incorretos!');
        }
      });
      });
    }

}
