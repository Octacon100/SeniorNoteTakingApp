export interface SeniorVisit {
    id: number;
    clientOrMember:string
    description: string;
    visitDate: string;
    lastDoctorVisitDate: string;
    sex: string;
    conditions: string;
    canAmbulate: boolean;
    canAmbulateNotes: string;
    hadFall: boolean;
    hadFallNotes: string;
    hadHospitalization: boolean;
    hadHospitalizationNotes: string;
    hadSkinIssues: boolean;
    hadSkinIssuesNotes: string;
    isEligible: boolean;
    criticalNeeds: string;
    serviceSchedule: string;
    goals: string;
    informalSupports: string;
    formalSupports: string;
    emergencyContacts: string;
    oPSD: boolean;
    nutritionScore: number;
    clientIncome: string;
    publicHealthBenefitsReviewed: boolean;
    cognitiveHealthStatus: string;
    mentalHealthStatus: string;
    extraNotes: string;
    riskLevel: string;
    nextHomeVisitDate: string;
    finalVisitReport: string;
}

