# noteEntry/resources.py
from tastypie.resources import ModelResource
from noteEntry.models import SeniorVisit
class SeniorVisitResource(ModelResource):
    class Meta:
        queryset = SeniorVisit.objects.all()
        resource_name = 'seniorvisit'