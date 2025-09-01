from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_msg = request.json.get('message', '').strip().lower()

    # Simple logic you can expand later
    if user_msg == 'hi':
        response = 'Hello!👋'
    elif user_msg == 'how are you':
        response = "Thanks for asking I'm just code, but I'm running well!😊"
    elif user_msg == 'who invented you':
        response = "I was invented by Software Developer name Hardik Tyagi"
    elif user_msg == 'tell me something':
        response = "let me tell you a phrase from bhagwat Geeta 'Wise sees me in everthing and everything in me' thats krishna saying to arjun that god is everywhere and every living and non living thing that you see and feel is made by god and controlled by god. god is the reason of everthing every action and every non action the one who understand it free from the illusion"    
    else:
        response = "I didn't understand that. Try saying 'hi'."

    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)
