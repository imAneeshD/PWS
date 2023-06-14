

import time

import  sql,  app

import colorama
from colorama import Fore, Back, Style


def varifyOfficer(username,password):
    conn, cursor=sql.get_db_connection()
    rows=[]
    try:
        cursor.execute(f"SELECT * from officers where username='{username}'")
        rows=cursor.fetchall()
    except Exception as e:
        print("Error in Officer fetching", e)
        conn.rollback()
    finally:
        conn.close()

    if not rows:
        print("Your details not Exists...")
        print()
    else:
        for item in rows:
            uname = item[0]
            passw = item[1]
        if(uname==username and passw==password):
            return True
        else:
            return False

def showOfficerMenu():
    menu={
        "1": "View Compalints",
        "2": "Upload Found Vehicle details",
        "3": "Logout",
    }

    for key, value in menu.items():
        print(Fore.GREEN+ f"{key} . {value}"+Style.RESET_ALL)

def viewAllComplaint():
    conn, cursor=sql.get_db_connection()
    rows=[]
    try:
        cursor.execute(f"SELECT * from complaints")
        rows=cursor.fetchall()
    except Exception as e:
        print("Error in Complaints fetching", e)
        conn.rollback()
    finally:
        conn.close()

    if not rows:
        print("\nNo Complainsts found")
        print()
        OfficerDashboard()
    else:
        print(Fore.YELLOW + "+------------------------------------------------------------------------------------------------------------+")
        print( f" {'Owner':10} | {'Name':10} | {'Model':8} | {'Chassis Numberame':10} | {'Enginer Number':10} | {'Color':10} | {'Place':10} | {'Description':10} | {'Status':10} |")
        print( "+-------------------------------------------------------------------------------------------------------------+")
        for item in rows:
            uname=item[0]
            name = item[1]
            model = item[2]
            chass=item[3]
            engine=item[4]
            color=item[5]
            place=item[6]
            desc=item[7]
            status=item[8]
            print( f"{uname:10} | {name:10} | {model:10} | {chass:10} | {engine:10} | {color:10} | {place:10} | {desc:10} | {status:10} |") 
        print( "+-----------------------------------------------------------------------------------------------------------+\n"+Style.RESET_ALL)
        OfficerDashboard()

def OfficerUpload():
    print("Officer upload Page")
    username=input("Onwer: ")
    name=input("Name: ")
    chassis=input("Chassis Number: ")
    engine=input("Engine Number: ")
    model=input("Model: ")
    color=input("Color: ")
    place=input("Place: ")
    description=input("Description: ")
    status="Found"
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute("INSERT INTO complaints (username,name,model,chassisNumber,engineNumber,color,place,description,status) VALUES (?,?,?,?,?,?,?,?,?)",
                       (username,name,model,chassis,engine,color,place,description,status))
        conn.commit()
        print("Successfully Vehicle data uploaded")
        print()
        OfficerDashboard()
    except Exception as e:
        print("Vehicle exists in Database, Updating it\n")
        cursor.execute(f"UPDATE complaints SET status='FOUND' where chassisNumber='{chassis}'")
        cursor.execute(f"UPDATE complaints SET place='{place}' where chassisNumber='{chassis}'")
        cursor.execute(f"UPDATE complaints SET description='{description}' where chassisNumber='{chassis}'")
        conn.commit()
        time.sleep(2)
        print("Status Updated")
        print()
        OfficerDashboard()
    finally:
        conn.close()


def OfficerDashboard():
    print(Fore.GREEN+"Welcome to Officer Dashboard"+Style.RESET_ALL)
    try:
        showOfficerMenu()
        while True:
            choice=app.getChoice()
            choice_mapping={
                "1": viewAllComplaint,
                "2": OfficerUpload,
                "3": app.logout
            }
            mapped_choice=choice_mapping.get(choice)
            if not mapped_choice:
                app.invalidChoice()
            else:
                con=choice_mapping[choice]()
                if not con:
                    break
    except Exception as e:
        print("Error Occured", e)

