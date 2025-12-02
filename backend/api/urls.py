from django.urls import path
from django.urls import path
from .views import (register_user, login_user,get_products, get_product,create_product, update_product, 
                    delete_product, view_cart, add_to_cart, update_cart_item, remove_cart_item, clear_cart,
                    create_order, my_orders, all_orders, update_order_status, admin_delete_order, fake_upi_payment,
                    cancel_order, delete_order, get_profile, update_profile, add_to_wishlist, remove_wishlist, get_wishlist
                    )
urlpatterns = [
    path("register/", register_user),
    path("login/", login_user),
    path("products/", get_products),
    path("products/<int:id>/", get_product),
    path("products/add/", create_product),
    path("products/update/<int:id>/", update_product),
    path("products/delete/<int:id>/", delete_product),
    path("cart/", view_cart),
    path("cart/add/", add_to_cart),
    path("cart/update/<int:id>/", update_cart_item),
    path("cart/remove/<int:id>/", remove_cart_item),
    path("cart/clear/", clear_cart),
    path("orders/create/", create_order),
    path("orders/me/", my_orders),
    path("orders/all/", all_orders),
    path("orders/cancel/<int:id>/", cancel_order),
    path("orders/delete/<int:id>/", delete_order),
    path("orders/update/<int:id>/", update_order_status),
    path("orders/admin-delete/<int:id>/", admin_delete_order),
    path("payment/upi/", fake_upi_payment),
    path("auth/me/", get_profile),
    path("auth/update-profile/", update_profile),
    path("wishlist/add/", add_to_wishlist),
    path("wishlist/", get_wishlist),
    path("wishlist/remove/<int:id>/", remove_wishlist),
]

