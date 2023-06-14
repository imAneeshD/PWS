import sqlite3
import time

import sql


def get_db_connection():
    conn = sql.sqlite3.connect("vehicles.db")
    cursor = conn.cursor()
    return conn, cursor

def create_table():
    conn, cursor = get_db_connection()
    cursor.execute('''CREATE TABLE IF NOT EXISTS vehicles (
                      name TEXT,
                      model TEXT,
                      color TEXT,
                      chassis_number TEXT PRIMARY KEY,
                      engine_number TEXT
                      )''')
    
    cursor.execute('''INSERT OR IGNORE INTO vehicles (name, model, color, chassis_number, engine_number)
                  VALUES ('Toyota Camry', '2022', 'Blue', 'ABC123456', 'XYZ789')''')
    
    # Inserting multiple vehicles
    cursor.executemany('''INSERT OR IGNORE INTO vehicles (name, model, color, chassis_number, engine_number)
                      VALUES (?, ?, ?, ?, ?)''', [
                          ('Honda Accord', '2021', 'Red', 'DEF123456', 'UVW789'),
                          ('Ford Mustang', '2023', 'Yellow', 'GHI123456', 'PQR789')
                      ])
    
    cursor.execute('''CREATE TABLE IF NOT EXISTS admin (
    username TEXT PRIMARY KEY ,
    password TEXT
    )
    ''')

    cursor.execute("INSERT OR IGNORE INTO admin (username, password) VALUES (?, ?)", ('admin', 'admin'))

    cursor.execute('''CREATE TABLE IF NOT EXISTS officers (
    username TEXT PRIMARY KEY,
    password TEXT,
    name TEXT,
    station TEXT
    )
    ''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT,
    name TEXT,
    phone TEXT,
    address TEXT
    )
    ''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS complaints (
    username TEXT,
    name TEXT,
    model TEXT,
    chassisNumber TEXT PRIMARY KEY,
    engineNumber TEXT,
    color TEXT,
    place TEXT,
    description TEXT,
    status TEXT
    )
    ''')

    conn.commit()
    conn.close()
