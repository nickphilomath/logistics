from django.db import models
from core.models import User
from core.constants import CONSTANTS

############## driver ##############
class BaseDriver(models.Model):
    dispatcher = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    # current_load = None
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    driver_type = models.CharField(max_length=3, choices=CONSTANTS.DRIVER_TYPE, default=CONSTANTS.DEFAULT_DRIVER_TYPE)
    status = models.CharField(max_length=3, choices=CONSTANTS.DRIVER_STATUS, default=CONSTANTS.DEFAULT_DRIVER_STATUS)
    gross_target = models.DecimalField(max_digits=9, decimal_places=2, default=10000.00)
    notes = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        abstract = True

class Driver(BaseDriver):
    # current_load = models.ForeignKey('Load', null=True, on_delete=models.CASCADE, related_name='driver_load')
    d_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    l_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    r_budget = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    last_status_change = models.DateTimeField(auto_now=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
class EditDriver(BaseDriver):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name='edit_driver')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='edit_driver_user')
    edit_time = models.DateTimeField(auto_now_add=True)



############## trailer ##############
class BaseTrailer(models.Model):
    number = models.CharField(max_length=20)
    status = models.CharField(max_length=3, choices=CONSTANTS.TRAILER_STATUS, default=CONSTANTS.DEFAULT_TRAILER_STATUS)
    notes = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        abstract = True

class Trailer(BaseTrailer):
    pass

class EditTrailer(BaseTrailer):
    trailer = models.ForeignKey(Trailer, on_delete=models.CASCADE, related_name='edit_trailer')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='edit_trailer_user')
    edit_time = models.DateTimeField(auto_now_add=True)


############## actions ##############
class Action(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    operation = models.CharField(max_length=3, choices=CONSTANTS.OPERATIONS)
    target = models.BigIntegerField(null=True)
    target_name = models.CharField(max_length=3, choices=CONSTANTS.TARGET_NAMES)
    time = models.DateTimeField(auto_now_add=True)