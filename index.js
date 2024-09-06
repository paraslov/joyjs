import { AppComponent } from "./App.component.js";
import { Joy } from "./JoyJS.js";

const rootElement = document.getElementById('root')

const appInstance = Joy.create(AppComponent)

rootElement.append(appInstance.element)

