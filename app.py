from flask import Flask, remder_template, request, 
from pathlib __path__
import json

base_dir = Path(__file__).resolve().parent
app = Flask(__name__, tempate_folder=str(base_dir / 'templates'), static_folder=str(base_dir / 'static'))
