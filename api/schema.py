import graphene
from graphene_django import DjangoObjectType
from .models import Trailer

class TrailersType(DjangoObjectType):
    class Meta:
        model = Trailer
        fields = ['id', 'number', 'status']


class Query(graphene.ObjectType):
    all_trailers = graphene.List(TrailersType)
    single_trailer = graphene.Field(TrailersType, id=graphene.ID(required=True))

    def resolve_all_trailers(root, info):
        return Trailer.objects.all()
    
    def resolve_single_trailer(root, info, id):
        try: 
            return Trailer.objects.get(pk=id)
        except Trailer.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)



# query = '''
# {
#   trailers: allTrailers {id}
#   tailerNumbers: allTrailers{number}
#   allTrailers {status}
#   tr: singleTrailer (id: 2) {
#     number
#   }
# }
# '''
# result = schema.execute(query)