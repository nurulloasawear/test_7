from django.db import models

class UserData(models.Model):
    username = models.CharField(max_length=150, unique=True, verbose_name="Foydalanuvchi nomi")
    email = models.EmailField(verbose_name="Email")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return self.username

class SystemLog(models.Model):
    log_level = models.CharField(max_length=50, verbose_name="Log darajasi")
    message = models.TextField(verbose_name="Xabar")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Vaqti")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return f"{self.log_level} - {self.timestamp}"