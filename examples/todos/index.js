import { AppComponent } from './App.component.js';
import { Joy } from 'src/JoyJS.ts';

const rootElement = document.getElementById('root');

const appInstance = Joy.create(AppComponent);

rootElement.append(appInstance.element);
