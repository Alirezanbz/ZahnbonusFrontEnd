import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  statusMessage = "Laden...";
  isUser: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isUser = this.getRole() === "kunde";
  }

  ngOnInit(): void {
    this.fetchStatus();
  }

  fetchStatus() {
    this.userService.getRequestStatusByEmail().subscribe(response => {
      console.log('API Response:', response);  // Log the exact API response for debugging
      switch (response) {
        case "In Bearbeitung":
          this.statusMessage = "Ihr Antrag wird bearbeitet. Bitte warten Sie auf weitere Informationen.";
          break;
        case "Abgelehnt":
          this.statusMessage = "Leider wurde Ihr Antrag abgelehnt. Sie können sich mit unserem Kundenservice in Verbindung setzen, um weitere Informationen zu erhalten.";
          break;
        case "Ausgezahlt":
          this.statusMessage = "Herzlichen Glückwunsch! Ihr Antrag wurde genehmigt und der Zahnbonus wurde ausgezahlt.";
          break;
        default:
          this.statusMessage = "Unbekannter Status: " + response;  // Show the unknown status for debugging
          break;
      }
    }, error => {
      console.error('Failed to fetch status:', error);
      this.statusMessage = "Error fetching status";
    });
  }

  loggout() {
    this.userService.loggout();
    this.router.navigate(['/login']);
  }
  private getRole() {
    return localStorage.getItem("role");
  }

}

