import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ocrResult = 'Recognizing...';
  constructor(private http: HttpClient){
    this.doOCR();
  }
  async doOCR() {
    //upload photot
    //choose language 
    //show stage and loading
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('../assets/IMG-2585.JPG');
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }


}
