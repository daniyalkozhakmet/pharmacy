from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model
from django.db.models.deletion import SET_NULL
from django.db.models.fields import AutoField, CharField, DateTimeField, DecimalField, IntegerField, TextField
from django.db.models.fields.related import ForeignKey
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.timezone import now
# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name

class Brand(models.Model):
    name=models.CharField(max_length=200,null=True,blank=True)
    description=models.TextField(null=True,blank=True)
    foundation=models.DateField(auto_now_add=False,blank=True,null=True)
    country=models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)   
    def __str__(self):
        return self.name

class Product(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    category=models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    image=models.ImageField(null=True,blank=True,default='default.png')
    name=models.CharField(max_length=200,null=True,blank=True)
    brand=models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True)
    description=models.TextField(null=True,blank=True)
    rating=models.DecimalField(max_digits=7,decimal_places=2)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2)
    expiresAt=models.DateTimeField(auto_now_add=False,blank=True,null=True)
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return self.name

class Review(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    rating=models.DecimalField(max_digits=7,decimal_places=2)
    comment=models.TextField(null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)
    createdAt=models.DateTimeField(default=now,blank=True)
    
    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,default='Deleted User')
    paymentMethod=models.CharField(max_length=200,null=True,blank=True)
    taxPrice=models.DecimalField(max_digits=7,decimal_places=2)
    shippingPrice=models.DecimalField(max_digits=7,decimal_places=2)
    totalPrice=models.DecimalField(max_digits=7,decimal_places=2)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateTimeField(auto_now_add=False,blank=True,null=True)
    deliveredAt=models.DateTimeField(auto_now_add=False,blank=True,null=True)
    isDelivered=models.BooleanField(default=False)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order=models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name=models.CharField(max_length=200,null=True,blank=True)
    qty=models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2)
    image=models.CharField(max_length=200,null=True,blank=True)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    order=models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    address=models.CharField(max_length=200,null=True,blank=True)
    city=models.CharField(max_length=200,null=True,blank=True)
    postalCode=models.CharField(max_length=200,null=True,blank=True)
    country=models.CharField(max_length=200,null=True,blank=True)
    shippingPrice=models.DecimalField(max_digits=7,decimal_places=2)
    _id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.address)

@receiver(pre_save,sender=User)
def pre_save_handler(sender,instance,*args,**kwargs):
    if instance.email != '':
        instance.username=instance.email