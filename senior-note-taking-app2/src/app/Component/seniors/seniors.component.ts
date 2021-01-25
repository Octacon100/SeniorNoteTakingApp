import { Component, OnInit } from '@angular/core';
import {SeniorVisit} from '../../Interface/senior-visit';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seniors',
  templateUrl: './seniors.component.html',
  styleUrls: ['./seniors.component.css']
})
export class SeniorsComponent implements OnInit {
  seniorVisit: SeniorVisit  = {
    id: 1,
    clientOrMember: "client",
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
    nextHomeVisitDate: "in three months time",
    finalVisitReport: ""
  };
  newline: string = "\r\n"

  constructor(
    public datepipe:DatePipe
  ) { 
    this.seniorVisit.visitDate = this.datepipe.transform(Date(), "yyyy-MM-dd")   
  }

  ngOnInit() {


  }

  generateReport(){
    //this.senior.finalVisitReport = "Generating a report for you..." + this.newline;
    let clientString: string = this.getClientDescriptionString()
    this.seniorVisit.finalVisitReport = "";
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateIntro(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateLastDoctorVisitString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateConditionString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateAmubulationString(clientString);

    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateFallsString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateHospitalizationString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateSkinIssuesString(clientString);

    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateEligibleString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateServicePlanString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateSupportStrings(clientString, "informal supports");
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateSupportStrings(clientString,"formal supports");
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateSupportStrings(clientString,"emergency contacts");
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateOPSDString();
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateNutritionScoreString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateClientIncomeString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generatePublicHealthBenefitsString(clientString);
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.seniorVisit.mentalHealthStatus + this.newline + this.newline;
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.seniorVisit.cognitiveHealthStatus + this.newline + this.newline;
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.seniorVisit.extraNotes + this.newline + this.newline;
    this.seniorVisit.finalVisitReport = this.seniorVisit.finalVisitReport + this.generateRiskScoreString(clientString);
    this.seniorVisit.finalVisitReport =this.seniorVisit.finalVisitReport + this.generateNextVisitString(clientString);
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
    let insertDate: string = this.formatDateForReport(this.seniorVisit.visitDate);
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
      clientString + " has the following conditions: " + this.seniorVisit.conditions,
      "The " + this.seniorVisit.clientOrMember + "'s medical conditions include: " + this.seniorVisit.conditions,
      clientString + " suffers from conditions such as: " + this.seniorVisit.conditions,
      "The " + this.seniorVisit.clientOrMember + " has has these conditions on their medical record: " + this.seniorVisit.conditions
    ];
    return this.pullStringFromArray(conditionStrings);    
  }  

  private getClientDescriptionString(): string {
    return this.seniorVisit.description;
  }

