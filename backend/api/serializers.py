from rest_framework import serializers
from .models import User, Product, CartItem, Order, OrderItem, Wishlist
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'address']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.FloatField(source='product.price', read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'product_name', 'product_price','quantity', 'added_at']
        read_only_fields = ['user', 'added_at', 'product_name', 'product_price']

class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'user_name', 'total_price','status', 'created_at', 'items']
        read_only_fields = ['user', 'created_at', 'items', 'total_price']

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = Wishlist
        fields = ['id', 'product', 'added_at']
