import { Component } from '@angular/core';
import { ScriptService } from './script.service';
import { NgxImageCompressService } from 'ngx-image-compress';
declare let pdfMake: any ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'compress-img-pdf';
  documentPdf: string;
  document: File;
  fileAlert: boolean;
  file: any;
  uploadImg: object[] = [];
  localUrl: string[] = [];
  localCompressedURl:string[] = [];
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;

  constructor(
    private scriptService: ScriptService,
    private imageCompress: NgxImageCompressService) {
      this.scriptService.load('pdfMake', 'vfsFonts');
    }
    selectFile(event: any, number: any) {
          var  fileName : any;
          this.file = event.target.files[0];
          fileName = this.file['name'];
          if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.localUrl[number] = event.target.result;
              this.compressFile(this.localUrl.slice(-1)[0],number)
          }
            reader.readAsDataURL(event.target.files[0]);
          }
    }
      imgResultBeforeCompress:string;
      imgResultAfterCompress:string;
    compressFile(image,number) {
        var orientation = -1;
        this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
            console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
        this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
            this.imgResultAfterCompress = result;
            this.localCompressedURl[number] = result;
            this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
            console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);

            this.uploadImg[number] ={
              columns: [
                [
                  this.getProfilePicObject(result)
                ],
              ]
            };
        });
    }
    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    }
  ngOnInit() {
  }

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    var documentx;
    pdfMake.createPdf(documentDefinition).getBlob(function(Blob) {
      documentx = new File([Blob], "fileName",Blob);
   });
   pdfMake.createPdf(documentDefinition).open();
   setTimeout(() => {
      this.document = documentx;
      console.info('-file which can be send to API in form data-',this.document)
    }, 1000);
  }
  getDocumentDefinition() {
    return {
      content: this.uploadImg,
      info: {
        title: 'CI' + '_RESUME',
        author: 'CI',
        subject: 'DOCUMENTT',
        keywords: 'DOCUMENTT,',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 100],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }
  getProfilePicObject(documentPdf) {
      return {
        image: documentPdf ,
        width: 300,
        alignment : 'center'
      };
  }

}
