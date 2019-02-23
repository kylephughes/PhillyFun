//Model intially created to default the values in the modal or hold the edit data
export class SpecialsModel {
    startTime: string = '';
    endTime: string = '';
    specials: [];
  }
export class HappyHourModel {
    googlePlace: string ='';
    name: string = '';
    text: string = '';
    latitude: number;
  longitude: number;
  formattedAddress: string;
  monSpecials: SpecialsModel;
  tueSpecials: SpecialsModel;
  wedSpecials: SpecialsModel;
  thrSpecials: SpecialsModel;
  friSpecials: SpecialsModel;
  satSpecials: SpecialsModel;
  sunSpecials: SpecialsModel;
}