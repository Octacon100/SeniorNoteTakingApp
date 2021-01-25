# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Create your models here.

def getCurrentDateTime():
    return timezone.now()

class SeniorVisit(models.Model):
    #id: number; Django automatically creates this.
    description = models.CharField(max_length=255)
    visitDate = models.DateField(default=getCurrentDateTime)
    lastDoctorVisitDate = models.DateField(default=getCurrentDateTime)
    sex = models.CharField(max_length=255)
    conditions = models.TextField()
    canAmbulate = models.BooleanField(default=False)
    canAmbulateNotes = models.CharField(max_length=1000)
    hadFall = models.BooleanField(default=False)
    hadFallNotes = models.CharField(max_length=1000)
    hadHospitalization = models.BooleanField(default=False)
    hadHospitalizationNotes = models.CharField(max_length=1000)
    hadSkinIssues = models.BooleanField(default=False)
    hadSkinIssuesNotes = models.CharField(max_length=1000)
    isEligible = models.BooleanField(default=False)
    criticalNeeds = models.CharField(max_length=1000)
    serviceSchedule = models.CharField(max_length=1000)
    goals = models.CharField(max_length=1000)
    informalSupports = models.CharField(max_length=1000)
    formalSupports = models.CharField(max_length=1000)
    emergencyContacts = models.CharField(max_length=1000)    
    oPSD = models.BooleanField(default=False)
    nutritionScore = models.SmallIntegerField(default=0)
    clientIncome = models.CharField(max_length=50)
    publicHealthBenefitsReviewed = models.BooleanField(default=False)
    cognitiveHealthStatus = models.CharField(max_length=1000)    
    mentalHealthStatus = models.CharField(max_length=1000)    
    extraNotes = models.CharField(max_length=1000)    
    riskLevel = models.CharField(max_length=1000)        
    nextHomeVisitDate = models.DateField(default=getCurrentDateTime)
    finalVisitReport = models.TextField()

    def __str__(self):
        return self.description

    

    
