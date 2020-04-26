import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ocrResult = 'Recognizing...';
  constructor(){
    this.doOCR();
  }
  async doOCR() {
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
