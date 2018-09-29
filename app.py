from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/", methods=["POST"])
def game():
    number_of_cards = int(request.form["number_of_cards"])
    return render_template("game.html", number_of_cards=number_of_cards)


if __name__ == "__main__":
    app.run()
