# import debug_toolbar
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # path('__debug__/', include(debug_toolbar.urls)),
    path("graphql", GraphQLView.as_view(graphiql=True)),
    path('', TemplateView.as_view(template_name='index.html')),
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
