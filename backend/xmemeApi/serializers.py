from rest_framework import serializers
from .models import Meme


# tuple for read only fields
MEME_READ_ONLY_FIELDS = ('id',)


# serializer class to convert complex data such as querysets and model instances
# into native Python datatypes i.e. dictionary
class MemeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Meme                              # include the Meme model
        fields = '__all__'                        # include all fields in serializer
        read_only_fields = MEME_READ_ONLY_FIELDS  # read only field to return the value of the field without modification.



# serializer class for read only fields so that their value will not get update
class MemeUpdateSerializer(MemeSerializer):

    class Meta(MemeSerializer.Meta):
        read_only_fields = MEME_READ_ONLY_FIELDS + ('name',)     # adding name field in the tuple