import asyncio
import random
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, status
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class VehicleSearchPayload(BaseModel):
    license_plate: str

# Mock databases for demonstration purposes
MOCK_VAHAN_REGISTRY = {
    "KA-01-AB-1234": {
        "owner": "Rajesh Kumar N",
        "chassis_number": "MDH3A2BC4JG89102X",
        "engine_number": "ENG12345678X",
        "model": "Mahindra Scorpio-N Black",
        "insurance_expiry": "2027-04-12",
        "rto_location": "Bangalore Central (KA-01)"
    }
}

MOCK_NEO4J_CRIMINAL_GRAPH = {
    "Rajesh Kumar N": {
        "risk_index": "HIGH THREAT",
        "associated_firs": ["FIR-2026-BLR-041", "FIR-2025-MYS-112"],
        "associates": ["Anand Kumar (Syndicate Link)", "Suresh Gowda (Logistics)"],
        "network_depth": 3
    }
}

@router.post("/vehicle/cross-reference")
async def cross_reference_vehicle(payload: VehicleSearchPayload):
    plate = payload.license_plate.upper().strip()
    
    # Simulating a concurrent asynchronous scatter-gather data fetch
    await asyncio.sleep(0.4) 
    
    vahan_data = MOCK_VAHAN_REGISTRY.get(plate)
    if not vahan_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle target identifier missing from Vahan National Registry."
        )
        
    owner_name = vahan_data["owner"]
    graph_network = MOCK_NEO4J_CRIMINAL_GRAPH.get(owner_name, {
        "risk_index": "CLEAR STATUS",
        "associated_firs": [],
        "associates": [],
        "network_depth": 0
    })
    
    return {
        "license_plate": plate,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "rto_dossier": vahan_data,
        "intelligence_graph_nodes": graph_network
    }

@router.websocket("/ws/anpr-surveillance")
async def anpr_surveillance_stream(websocket: WebSocket):
    await websocket.accept()
    
    # Sample pool of active city traffic plates with tactical threat profiles
    plates_pool = [
        {"plate": "KA-03-MM-5566", "status": "CLEARED", "camera": "CAM-BLR-ORR-04"},
        {"plate": "KA-01-AB-1234", "status": "WANTED", "reason": "Organized Crime Syndicate Fugitive", "camera": "CAM-MYS-PALACE-01"},
        {"plate": "KA-51-P-8899", "status": "CLEARED", "camera": "CAM-BLR-EC-12"},
        {"plate": "KA-22-N-1122", "status": "INTERCEPT", "reason": "Stolen Vehicle Signature", "camera": "CAM-HUB-STATION-02"}
    ]
    
    try:
        while True:
            # Emit a realistic high-speed smart city traffic event frame every 3 seconds
            await asyncio.sleep(3.0)
            selected_event = random.choice(plates_pool).copy()
            selected_event["timestamp"] = datetime.now().strftime("%H:%M:%S")
            
            await websocket.send_text(json.dumps(selected_event))
            
    except WebSocketDisconnect:
        pass