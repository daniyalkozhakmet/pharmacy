from django.core import paginator
from django.db.models.fields import related
from django.db.models.query import QuerySet
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.serializers import Serializer
from base.models import Review
from base.serializers import BrandSerializer
from base.models import Brand
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, CategorySerializer, ReviewSerializer
from base.models import Product, Category
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Q


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(Q(name__icontains=query) | Q(
        brand__name__icontains=query) | Q(category__name__icontains=query))
    page = request.query_params.get('page')
    if page == None:
        page = 1
    paginator = Paginator(products, 4)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page == None:
        page = 1
    page = int(page)
    serializers = ProductSerializer(products, many=True)

    return Response({'products': serializers.data, 'page': page, 'pages': paginator.num_pages})


# Get Categories
@api_view(['GET'])
def getCategory(request):
    category = Category.objects.all()
    serializers = CategorySerializer(category, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getBrand(request):
    brand = Brand.objects.all()
    serializers = BrandSerializer(brand, many=True)
    return Response(serializers.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBrand(request):
    data = request.data
    brand = Brand.objects.create(
        name=data['name'],
        description=data['description'],
        foundation=data['foundation'],
        country=data['country'],
    )
    brand.save()
    serializers = BrandSerializer(brand, many=False)
    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    brand.delete()
    return Response('Brand was deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    data = request.data
    category = Category.objects.create(
        name=data['name']
    )
    category.save()
    serializers = CategorySerializer(category, many=False)
    return Response(serializers.data)
# delete CATEGORY


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    category.delete()
    return Response('category was deleted')


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('product was deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    try:
        data = request.data
        print(data)
        category = Category.objects.get(_id=data['category'])
        brand = Brand.objects.get(_id=data['brand'])
        product = Product.objects.create(
            user=request.user,
            name=data['name'],
            expiresAt=data['expiresAt'],
            category=category,
            brand=brand,
            description=data['description'],
            price=data['price'],
            rating=data['rating'],
            countInStock=data['countInStock']
        )
        product.save()
        serializers = ProductSerializer(product, many=False)
        return Response(serializers.data)
    except:
        return Response('Server Error...')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        print(data)
        category = Category.objects.get(_id=data['category'])
        brand = Brand.objects.get(_id=data['brand'])
        product = Product.objects.get(_id=pk)
        product.name = data['name']
        product.category = category
        product.brand = brand
        product.description = data['description']
        product.price = data['price']
        product.rating = data['rating']
        if data['expiresAt'] != None:
            product.expiresAt=data['expiresAt']
        product.countInStock = data['countInStock']
        product.save()
        serializers = ProductSerializer(product, many=False)
        return Response(serializers.data)
    except:
        return Response({'message': 'Server error...'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response("Image is uploaded")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    # 1 Check if product has been reviewed
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'message': 'Product has been reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 2 Check if product dont have review
    elif data['rating'] == 0:
        content = {'message': 'No rating has been selected'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3 Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        review.save()
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        sum = 0
        for i in reviews:
            sum += i.rating
        product.rating = sum/len(reviews)
        product.save()
        return Response('Review has been successfully reviewed')