  generateAmubulationString(clientString:string){
    let noDeviceAmbulateStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " uses no device to ambulate.",
      "The " + this.seniorVisit.clientOrMember + " is able to ambulate without a device.",
      clientString + " is capable of ambulation without a device.",
      clientString + " ambulates without the use of a device."
    ]
    let ambulateStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " is able to ambulate.",
      clientString + " can ambulate.",
      clientString + " is capable of ambulation.",
      "The " + this.seniorVisit.clientOrMember + " is capable of ambulation."      
    ]
    let UnableToAmbulateStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " is able to ambulate.",
      clientString + " cannot ambulate.",
      clientString + " is incapable of ambulation.",
      "The " + this.seniorVisit.clientOrMember + " is incapable of ambulation."      
    ]
    let returnString: string;
    if (this.seniorVisit.canAmbulate == true)
    {
      returnString = this.pullStringFromArray(ambulateStrings);
      if (this.seniorVisit.canAmbulateNotes == "" )
      {
        returnString = returnString + this.pullStringFromArray(noDeviceAmbulateStrings, false);
      }
      else
      {
        returnString = returnString + this.seniorVisit.canAmbulateNotes
      }
    }
    else
    {
      returnString = this.pullStringFromArray(UnableToAmbulateStrings, false) + this.seniorVisit.canAmbulateNotes; 
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }

  generateEligibleString(clientString:string) {
    let eligibleStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " is still eligible for this program.",
      clientString + " is still eligible for this program.",
      clientString + " is currently eligible for this program.",
      "The " + this.seniorVisit.clientOrMember + " is currently eligible for this program."      
    ]
    let ineligibleStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " is no longer eligible for this program.",
      clientString + " no longer eligible for this program.",
      clientString + " is currently ineligible for this program.",
      "The " + this.seniorVisit.clientOrMember + " is currently ineligible for this program."      
    ]
    let returnString: string;
    if (this.seniorVisit.isEligible)
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
      "The " + this.seniorVisit.clientOrMember + "'s service plan is " + this.seniorVisit.serviceSchedule,
      clientString + "'s service plan is " + this.seniorVisit.serviceSchedule,
      "The service plan that the " + this.seniorVisit.clientOrMember + " is currently on is " + this.seniorVisit.serviceSchedule,
      "The service plan that " + clientString + " is currently on is " + this.seniorVisit.serviceSchedule,
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings) ;    
    return returnString
  }

  generateGoalsString(clientString:string){
    let randomStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + "'s goal is: \"" ,
      clientString + "'s current goal is: \"",
      "The current goal the " + this.seniorVisit.clientOrMember + "'s has is: \"" ,
      clientString + " is currently working towards this goal: \"",
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.serviceSchedule + "\"" + this.newline + this.newline;    
  }


  generateSupportStrings(clientString:string, supportType:string){
    let randomStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + "'s " + supportType + " are ",
      "Current " + supportType + " include ",
      "Current " + supportType + " for " + clientString + " are ",
      "This " + this.seniorVisit.clientOrMember + "'s current " + supportType + " include "
    ]
    let returnString: string;
    if (  supportType == "informal supports" || supportType == "formal supports" || supportType == "emergency contacts")
    {
      if (supportType == "informal supports")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.informalSupports;    
      }
      else if (supportType == "formal supports")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.formalSupports;    
      }
      else if (supportType == "emergency contacts")
      {
        returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.emergencyContacts;    
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
      "The nutrition score for this " + this.seniorVisit.clientOrMember + " is ",
      clientString + "'s nutrition score is "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.nutritionScore + "." + this.newline + this.newline;    
    return returnString
  }

  generateClientIncomeString(clientString:string){
    let randomStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " has a yearly income of: ",
      clientString + "'s  income is: ",
      "The " + this.seniorVisit.clientOrMember + "'s annual income is: ",
      clientString + " has a yearly income of: "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.clientIncome + "." + this.newline + this.newline;    
    return returnString
  } 
  
  generatePublicHealthBenefitsString(clientString:string){
    let randomStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " has had their public health benefits explained to them and options open to them.",
      "The " + this.seniorVisit.clientOrMember + " understands their public health benefits and how to claim them.",
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
      "The risk score for this " + this.seniorVisit.clientOrMember + " is ",
      clientString + "'s risk score is "
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings, false) + this.seniorVisit.riskLevel + "." + this.newline + this.newline;    
    return returnString
  }

  generateNextVisitString(clientString:string){
    let inputDate:string = this.formatDateForReport(this.seniorVisit.nextHomeVisitDate);
    let randomStrings: string[] = [
      "The next home-visit assessment will occur " + inputDate,
      clientString + " will have their next home visit assessment " + inputDate,
      "We scheduled our next home visit together " + inputDate,
      clientString + " will have their next assessment " + inputDate
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings)    
    return returnString
  }

  generateLastDoctorVisitString(clientString:string){
    let inputString: string = this.formatDateForReport(this.seniorVisit.lastDoctorVisitDate); 
    let randomStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + "'s last doctor visit was on " + inputString,
      clientString + " had their last doctor visit on " + inputString,
      "The " + this.seniorVisit.clientOrMember + " last saw their doctor on " + inputString,
      clientString + " last saw their doctor on " + inputString
    ]
    let returnString: string;
    returnString = this.pullStringFromArray(randomStrings)    
    return returnString
  }

  generateFallsString(clientString:string){
    let noFallStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " has not fallen since the last visit.",
      "The " + this.seniorVisit.clientOrMember + " has not had any falls recently.",
      clientString + " has not had any falls recently.",
      clientString + " has not fallen since the last visit."
    ]
    let fallStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " had a fall recently.",
      clientString + " fell recently.",
      clientString + " had a fall recently.",
      "The " + this.seniorVisit.clientOrMember + " fell recently."      
    ]
    let returnString: string;
    if (this.seniorVisit.hadFall == true)
    {
      returnString = this.pullStringFromArray(fallStrings, false) + " " + this.seniorVisit.hadFallNotes;
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
      "The " + this.seniorVisit.clientOrMember + " has been to hospital since the last visit.",
      "The " + this.seniorVisit.clientOrMember + " has not been to hospital recently.",
      clientString + " has not been to hospital recently.",
      clientString + " has not been to hospital since the last visit."
    ]
    let hospitalizationStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " has been to hospital recently.",
      clientString + " has been to hospital recently.",
      clientString + " had a hospitalization recently.",
      "The " + this.seniorVisit.clientOrMember + " was hospitalized recently."      
    ]
    let returnString: string;
    if (this.seniorVisit.hadFall == true)
    {
      returnString = this.pullStringFromArray(hospitalizationStrings, false) + " " + this.seniorVisit.hadHospitalizationNotes;
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
      "The " + this.seniorVisit.clientOrMember + " has not had a skin issue since the last visit.",
      "The " + this.seniorVisit.clientOrMember + " has not had a skin issue recently.",
      clientString + " has not had a skin issue recently.",
      clientString + " has not had a skin issue since the last visit."
    ]
    let hadSkinIssuesStrings: string[] = [
      "The " + this.seniorVisit.clientOrMember + " has had a skin issue recently.",
      clientString + " has had a skin issue recently.",
      clientString + " had a skin issue recently.",
      "The " + this.seniorVisit.clientOrMember + " had a skin issue recently."      
    ]
    let returnString: string;
    if (this.seniorVisit.hadFall == true)
    {
      returnString = this.pullStringFromArray(hadSkinIssuesStrings, false) + " " + this.seniorVisit.hadSkinIssuesNotes;
    }
    else
    {
      returnString = this.pullStringFromArray(noSkinIssuesStrings, false);
    }
    returnString = returnString + this.newline + this.newline;
    return returnString;
  }


}

  