from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from base.serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from base.models import Product
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    try:
        data=request.data
        user=User.objects.create(
        username=data['email'],
        first_name=data['name'],
        email=data['email'],
        password=make_password(data['password'])
        )
        serializers=UserSerializerWithToken(user,many=False)

        return Response(serializers.data)
    except:
        content={'message':'User with this email already exists'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializers=UserSerializer(users,many=True)
    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializers=UserSerializer(user,many=False)
    return Response(serializers.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    data=request.data

    user.username=data['email']
    user.first_name=data['name']
    if data['password'] != '' :
        user.password=make_password(data['password'])
    user.save()
    serializers=UserSerializerWithToken(user,many=False)
    return Response(serializers.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    user=User.objects.get(id=pk)
    user.delete()
    return Response('User is deleted')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
    user=User.objects.get(id=pk)
    data=request.data
    user.email=data['email']
    user.first_name=data['name']
    user.is_staff=data['isAdmin']
    user.save()
    serializers=UserSerializer(user,many=False)
    return Response(serializers.data)
