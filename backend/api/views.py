from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import User, Product, CartItem, Order, OrderItem, Wishlist
from .serializers import UserSerializer, ProductSerializer, CartItemSerializer,OrderSerializer,WishlistSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({"message": "User created successfully","token": str(refresh.access_token)}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    try:
        user = User.objects.get(username=username)
    except:
        return Response({"error": "User not found"}, status=400)
    if not user.check_password(password):
        return Response({"error": "Wrong password"}, status=400)
    refresh = RefreshToken.for_user(user)
    return Response({"message": "Login successful","token": str(refresh.access_token),})

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    search = request.GET.get("search")
    category = request.GET.get("category")
    if search:
        products = products.filter(name__icontains=search)
    if category:
        products = products.filter(category__icontains=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except:
        return Response({"error": "Product not found"}, status=404)
    
def is_admin(user):
    return user.role == "admin"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):
    if not is_admin(request.user):
        return Response({"error": "Only admin can add products"}, status=403)
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, id):
    if not is_admin(request.user):
        return Response({"error": "Only admin can update products"}, status=403)
    try:
        product = Product.objects.get(id=id)
    except:
        return Response({"error": "Product not found"}, status=404)
    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, id):
    if not is_admin(request.user):
        return Response({"error": "Only admin can delete products"}, status=403)
    try:
        product = Product.objects.get(id=id)
        product.delete()
        return Response({"message": "Product deleted"})
    except:
        return Response({"error": "Product not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product')
    quantity = request.data.get('quantity', 1)  # default 1
    if not product_id:
        return Response({"error": "product id is required"}, status=400)
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    cart_item, created = CartItem.objects.get_or_create(user=user, product=product,defaults={'quantity': quantity})
    if not created:
        cart_item.quantity += int(quantity)
        cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, id):
    user = request.user
    try:
        cart_item = CartItem.objects.get(id=id, user=user)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=404)
    quantity = request.data.get('quantity')
    if quantity is None:
        return Response({"error": "quantity is required"}, status=400)
    try:
        quantity = int(quantity)
        if quantity <= 0:
            cart_item.delete()
            return Response({"message": "Cart item removed"})
    except ValueError:
        return Response({"error": "quantity must be an integer"}, status=400)
    cart_item.quantity = quantity
    cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, id):
    user = request.user
    try:
        cart_item = CartItem.objects.get(id=id, user=user)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=404)
    cart_item.delete()
    return Response({"message": "Cart item removed"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    user = request.user
    CartItem.objects.filter(user=user).delete()
    return Response({"message": "Cart cleared"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)
    order = Order.objects.create(user=user)
    total_price = 0
    for item in cart_items:
        item_total = item.product.price * item.quantity
        total_price += item_total
        OrderItem.objects.create(order=order,product=item.product,quantity=item.quantity,price=item.product.price)
    order.total_price = total_price
    order.save()
    cart_items.delete()
    serializer = OrderSerializer(order)
    return Response({"message": "Order placed successfully", "order": serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_orders(request):
    if request.user.role != "admin":
        return Response({"error": "Only admin can access this"}, status=403)
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, id):
    if request.user.role != "admin":
        return Response({"error": "Only admin can update status"}, status=403)
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    new_status = request.data.get("status")
    if not new_status:
        return Response({"error": "Status is required"}, status=400)
    order.status = new_status
    order.save()
    serializer = OrderSerializer(order)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def admin_delete_order(request, id):
    if request.user.role != "admin":
        return Response({"error": "Only admin can delete orders"}, status=403)
    try:
        order = Order.objects.get(id=id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)
    order.delete()
    return Response({"message": "Order deleted successfully"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_order(request, id):
    try:
        order = Order.objects.get(id=id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or not yours"}, status=404)
    if order.status == "Delivered":
        return Response({"error": "You cannot cancel a delivered order"}, status=400)
    order.status = "Cancelled"
    order.save()
    return Response({"message": "Order cancelled successfully"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, id):
    try:
        order = Order.objects.get(id=id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or not yours"}, status=404)
    if order.status == "Delivered":
        return Response({"error": "Delivered orders cannot be cancelled"}, status=400)
    order.delete()
    return Response({"message": "Order deleted successfully"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fake_upi_payment(request):
    upi_id = request.data.get("upi_id")
    if not upi_id:
        return Response({"error": "UPI ID required"}, status=400)
    if "@" not in upi_id:
        return Response({"error": "Invalid UPI ID"}, status=400)
    return Response({"message": "Payment Successful","status": "success","transaction_id": "TXN" + str(request.user.id) + "12345"})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    data = {"id": user.id,"username": user.username,"email": user.email,"address": user.address 
            if hasattr(user, "address") else "","role": user.role}
    return Response(data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    address = request.data.get("address", "")
    user.address = address
    user.save()
    return Response({"message": "Profile updated successfully!"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    user = request.user
    product_id = request.data.get("product")
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    wishlist, created = Wishlist.objects.get_or_create(user=user, product=product)
    if not created:
        return Response({"message": "Already in wishlist"})
    return Response({"message": "Added to wishlist"}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wishlist(request):
    user = request.user
    items = Wishlist.objects.filter(user=user)
    serializer = WishlistSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_wishlist(request, id):
    user = request.user
    try:
        item = Wishlist.objects.get(id=id, user=user)
    except Wishlist.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    item.delete()
    return Response({"message": "Removed from wishlist"})

