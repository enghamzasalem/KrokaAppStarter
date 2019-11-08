import {Component} from "@angular/core";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {Geolocation} from "@ionic-native/geolocation/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  capturedSnapURL: string;
  latitude: string;
  longitude: string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  constructor(private camera: Camera, private geolocation: Geolocation) {}

  takeSnap() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.camera.getPicture(this.cameraOptions).then(
          imageData => {
            // this.camera.DestinationType.FILE_URI gives file URI saved in local
            // this.camera.DestinationType.DATA_URL gives base64 URI

            let base64Image = "data:image/jpeg;base64," + imageData;
            this.capturedSnapURL = base64Image;
            this.latitude = resp.coords.latitude.toString();
            this.longitude = resp.coords.longitude.toString();
          },
          err => {
            console.log(err);
            // Handle error
          }
        );
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
