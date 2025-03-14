from django.db import models

# Create your models here.
class Comment(models.Model):
    id=models.CharField(max_length=225,primary_key=True)
    author= models.CharField(max_length=225)
    text=models.TextField()
    date=models.DateTimeField()
    likes=models.IntegerField(default=0)
    image=models.URLField(null=True, blank=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.date}"