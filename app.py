from flask import Flask, render_template, request, jsonify
from pathlib import Path
import json

base_dir = Path(__file__).resolve().parent
app = Flask(__name__, template_folder=str(base_dir / 'templates'), static_folder=str(base_dir / 'static'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spele')
def spele():
    return render_template('game.html')

@app.route('/tops')
def tops():
    return render_template('top.html')

@app.route('/par')
def par():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)