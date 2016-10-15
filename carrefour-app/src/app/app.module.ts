import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Discounts } from '../pages/discounts/discounts';
import { Settings } from '../pages/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Discounts,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Discounts,
    Settings
  ],
  providers: []
})
export class AppModule {}
