from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, unique=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_set",  # ✅ Avoids conflict
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions_set",  # ✅ Avoids conflict
        blank=True
    )

    def __str__(self):
        return self.username
