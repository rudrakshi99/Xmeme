from django.db import models

# Model of Meme class
class Meme(models.Model):
    name = models.CharField(max_length=100)          # name of meme creator
    url = models.URLField(max_length = 200)          # url of the meme
    caption = models.CharField(max_length=200)       # caption for the meme
    date = models.DateTimeField(auto_now_add=True)   # date and time of the creation of meme

    def __str__(self):
        return self.name
    