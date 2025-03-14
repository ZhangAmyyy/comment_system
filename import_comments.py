import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "comment_system.settings")
django.setup()

from comments.models import Comment
import json
from datetime import datetime

Comment.objects.all().delete()

with open('Copy_of_comments.json') as f:
    data=json.load(f)

for comment in data['comments']:
    date_obj = datetime.strptime(comment['date'], "%Y-%m-%dT%H:%M:%SZ")

    Comment.objects.create(
        id=comment['id'],
        author=comment['author'],
        text=comment['text'],
        date=date_obj,
        likes=comment['likes'],
        image=comment['image']
    )
