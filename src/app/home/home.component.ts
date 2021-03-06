import { Component, OnInit } from '@angular/core';
import { employeeDetail } from '../emp-search/emp.constant';
import { emp } from '../emp-search/emp.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    empDetails: emp[];
    teams = ["Product Team", "IDC", "OCBC Singapore", "Radian", "Rustify"];
    selectedOption: string = "Choose Team";
    isChecked: boolean;
    state$: Observable<object>;
    rating: number;
    routedData: any;
    //starList: boolean[] = [true,true,true,true,true];

    constructor(public activatedRoute: ActivatedRoute, private router: Router) {
        this.routedData = this.router.getCurrentNavigation().extras.state;
     }

    ngOnInit() {
        this.empDetails = (this.routedData && this.routedData.filteredEmpData) || employeeDetail;
     }

    filterEmployeesWithTeam(team) {
        if (team === "Choose Team") {
            this.empDetails = employeeDetail;
        } else {
            this.empDetails = employeeDetail.filter(item => {return item["team"].toLowerCase() === team.toLowerCase()});
            if (this.isChecked) {
                this.empDetails = this.empDetails.filter(item => {return item["location"].toLowerCase().includes("Bangalore".toLowerCase())});
            }
        }
        return this.empDetails;
    }

    teamSelected (e) {
        let selectedTeam = e.target.value;
        this.selectedOption = selectedTeam;
        const filteredEmployees: emp[] = (selectedTeam == "Choose Team") ? this.filterEmployeesWithTeam("Not Selected"): this.filterEmployeesWithTeam(selectedTeam);
        console.log(filteredEmployees);
    }

    onCheckboxChecked(e) {
        if (e.target.checked) {
            this.isChecked = true;
            this.empDetails = this.empDetails.filter(item => {
                return item["location"].toLowerCase().includes("Bangalore".toLowerCase());
            });
        } else {
            this.isChecked = false;
            console.log(this.selectedOption);
            this.empDetails = this.filterEmployeesWithTeam(this.selectedOption);
        }
    }

    // setStar(e, data:any){
    //     this.rating = data + 1;
    //     for (var i = 0 ; i <= 4; i++){
    //         if (i <= data){
    //             this.starList[i] = false;
    //         } else{
    //             this.starList[i] = true;
    //         }
    //     }
    // }
}