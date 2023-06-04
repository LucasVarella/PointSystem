from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField()
    
    def count():
        pass
    
class Point(models.Model):
    TYPE_CHOICES = (
        ("E", "Entry"),
        ("P", "Pause"),
        ("R", "Return"),
        ("Q", "Quit")
    )
    
    time = models.CharField(max_length=5, blank=False, default='99:99')
    day = models.SmallIntegerField(blank=False, default=0)
    month = models.SmallIntegerField(blank=False, default=0)
    year = models.CharField(max_length=4, blank =False, default='2023')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, blank=False, null=False)
    
    def __str__(self):
        return (f"{self.type} - {self.day} - {self.user}")

class Corrections(models.Model):
    TYPE_CHOICES = (
        ("E", "Entry"),
        ("P", "Pause"),
        ("R", "Return"),
        ("Q", "Quit")
    )
    
    STATUS_CHOICES = (
        ("P","Pending"),
        ("A","Approved"),
        ("R","Refused"),
    )
    
    time = models.CharField(max_length=5, blank=False, default='99:99')
    day = models.SmallIntegerField(blank=False, default=0)
    month = models.SmallIntegerField(blank=False, default=0)
    year = models.CharField(max_length=4, blank =False, default='2023')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, blank=False, null=False)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, blank=False, null=False, default="P")