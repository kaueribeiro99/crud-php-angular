import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../services/user.service';
import {AlertModalService} from '../services/alert-modal.service';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  lista: any = [];
  limit = 10;
  start = 0;
  name = '';
  email = '';
  password = '';
  id = '';
  title = 'Inserir Usuário';
  textoBuscar = '';

  constructor(
        private provider: UserService,
        private router: Router,
        private location: Location,
        private alertService: AlertModalService
  ) {}

  ngOnInit() {
    this.lista = [];
    this.start = 0;
    this.listar(this.textoBuscar);
  }


  listar(texto: string) {
    this.lista = [];
    this.start = 0;
    return new Promise(resolve => {
      const dados = {
        requisicao : 'listar',
        limit : this.limit,
        start : this.start,
        textoBuscar: texto
       };
      this.provider.Api(dados, 'users.php').subscribe(data => {
        for (const dado of data['result']) {
          this.lista.push(dado);
        }
        resolve(true);
      });
      });
    }


   cadastrar() {
      if(this.name !== '' && this.email !== '' && this.password !== '') {
      return new Promise(resolve => {
        const dados = {
          requisicao : 'adicionar',
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.provider.Api(dados, 'users.php')
        .subscribe(data => {

          if(data['success']){
            this.alertSuccessAdd()
            this.router.navigate(['/usuarios']);
          }else{
            this.alertError()
          }

        });
      });
    }else{
      this.alertWarning()
    }
  }

  editar() {
      if(this.name !== '' && this.email !== '' && this.password !== '' && this.id !== '') {
      return new Promise(resolve => {
        const dados = {
          requisicao : 'editar',
          name: this.name,
          email: this.email,
          password: this.password,
          id: this.id
        };
        this.provider.Api(dados, 'users.php')
        .subscribe(data => {

          if(data['success']){
            this.alertSuccessAdd()
            this.router.navigate(['/usuarios']);
          }else{
           this.alertError()
          }


        });
      });

    }else{
      this.alertWarning()
      }
    }

  dadosEditar(name: string, email: string, password: string, id: string ) {
    this.title = 'Editar Usuário';
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }



  excluir(iduser: string) {
    return new Promise(resolve => {
        const dados = {
          requisicao : 'excluir',
          id: iduser
        };
        this.provider.Api(dados, 'users.php')
        .subscribe(data => {

          if(data['success'])
            {
              this.confirmModal()
            this.router.navigate(['/usuarios']);
          }else{
           this.alertError()
          }
        });
    });
  }

  reload() {
    //Refresh da página
   location.reload()
  }

  alertError(){
    this.alertService.showAlertDanger('Erro!')
  }

  alertSuccessAdd(){
    this.alertService.showAlertSucess('Adicionado com sucesso!')
  }

  alertSuccessDelete(){
    this.alertService.showAlertSucess('Excluído com sucesso!')
  }

  alertWarning(){
    this.alertService.showAlertWarning('Atenção, preencha os campos!')
  }

  confirmModal(){
    this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja excluir?', 'Sim', 'Cancelar');
  }
}



