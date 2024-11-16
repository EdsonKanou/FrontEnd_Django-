from django.contrib import admin
from EasyLiveApp.models import Administrateur, Client, Position, Appareil,control,sensor


#classe pour afficher les champs dans le pannel admin
class AdminM (admin.ModelAdmin):
    list_display=("id_admin","Nom_admin","Email_admin","Password")
class ClientM (admin.ModelAdmin):
    list_display=("id_client","Contact_client","Nom_client","Email_client","Password_client","administrateur")
class PositionM (admin.ModelAdmin):
    list_display=("id_postion","Description")
class AppareilM (admin.ModelAdmin):
    list_display=("id_appareil","Nom_appareil","Description","etat","administrateur","client","position")
class controlM (admin.ModelAdmin):
    list_display=("id_c","client","appareil")




admin.site.register(sensor)
# Enregistrement des modèles avec les classes ModelAdmin par défaut
admin.site.register(Administrateur, AdminM)
admin.site.register(Client, ClientM)
admin.site.register(Position, PositionM)
admin.site.register(Appareil, AppareilM)
admin.site.register(control , controlM)

# Register your models here.

