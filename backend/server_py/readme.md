Crear el entorno virtual: venv

con el comando

```
python -m venv venv
```

Activar el entorno virtual

```
.\venv\Scripts\activate  
```

Ya activado el entorno, extraer librerías si es que existe el requirements.txt

```
pip install -r requirements.txt
```

En el caso no exista o se quieran actualizar las librerías el requirements.txt utilizar:

```
pip freeze > requirements.txt
```

Y por último para apagar el entorno.
```
deactivate
```