from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.responses import JSONResponse
from database import SessionLocal
from models import Ticket
from typing import List

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/tickets/", response_model=Ticket, status_code=status.HTTP_201_CREATED)
async def create_ticket(ticket: Ticket):
    async with get_db() as db:
        db_ticket = Ticket(title=ticket.title, description=ticket.description)
        db.add(db_ticket)
        db.commit()
        db.refresh(db_ticket)
        return db_ticket

@app.get("/tickets/", response_model=List[Ticket])
async def read_tickets():
    async with get_db() as db:
        tickets = db.query(Ticket).all()
        return tickets

@app.get("/tickets/{ticket_id}", response_model=Ticket)
async def read_ticket(ticket_id: int):
    async with get_db() as db:
        ticket = db.query(Ticket).get(ticket_id)
        if ticket is None:
            raise HTTPException(status_code=404, detail="Ticket not found")
        return ticket

@app.put("/tickets/{ticket_id}", response_model=Ticket)
async def update_ticket(ticket_id: int, ticket: Ticket):
    async with get_db() as db:
        db_ticket = db.query(Ticket).get(ticket_id)
        if db_ticket is None:
            raise HTTPException(status_code=404, detail="Ticket not found")
        db_ticket.title = ticket.title
        db_ticket.description = ticket.description
        db.commit()
        return db_ticket

@app.delete("/tickets/{ticket_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ticket(ticket_id: int):
    async with get_db() as db:
        ticket = db.query(Ticket).get(ticket_id)
        if ticket is None:
            raise HTTPException(status_code=404, detail="Ticket not found")
        db.delete(ticket)
        db.commit()
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)