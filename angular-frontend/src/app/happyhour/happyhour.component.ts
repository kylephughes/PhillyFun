import { HappyHourCreateModalComponent } from "./happy-hour-create-modal/happy-hour-create-modal.component";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { HappyhourService } from "./happyhour.service";
import { HappyHourModel } from "../models/HappyHourModel";
import { User } from "../models/User";
import { AuthService as LoginAuth } from "../core/auth.service";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../environments/environment";
import { share, map } from "rxjs/operators";
@Component({
  selector: "app-happyhour",
  templateUrl: "./happyhour.component.html",
  styleUrls: ["./happyhour.component.scss"]
})
export class HappyhourComponent implements OnInit {
  searchText:string;
  latitude: number;
  longitude: number;
  showMap: boolean = false;
  today: number = Date.now();
  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  //used for async pipe in html
  happyHours$: Observable<HappyHourModel[]>;
  //store them in a format this class can use
  happyHoursArr: HappyHourModel[];
  user: User;
  map: mapboxgl.Map;
  @ViewChild("mapBox") mapBox: ElementRef;
  constructor(
    private dialog: MatDialog,
    router: Router,
    private happyhourServ: HappyhourService,
    private authService: LoginAuth
  ) {
    //keep  philly city hall for now TODO use location
    this.latitude = 40.8259;
    this.longitude = -74.209;
    //closes dialog when navigating away from this page
    router.events.subscribe(() => {
      dialog.closeAll();
    });
  }

  ngOnInit() {
    this.refreshComponent();

    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  refreshComponent() {
    // share this observable with async pipe
    this.happyHours$ = this.happyhourServ.getHappyHours().pipe(
      share(),
      map(response => {
        this.happyHoursArr = response;
        return response;
      })
    );
  }

  toggleFormDialog() {
    //The dialog uses this model to populate form fields in edit mode so default it for new
    let defaultData: HappyHourModel = new HappyHourModel();
    this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      width: "900px",
      data: defaultData
    });
    this.registerModalClose();
  }

  toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      // allows div element to render on screen
      setTimeout(() => {
        this.map = new mapboxgl.Map({
          container: "mapBox",
          style: "mapbox://styles/mapbox/streets-v11",
          zoom: 12,
          center: [this.longitude, this.latitude]
        });

        this.addMarkers(this.map);
      }, 1);
    }
  }

  // add the happy hours icons to the map
  addMarkers = (map: mapboxgl.Map) => {
    this.happyHoursArr.forEach(happyhour => {
      const popup = new mapboxgl.Popup().setText(happyhour.name);

      const marker = new mapboxgl.Marker()
        .setLngLat([happyhour.longitude, happyhour.latitude])
        .setPopup(popup)
        .addTo(map);
      marker.getElement().addEventListener("click", () => {
        this.selectMarker(happyhour.name);
      });
    });
  };

  //handle selecting a place on the map TODO
  selectMarker(name: string) {
    alert("Selected " + name);
  }

  //In new or edit mode, refresh the list
  registerModalClose = () => {
    this.newHappyHourDialog.afterClosed().subscribe(result => {
      this.refreshComponent();
    });
  };
}
