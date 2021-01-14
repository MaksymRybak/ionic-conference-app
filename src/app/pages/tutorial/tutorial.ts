import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { MenuController, IonSlides } from "@ionic/angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-tutorial",
  templateUrl: "tutorial.html",
  styleUrls: ["./tutorial.scss"],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild("slides", { static: true }) slides: IonSlides; // esempio di come recuperare il riferimento al componente??

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage // docs:  https://ionicframework.com/docs/angular/storage#ionic-storage
  ) {}

  startApp() {
    this.router
      .navigateByUrl("/app/tabs/schedule", { replaceUrl: true })
      .then(() => this.storage.set("ion_did_tutorial", true));
  }

  // docs: https://ionicframework.com/docs/api/slides
  onSlideChangeStart(event) {
    // nascondo il pulsante quando sto visualizzando ultimo slide
    event.target.isEnd().then((isEnd) => {
      this.showSkip = !isEnd;
    });
  }

  // docs: https://ionicframework.com/docs/angular/lifecycle
  ionViewWillEnter() {
    this.storage.get("ion_did_tutorial").then((res) => {
      if (res === true) {
        this.router.navigateByUrl("/app/tabs/schedule", { replaceUrl: true });
      }
    });

    // docs: https://ionicframework.com/docs/api/menu
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
