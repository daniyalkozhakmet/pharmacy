from os import terminal_size
from django.db.models import fields
from rest_framework import serializers
from .models import Brand, Category, Product,Order,OrderItem, Review,ShippingAddress
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['_id','username','email','name','isAdmin']
    def get_name(self,obj):
        name=obj.first_name
        if name == '':
            name=obj.email
        return name
    def get__id(self,obj):
        _id=obj.id
        return _id
    def get_isAdmin(self,obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['_id','username','email','name','token','isAdmin']
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)
class ProductSerializer(serializers.ModelSerializer):
    category=serializers.SerializerMethodField(read_only=True)
    brand=serializers.SerializerMethodField(read_only=True)
    review=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Product
        fields=['_id','brand','review','expiresAt','user','category','image','name','brand','description','rating','numReviews','price','countInStock','createdAt']
    def get_category(self,obj):
        serializer=CategorySerializer(obj.category,many=False)
        return serializer.data
    def get_brand(self,obj):
        serializer=BrandSerializer(obj.brand,many=False)
        return serializer.data    
    def get_review(self,obj):
        serializer=ReviewSerializer(obj.review_set.all(),many=True)
        return serializer.data    

class OrderSerializer(serializers.ModelSerializer):
    orderItem=serializers.SerializerMethodField(read_only=True)
    shippingAddress=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Order
        fields='__all__'
    def get_orderItem(self,obj):
        #OneToMany gettin child 
        orderItems=obj.orderitem_set.all()
        serializer=OrderItemSerializer(orderItems,many=True)
        return serializer.data
    def get_shippingAddress(self,obj):
        try:
            #OneToOne
            address=ShippingAddressSerializer(obj.shippingaddress,many=False).data
            return address
        except:
            address=False
            return address
    def get_user(self,obj):
        #OneToMany gettin parent
        serializer=UserSerializer(obj.user,many=False)
        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields='__all__'
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields='__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'        