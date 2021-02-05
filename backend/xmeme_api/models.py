from django.db import models

class Meme(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(max_length = 200)
    caption = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    