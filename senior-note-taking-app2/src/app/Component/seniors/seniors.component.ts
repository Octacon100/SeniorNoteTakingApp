import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {Senior} from '../../Interface/senior';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seniors',
  templateUrl: './seniors.component.html',
  styleUrls: ['./seniors.component.css']
})
export class SeniorsComponent implements OnInit {
  senior: Senior  = {
    id: 1,
    description: "",
    visitDate: Date(),
    lastDoctorVisitDate: "",
    sex: "",
    conditions: "",
    canAmbulate: false,
    canAmbulateNotes: "",
    hadFall: false,
    hadFallNotes: "",
    hadHospitalization: false,
    hadHospitalizationNotes: "",
    hadSkinIssues: false,
    hadSkinIssuesNotes: "",
    isEligible: true,
    criticalNeeds: "",
    serviceSchedule: "",
    goals: "",
    informalSupports: "",
    formalSupports:  "",
    emergencyContacts:  "",
    oPSD:  true,
    nutritionScore: 0,
    clientIncome:  "",
    publicHealthBenefitsReviewed: false,
    cognitiveHealthStatus:  "",
    mentalHealthStatus:  "",
    extraNotes: "",
    riskLevel: "",
    nextHomeVisitDate: "",
    finalVisitReport: ""
  };
  newline: string = "\r\n"

  constructor(
    public datepipe:DatePipe
  ) { 
    this.senior.visitDate = this.datepipe.transform(Date(), "yyyy-MM-dd")
    let nextHomeVisitDateDate:Date = new Date();
    nextHomeVisitDateDate.setMonth(nextHomeVisitDateDate.getMonth() + 6)
    this.senior.nextHomeVisitDate = this.datepipe.transform(nextHomeVisitDateDate, "yyyy-MM-dd")
    

  }

  ngOnInit() {


  }

