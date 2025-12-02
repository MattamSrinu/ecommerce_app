from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    address = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=10, default="user")
    def __str__(self):
        return self.username
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=250)
    price = models.FloatField()
    category = models.CharField(max_length=250)
    stock = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.URLField(max_length=500, null=True, blank=True)
    def __str__(self):
        return self.name

class CartItem(models.Model):
    user = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username}-{self.product.name}x{self.quantity}"

class Order(models.Model):
    user = models.ForeignKey('api.User', on_delete=models.CASCADE)
    total_price = models.FloatField(default=0)
    status = models.CharField(max_length=20, default="Pending")  
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.FloatField(default=0)
    def __str__(self):
        return f"{self.product.name}x{self.quantity}"

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username}-{self.product.name}"

