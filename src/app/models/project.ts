import { ClientLocation } from "./client-location";

export class Project {
    projectID: any;
    projectName: any;
    dateOfStart: any;
    teamSize: any;
    active: any;
    status: any;
    clientLocationID: any;
    clientLocation: ClientLocation;

    constructor () {
        this.projectID = 0;
        this.projectName = null;
        this.dateOfStart = null;
        this.teamSize = 0;
        this.active = true;
        this.status = null;
        this.clientLocationID = null;
        this.clientLocation = new ClientLocation();
    }
    
}
