from django.urls import path
from django.urls.resolvers import URLPattern
from base.views import product_view as views
urlpatterns=[
    path('',views.getProducts,name='getProducts'),
    path('create/uploadimage',views.uploadImage,name='uploadImage'),
    path('create',views.createProduct,name='getProducts'),
    path('create/category',views.createCategory,name='createCategory'),
    path('create/brand',views.createBrand,name='createBrand'),
    path('delete/category/<str:pk>',views.deleteCategory,name='deleteCategory'),
    path('delete/brand/<str:pk>',views.deleteBrand,name='deleteBrand'),
    path('category',views.getCategory,name='getCategory'),
    path('brand',views.getBrand,name='getBrand'),
    path('update/<str:pk>',views.updateProduct,name='updateProducts'),
    path('<str:pk>',views.getProduct,name='getProduct'),
    path('<str:pk>/review',views.createProductReview,name='createProductReview'),
    path('delete/<str:pk>',views.deleteProduct,name='deleteProduct'),
]