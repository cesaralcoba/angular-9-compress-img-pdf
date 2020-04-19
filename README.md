# compress-img-pdf

Uploap images .jpg, jpeg, png compress and export pdf file using Angular

## Installation img compress

Use the package manager [npm ngx-image-compress](https://www.npmjs.com/package/ngx-image-compress) to install ngx-image-compress.

```bash
npm install ngx-image-compress
```
## For pdf export

Use the library [pdfmake](http://pdfmake.org/) 

```bash
npm install pdfmake
```

## Usage

```angular
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [...
  ],
  imports: [...
  ],
  providers: [NgxImageCompressService]
})
export class AppModule { }
```
