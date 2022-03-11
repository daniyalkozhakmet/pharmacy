from django.urls import path
from django.urls.resolvers import URLPattern
from base.views import user_views as views
urlpatterns=[
    path('', views.getUsers, name='getUsers'),
    path('get1/<str:pk>', views.getUserById, name='getUserById'),
    path('update/<str:pk>', views.updateUser, name='updateUser'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('delete/<str:pk>', views.deleteUser, name='deleteUser'),
    path('register', views.registerUser, name='registerUser'),
    path('profile',views.getUserProfile,name='user-profile'),
    path('profile/update',views.updateUserProfile,name='user-profile-update'),
]