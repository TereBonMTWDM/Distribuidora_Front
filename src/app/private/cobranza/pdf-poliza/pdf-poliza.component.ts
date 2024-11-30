import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MessageService } from 'primeng/api';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Imagen } from 'src/app/models/imagen';
import { Cobranza } from 'src/app/models/cobranza';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from 'src/app/services/loading.service';

//Módulos para Translate:
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

//fuente para el Translate: https://www.ibidemgroup.com/edu/internacionalizacion-i18n-primeng-ngx-translate/
@Component({
  selector: 'app-pdf-poliza',
  standalone: true,
  imports: [PdfViewerModule, FileUploadModule, ToastModule, CommonModule, NgxDocViewerModule
    , TranslateModule
    , MatProgressSpinnerModule
  ],
  templateUrl: './pdf-poliza.component.html',
  styleUrl: './pdf-poliza.component.scss',
  providers: [MessageService, TranslateService]
})
export class PdfPolizaComponent {
  @Input('cobranza') cobranza: Cobranza;
  imagen: Imagen;
  isCargaPDF: boolean = false; //visualización de la sección de Carga de archivo PDF
  archivo: File;
  base64String: string;
  base64Image: string;
  private charset: string;
  base62String: string = '';
  uploadedFiles: any[] = [];
  url: string;
  hoy = new Date();

  //Para visualizar:
  base64Contenido: string;

  //Translate:
  lang: string = "en"; // default
  subscription: Subscription;

  constructor(
    private imagenSvc: ImagenesService, private authSvc: AuthService
    , private messageService: MessageService
    , public translate: TranslateService, public primeNGConfig: PrimeNGConfig  //configuración del Translate
    , public loadingService: LoadingService
  ) {
    this.loadingService.setLoading(false);

    //Sección "Translate":
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    let lang = browserLang.match(/en|fr/) ? browserLang : 'en';
    console.log('\x1b[42m%s\x1b[0m', 'Hello src\app\private\cobranza\pdf-poliza\pdf-poliza.component.ts:71', lang);
    this.changeLang(lang);

    this.subscription = this.translate.stream('primeng').subscribe(data => {
      this.primeNGConfig.setTranslation(data);
    });
    //End Sección "Translate"
  }

  



  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.cobranza && !!changes.cobranza.currentValue) {
      this.cobranza = changes.cobranza.currentValue;

      this.GetPDF();
    }
  }

  async GetPDF(){
    this.imagenSvc.GetPdfoliza(this.cobranza.id).subscribe((result: any) => {
      if(result.complete){
        this.imagen = result.data[0];
  
        if(result.data.length > 0){
          this.isCargaPDF = false;
          this.ViewPDF();
        } else{
          this.isCargaPDF = true;
        }

      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar obtener el documento PDF. Error:' + result.errors, life: 7000});
      }
    });
    
  }


  onSelect(event: any) {
    for (let file of event.files) {
      this.archivo = file;
      this.ConvertToBase64();
    }
    this.messageService.add({ severity: 'info', summary: 'PDF Cargado', detail: '', life: 3000 });
  }

  

  ConvertToBase64() {
    if (!this.archivo) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.archivo);

    reader.onload = () => {
      this.base64String = reader.result as string; 
      // this.base64Image = reader.result as string;

      this.imagen = {
        idCobranza: this.cobranza.id,
        imagenBase64: this.base64String,
      }

      this.imagenSvc.SaveImagen(this.imagen).subscribe((result: any) => {
        if(result.complete){
          this.imagen.imagenBase64 = this.base64String;
  
          let u = this.authSvc.getUserData();
          this.hoy = new Date()
          this.imagen.fechaAlta = this.hoy;
          this.imagen.usuario = u.displayName;
          this.isCargaPDF = false;
          
          this.ViewPDF();
        } else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al intentar guardar el documento. Error:' + result.errors, life: 7000});
        }
      });
    };
  }


  ViewPDF() {
    this.base64Contenido = this.imagen.imagenBase64; // "data:application/pdf;base64,";
    this.base64Contenido = this.base64Contenido.replace('data:application/pdf;base64,', '');

    const byteArray = new Uint8Array(
      atob(this.base64Contenido).split('').map((char) => char.charCodeAt(0))
    );

    //crate file:
    const file = new Blob([byteArray], { type: 'application/pdf' });

    //
    const fileUrl = URL.createObjectURL(file);
    let fileName = 'pdfNombreeee.pdf'; //pero no lo quiero descargar
    let link = document.createElement('a');

    this.url = fileUrl;
    // link.download = fileName;
    // link. target = '_blank';
    // link.href = fileUrl;
    // document.body.appendChild(link);
    // link.click();

    //remover del front
    // document.body.removeChild(link);
    // link.click();


  }



  changeLang(lang: string) {
    this.translate.use(lang);
  }

}


