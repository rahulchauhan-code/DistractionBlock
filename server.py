import random
import string
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes, allowing local network access from port 5173 or mobile browsers
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Global in-memory storage for active student sessions
sessions = {}

def generate_session_id():
    """Generates a highly readable 6-character alphanumeric sync code."""
    chars = string.ascii_uppercase + string.digits
    # Avoid ambiguous letters like O, I, L, 0, 1
    chars = chars.replace('O', '').replace('I', '').replace('L', '').replace('0', '').replace('1', '')
    while True:
      code = ''.join(random.choices(chars, k=6))
      if code not in sessions:
          return code

@app.route('/api/session', methods=['POST'])
def create_session():
    """Endpoint for Student View to create a new cloud state and receive a Connection Code."""
    session_id = generate_session_id()
    
    # Initialize the default empty state for the student session
    initial_state = request.json or {}
    initial_state['syncId'] = session_id
    
    sessions[session_id] = initial_state
    
    print(f"[*] Created new Sync Session: {session_id}")
    return jsonify({
        "status": "success",
        "id": session_id,
        "state": initial_state
    }), 201

@app.route('/api/session/<session_id>', methods=['GET'])
def get_session(session_id):
    """Endpoint for both Parent and Student to read the current focus state."""
    session_id = session_id.upper().strip()
    if session_id not in sessions:
        return jsonify({
            "status": "error",
            "message": "Supervision session not found"
        }), 404
        
    return jsonify(sessions[session_id]), 200

@app.route('/api/session/<session_id>', methods=['PUT'])
def update_session(session_id):
    """Endpoint for Parent and Student to push real-time state updates."""
    session_id = session_id.upper().strip()
    if session_id not in sessions:
        return jsonify({
            "status": "error",
            "message": "Supervision session not found"
        }), 404
        
    update_data = request.json or {}
    
    # Merge existing state with new update properties
    sessions[session_id].update(update_data)
    
    return jsonify({
        "status": "success",
        "state": sessions[session_id]
    }), 200

@app.route('/api/session/<session_id>', methods=['DELETE'])
def delete_session(session_id):
    """Clean up and delete a session once finished."""
    session_id = session_id.upper().strip()
    if session_id in sessions:
        del sessions[session_id]
        print(f"[-] Destroyed Sync Session: {session_id}")
        return jsonify({"status": "success", "message": f"Session {session_id} removed"}), 200
        
    return jsonify({"status": "error", "message": "Session not found"}), 404

if __name__ == '__main__':
    # Run server on all interfaces (0.0.0.0) at port 5000 so other physical devices on the local network can connect!
    print("[*] Starting DistractionBlock Flask Sync Server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
