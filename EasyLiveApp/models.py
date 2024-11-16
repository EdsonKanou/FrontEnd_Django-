from django.db import models

# Create your models here.

class Administrateur(models.Model):
    id_admin = models.AutoField(primary_key=True)
    Nom_admin = models.CharField(max_length=20)
    Email_admin = models.EmailField(unique=True)
    Password = models.CharField(max_length=120)

class Client(models.Model):
    id_client = models.AutoField(primary_key=True)
    Contact_client = models.CharField(max_length=20)
    Nom_client = models.CharField(max_length=50)
    Email_client = models.EmailField(unique=True)
    Password_client = models.CharField(max_length=20)
    administrateur = models.ForeignKey(Administrateur, on_delete=models.CASCADE, null=True)

class Position(models.Model):
    id_postion = models.CharField(max_length=120 , primary_key=True)
    Description = models.TextField()

class Appareil(models.Model):
    id_appareil = models.AutoField(primary_key=True)
    Nom_appareil = models.CharField(max_length=120)
    Description = models.TextField()
    etat = models.BooleanField()
    administrateur = models.ForeignKey(Administrateur, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL ,null=True)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL ,null=True)

class control(models.Model):
    id_c = models.CharField(max_length=123, primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL ,null=True)
    appareil = models.ForeignKey(Appareil, on_delete=models.SET_NULL ,null=True)

class sensor(models.Model):
    nom=models.CharField(max_length=20, blank=True)
    postion=models.CharField(max_length=70, blank=True)
    state=models.IntegerField(blank=True)
    status=models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.nom + ' ' +self.postion

# Create your models here.
