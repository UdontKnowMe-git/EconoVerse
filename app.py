from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        response = supabase.from_('messages').select('*').execute()
        messages = response.data
        return jsonify(messages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/messages', methods=['POST'])
def add_message():
    try:
        data = request.get_json()
        content = data['content']
        response = supabase.from_('messages').insert({'content': content}).execute()
        return jsonify(response.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        response = supabase.from_('data').select('*').execute()
        data = response.data
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
