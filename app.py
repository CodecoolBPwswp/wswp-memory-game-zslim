from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/game")
def game():
    number_of_symbols = int(request.args["number_of_cards"])
    return render_template("game.html", number_of_symbols=number_of_symbols)


if __name__ == "__main__":
    app.run()