  generateReport(){
    //this.senior.finalVisitReport = "Generating a report for you..." + this.newline;
    let clientString: string = this.getClientDescriptionString()
    this.senior.finalVisitReport = "";
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateIntro(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateLastDoctorVisitString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateConditionString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateAmubulationString(clientString);

    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateFallsString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateHospitalizationString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateSkinIssuesString(clientString);

    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateEligibleString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateServicePlanString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateSupportStrings(clientString, "informal supports");
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateSupportStrings(clientString,"formal supports");
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateSupportStrings(clientString,"emergency contacts");
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateOPSDString();
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateNutritionScoreString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateClientIncomeString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generatePublicHealthBenefitsString(clientString);
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.senior.mentalHealthStatus + this.newline + this.newline;
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.senior.cognitiveHealthStatus + this.newline + this.newline;
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.senior.extraNotes + this.newline + this.newline;
    this.senior.finalVisitReport = this.senior.finalVisitReport + this.generateRiskScoreString(clientString);
    this.senior.finalVisitReport =this.senior.finalVisitReport + this.generateNextVisitString(clientString);
  }

  //Not sure where to put this right now, this will do.

  pullStringFromArray(arrayToPullFrom:string[], newLineNeeded:boolean = true){
    let newlines: string = ""
    if (newLineNeeded)
    {
      newlines = this.newline + this.newline
    }
    let randomString: string = arrayToPullFrom[Math.floor(Math.random() * arrayToPullFrom.length)] + newlines;
    return randomString;
  }

  generateIntro(clientString:string){
    let insertDate: string = this.formatDateForReport(this.senior.visitDate);
    let introStrings: string[] = [
      "This is a summary report for "+ clientString + " from a visit performed on " + insertDate + ".",
      "On " + insertDate + ", I visited "+ clientString + " and here are my findings.",
      clientString + " was visited on " + insertDate + " and the following findings were noted.",
      "I met " + clientString + " on " + insertDate + " and here are my findings from the meeting."
    ];
    return this.pullStringFromArray(introStrings);
  }

  private formatDateForReport(dateToFormat:string): string {
    return this.datepipe.transform(dateToFormat, "MM/dd/yyy");
  }

  generateConditionString(clientString:string){
    let conditionStrings: string[] = [
      clientString + " has the following conditions: " + this.senior.conditions,
      "The client's medical conditions include: " + this.senior.conditions,
      clientString + " suffers from conditions such as: " + this.senior.conditions,
      "The client has has these conditions on their medical record: " + this.senior.conditions
    ];
    return this.pullStringFromArray(conditionStrings);    
  }  

  private getClientDescriptionString(): string {
    return this.senior.description;
  }

  generateAmubulationString(clientString:string){
    let noDeviceAmbulateStrings: string[] = [
      "The client uses no device to ambulate.",
      "The client is able to ambulate without a device.",
      clientString + " is capable of ambulation without a device.",
      clientString + " ambulates without the use of a device."
    ]
    let ambulateStrings: string[] = [
      "The client is able to ambulate.",
      clientString + " can ambulate.",
      clientString + " is capable of ambulation.",
      "The client is capable of ambulation."      
    ]
    let UnableToAmbulateStrings: string[] = [
      "The client is able to ambulate.",
      clientString + " cannot ambulate.",
      clientString + " is incapable of ambulation.",
      "The client is incapable of ambulation."      
    ]
    let returnString: string;
    if (this.senior.canAmbulate == true)
    {
      returnString = this.pullStringFromArray(ambulateStrings);
      if (this.senior.canAmbulateNotes == "" )
      {
        returnString = returnString + this.pullStringFromArray(noDeviceAmbulateStrings, false);
      }
      else
      {
        returnString = returnString + this.senior.canAmbulateNotes
      }
    }
    else
    {
      returnString = this.pullStringFromArray(UnableToAmbulateStrings, false) + this.senior.canAmbulateNotes; 
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }

  generateEligibleString(clientString:string) {
    let eligibleStrings: string[] = [
      "The client is still eligible for this program.",
      clientString + " is still eligible for this program.",
      clientString + " is currently eligible for this program.",
      "The client is currently eligible for this program."      
    ]
    let ineligibleStrings: string[] = [
      "The client is no longer eligible for this program.",
      clientString + " no longer eligible for this program.",
      clientString + " is currently ineligible for this program.",
      "The client is currently ineligible for this program."      
    ]
    let returnString: string;
    if (this.senior.isEligible)
    {
      returnString = this.pullStringFromArray(eligibleStrings);    
    }
    else
    {
      returnString = this.pullStringFromArray(ineligibleStrings);    
    }
    return returnString 
  }

  generateServicePlanString(clientString:string){
    let randomStrings: string[] = [
      "The client's service plan is " + this.senior.serviceSchedule,
      clientString + "'s service plan is " + this.senior.serviceSchedule,
      "The service plan that the client is currently on is " + this.senior.serviceSchedule,
      "The service plan that " + clientString + " is currently on is " + this.senior.serviceSchedule,
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings) ;    
    return returnString
  }

  generateGoalsString(clientString:string){
    let randomStrings: string[] = [
      "The client's goal is: \"" ,
      clientString + "'s current goal is: \"",
      "The current goal the client's has is: \"" ,
      clientString + " is currently working towards this goal: \"",
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.senior.serviceSchedule + "\"" + this.newline + this.newline;    
  }


  generateSupportStrings(clientString:string, supportType:string){
    let randomStrings: string[] = [
      "The client's " + supportType + " are ",
      "Current " + supportType + " include ",
      "Current " + supportType + " for " + clientString + " are ",
      "This client's current " + supportType + " include "
    ]
    let returnString: string;
    if (  supportType == "informal supports" || supportType == "formal supports" || supportType == "emergency contacts")
    {
      if (supportType == "informal supports")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.senior.informalSupports;    
      }
      else if (supportType == "formal supports")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.senior.formalSupports;    
      }
      else if (supportType == "emergency contacts")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.senior.emergencyContacts;    
      }
      returnString = returnString + this.newline + this.newline;
    }
    return returnString;
  }

  generateOPSDString(){
    let randomStrings: string[] = [
      "The OPSD form has been submitted to administration staff.",
      "The OPSD form has been sent to admin.",
      "The OPSD form has been filled out and submitted to administrator staff.",
      "The OPSD form has been filled out and given to admin staff."
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings);    
    return returnString
  }

