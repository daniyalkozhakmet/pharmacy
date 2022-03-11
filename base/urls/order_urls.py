from django.urls import path
from django.urls.resolvers import URLPattern
from base.views import order_view as view
urlpatterns=[
    path('add',view.addOrder,name='add-order'),
    path('get',view.getOrders,name='get-orders'),
    path('delivered/<str:pk>',view.markDelivered,name='mark-delivered'),
    path('myorder',view.getMyOrder,name='my-order'),
    path('<str:pk>',view.getOrderById,name='get-order'),
    path('<str:pk>/pay',view.updatePaid,name='pay'),
    path('<str:pk>/delete',view.deleteOrder,name='delete Order')
]