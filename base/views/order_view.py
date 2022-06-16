from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from base.models import OrderItem, ShippingAddress
from base.serializers import ProductSerializer,UserSerializer,UserSerializerWithToken,OrderSerializer
from base.models import Product
from base.models import Order
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, status
from datetime import date, datetime
from django.conf import settings
import smtplib
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user=request.user
    data=request.data
    if data['orderItems'] and len(data['orderItems'])==0:
        return Response({'message':'Order is Empty'}, status=status.HTTP_400_BAD_REQUEST)
    # (1) create Order
    order=Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice']
    )
    # (2) create ShippingAddrees
    shippingAddress=ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
        shippingPrice=data['shippingPrice']
    )
    # (3) create OrderItems
    for item in data['orderItems']:
        product=Product.objects.get(_id=item['product'])

        orderItem=OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=item['qty'],
            price=product.price,
            image=product.image.url
        )
        # (4) update countInStock
        product.countInStock-=orderItem.qty
        product.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrder(request):
    user=request.user
    orders=user.order_set.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user=request.user
    try:
        order=Order.objects.get(_id=pk)
        if user.is_staff or order.user==user:
            serializer=OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'message':'Not authorized'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePaid(request,pk):
    user=User.objects.get(email=request.user)
    # my_email=settings.EMAIL_HOST_USER
    # password=settings.EMAIL_HOST_PASSWORD
    # subject='Thank you for Purchase'
    # message='Your order will be delivered as soon as possible.You can track your order by 4275233253'
    # with smtplib.SMTP('smtp.gmail.com') as connection:
    #     connection.starttls()
    #     connection.login(user=my_email,password=password)
    #     connection.sendmail(from_addr=my_email,to_addrs=user.email,msg=f'Subject:{subject}\n\n{message}')
    order=Order.objects.get(_id=pk)
    order.isPaid=True
    order.paidAt=datetime.now()
    order.save()
    return Response('Order now Paid')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders=Order.objects.filter(isPaid=True)
    serializers=OrderSerializer(orders,many=True)
    return Response(serializers.data)  
#delete order
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOrder(request,pk):
    order=Order.objects.get(_id=pk)
    print(order)
    orderItem=order.orderitem_set.all()
    for  i in orderItem:
        product=Product.objects.get(name=i.product)
        product.countInStock+=i.qty
        product.save()
    if order.user==request.user:
        order.delete()
        return Response('Deleted successfully')
    else:
        return Response({'message':'Access Denied'},status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET'])
@permission_classes([IsAdminUser])
def markDelivered(request,pk):
    order=Order.objects.get(_id=pk)
    order.isDelivered=True
    order.deliveredAt=datetime.now()
    order.save()
    serializers=OrderSerializer(order,many=False)
    return Response(serializers.data)