  generateNutritionScoreString(clientString:string){
    let randomStrings: string[] = [
      "The nutrition score was assessed and the nutrition score is ",
      clientString + " has a nutrition score of ",
      "The nutrition score for this client is ",
      clientString + "'s nutrition score is "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.senior.nutritionScore + "." + this.newline + this.newline;    
    return returnString
  }

  generateClientIncomeString(clientString:string){
    let randomStrings: string[] = [
      "The client has a yearly income of: ",
      clientString + "'s  income is: ",
      "The client's annual income is: ",
      clientString + " has a yearly income of: "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.senior.clientIncome + "." + this.newline + this.newline;    
    return returnString
  } 
  
  generatePublicHealthBenefitsString(clientString:string){
    let randomStrings: string[] = [
      "The client has had their public health benefits explained to them and options open to them.",
      "The client understands their public health benefits and how to claim them.",
      clientString + " is aware of the public health benefits they can claim.",
      clientString + " is willing to look into public health benefits that can help them out.",
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings);    
    return returnString
  }

  generateRiskScoreString(clientString:string){
    let randomStrings: string[] = [
      "The risk score was assessed and the risk score is ",
      clientString + " has a risk score of ",
      "The risk score for this client is ",
      clientString + "'s risk score is "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.senior.riskLevel + "." + this.newline + this.newline;    
    return returnString
  }

  generateNextVisitString(clientString:string){
    let inputDate:string = this.formatDateForReport(this.senior.nextHomeVisitDate);
    let randomStrings: string[] = [
      "The next home-visit assessment will occur on " + inputDate,
      clientString + " will have their next home visit assessment on " + inputDate,
      "We scheduled our next home visit together for " + inputDate,
      clientString + " will have their next assessment on " + inputDate
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings)    
    return returnString
  }

  generateLastDoctorVisitString(clientString:string){
    let inputString: string = this.formatDateForReport(this.senior.lastDoctorVisitDate); 
    let randomStrings: string[] = [
      "The client's last doctor visit was on " + inputString,
      clientString + " had their last doctor visit on " + inputString,
      "The client last saw their doctor on " + inputString,
      clientString + " last saw their doctor on " + inputString
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings)    
    return returnString
  }

  generateFallsString(clientString:string){
    let noFallStrings: string[] = [
      "The client has not fallen since the last visit.",
      "The client has not had any falls recently.",
      clientString + " has not had any falls recently.",
      clientString + " has not fallen since the last visit."
    ]
    let fallStrings: string[] = [
      "The client had a fall recently.",
      clientString + " fell recently.",
      clientString + " had a fall recently.",
      "The client fell recently."      
    ]
    let returnString: string;
    if (this.senior.hadFall == true)
    {
      returnString = this.pullStringFromArray(fallStrings, false) + " " + this.senior.hadFallNotes;
    }
    else
    {
      returnString = this.pullStringFromArray(noFallStrings, false);
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }

  generateHospitalizationString(clientString:string){
    let noHospitalizationStrings: string[] = [
      "The client has been to hospital since the last visit.",
      "The client has not been to hospital recently.",
      clientString + " has not been to hospital recently.",
      clientString + " has not been to hospital since the last visit."
    ]
    let hospitalizationStrings: string[] = [
      "The client has been to hospital recently.",
      clientString + " has been to hospital recently.",
      clientString + " had a hospitalization recently.",
      "The client was hospitalized recently."      
    ]
    let returnString: string;
    if (this.senior.hadFall == true)
    {
      returnString = this.pullStringFromArray(hospitalizationStrings, false) + " " + this.senior.hadHospitalizationNotes;
    }
    else
    {
      returnString = this.pullStringFromArray(noHospitalizationStrings, false);
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }

  generateSkinIssuesString(clientString:string){
    let noSkinIssuesStrings: string[] = [
      "The client has been to hospital since the last visit.",
      "The client has not been to hospital recently.",
      clientString + " has not been to hospital recently.",
      clientString + " has not been to hospital since the last visit."
    ]
    let hadSkinIssuesStrings: string[] = [
      "The client has been to hospital recently.",
      clientString + " has been to hospital recently.",
      clientString + " had a hospitalization recently.",
      "The client was hospitalized recently."      
    ]
    let returnString: string;
    if (this.senior.hadFall == true)
    {
      returnString = this.pullStringFromArray(hadSkinIssuesStrings, false) + " " + this.senior.hadSkinIssuesNotes;
    }
    else
    {
      returnString = this.pullStringFromArray(noSkinIssuesStrings, false);
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }


}

  