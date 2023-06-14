import time

import colorama
from colorama import Fore, Back, Style

import sql,officer

colorama.init()


def logout():
    print("Logging out...")
    print()
    time.sleep(2)
    main()

def exitApp():
    print("Leaving application...")
    time.sleep(2)
    exit()

def showMenu():
    menu={
        "1": "ADMIN",
        "2": "USERS",
        "3": "OFFICERS",
        "4": "EXIT APP"
    }

    for key, value in menu.items():
        print(Fore.GREEN + f"{key} . {value}"+ Style.RESET_ALL ) 
       

def getChoice():
    choice = input("Enter a choice from above: ")
    return choice

def invalidChoice():
    print("Invalid choice, Please try again...")

def goBack():
    main()


def uploadComplaint(username):
    name=input("Name: ")
    chassis=input("Chassis Number: ")
    engine=input("Engine Number: ")
    model=input("Model: ")
    color=input("Color: ")
    place=input("Place: ")
    description=input("Description: ")
    status="Pending"
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute("INSERT INTO complaints (username,name,model,chassisNumber,engineNumber,color,place,description,status) VALUES (?,?,?,?,?,?,?,?,?)",
                       (username,name,model,chassis,engine,color,place,description,status))
        conn.commit()
        print("Successfully Complaint Registerd")
        print()
        userPanel(username)
    except Exception as e:
        print("Insertion error", e)
        conn.rollback()
    finally:
        conn.close()

def viewComplaint(username):
    conn, cursor=sql.get_db_connection()
    rows=[]
    try:
        cursor.execute(f"SELECT * from complaints where username='{username}'")
        rows=cursor.fetchall()
    except Exception as e:
        print("Error in User fetching", e)
        conn.rollback()
    finally:
        conn.close()

    if not rows:
        print("\nYour details not Exists...")
        print()
        userPanel(username)
    else:
        print(Fore.YELLOW+ "+------------------------------------------------------------------------------------------------------------+")
        print( f"| {'Name':10} | {'Model':8} | {'Chassis Numberame':10} | {'Enginer Number':10} | {'Color':10} | {'Place':10} | {'Description':10} | {'Status':10} |")
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
            print( f"| {name:10} | {model:10} | {chass:10} | {engine:10} | {color:10} | {place:10} | {desc:10} | {status:10} |") 
        print( "+-----------------------------------------------------------------------------------------------------------+\n" + Style.RESET_ALL)
        userPanel(username)


def userRegister():
    username=input("Username:")
    password=input("Password: ")
    name=input("Name: ")
    phone=input("Phone: ")
    address=input("Address: ")
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute("INSERT INTO users (username,password,name,phone,address) VALUES(?,?,?,?,?)",(username,password,name,phone,address))
        conn.commit()
        print("Successfully Registerd")
        print()
        userLogin()
    except Exception as e:
        print("error", e)
        conn.rollback()
    finally:
        conn.close()

def verifyUser(username,password):
    conn, cursor=sql.get_db_connection()
    rows=[]
    try:
        cursor.execute(f"SELECT * from users where username='{username}'")
        rows=cursor.fetchall()
    except Exception as e:
        print("Error in User fetching", e)
        conn.rollback()
    finally:
        conn.close()
    if not rows:
        print("Your details not Exists...\nTry Again")
        print()
        users()
    else:
        for item in rows:
            uname = item[0]
            passw = item[1]
        if(uname==username and passw==password):
            return True
        else:
            return False


def showUserDashboardMenu():
    menu={
    "1": "Upload Complaint",
    "2": "View your Complaints",
    "3": "Logout",
    }

    for key, value in menu.items():
        print(Fore.GREEN+f"{key} . {value}"+Style.RESET_ALL)


def userPanel(username):
    print(Fore.GREEN+"User Dashboard" + Style.RESET_ALL)
    while True:
        try:
            showUserDashboardMenu()
            choice=app.getChoice()
            choice_mapping={
                "1": lambda: uploadComplaint(username),
                "2": lambda: viewComplaint(username),
                "3": app.logout
            }
            mapped_choice=choice_mapping.get(choice)
            if not mapped_choice:
                invalidChoice()
            else:
                con=choice_mapping[choice]()
                if not con:
                    break

        except Exception as e:
            print("Error Occured", e)


def userLogin():
    print(Fore.GREEN+"\nUser Login Panel"+Style.RESET_ALL)
    print("________________")
    username=input("Uername:")
    password=input("Password:")
    if(verifyUser(username,password)):
        userPanel(username)
    else:
        print("Wrong Credentials...")
        users()


def showUserMenu():
    menu={
        "1": "Login",
        "2": "Register",
        "3": "Go back",
    }
    for key, value in menu.items():
        print(Fore.GREEN+f"{key} . {value}"+Style.RESET_ALL)

def users():
    print("User Login Panel")
    try:
        showUserMenu()
        while True:
            choice=getChoice()
            choice_mapping={
                "1": userLogin,
                "2": userRegister,
                "3": goBack
            }
            mapped_choice=choice_mapping.get(choice)
            if not mapped_choice:
                invalidChoice()
            else:
                con=choice_mapping[choice]()
                if not con:
                    break
    except Exception as e:
        print("Error Occured", e)




import colorama
from colorama import Fore, Back, Style
import time
import app
import sql

colorama.init()


def showAdminMenu():
    menu={
        "1": "Add Officer",
        "2": "Remove Officer",
        "3": "View Officers",
        "4": "Add admin",
        "5": "Remove admin",
        "6": "Logout"
    }

    for key, value in menu.items():
        print(Fore.GREEN+f"{key} . {value}"+Style.RESET_ALL )                

def addOfficer():
    username=input("Officer's Username: ")
    password=input("Officer's password: ")
    name=input("Officer's name: ")
    station=input("Officer's station: ")
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute("INSERT INTO officers(username,password,name,station) VALUES(?,?,?,?)",(username,password,name,station))
        conn.commit()
        print("Adding...")
        time.sleep(1)
        print("Successfully added")
        time.sleep(1)
        print()
        viewOfficer()
        app.adminPanel()
    except Exception as e:
        print("Insertion error", e)
        conn.rollback()
    finally:
        conn.close()

def removeOfficer():
    print()
    username=input("Enter Officer's username: ")
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute(f"DELETE from officers where username='{username}'")
        conn.commit()
        print("Deleting...")
        time.sleep(1)
        print("Successfully Deleted")
        time.sleep(1)
        print()
        viewOfficer()
        app.adminPanel()
    except Exception as e:
        print("Deletion error", e)
        conn.rollback()
    finally:
        conn.close()

def viewOfficer():
    conn, cursor = sql.get_db_connection()
    rows = []
    try:
        cursor.execute("select * from officers")
        rows = cursor.fetchall()
    except Exception as e:
        conn.rollback()
    finally:
        conn.close()
    if not rows:
        print("No officers Found in Database")
        print()
        app.adminPanel()
    else:
       print(Fore.YELLOW+"+--------------------------------------------------+")
       print( f"| {'username':10} | {'password':8} | {'name':10} | {'station':10} |")
       print("+--------------------------------------------------+")
       for items in rows:
           username=items[0] 
           password=items[1] 
           name=items[2] 
           station=items[3]
           print( f"| {username:10} | {password:10} | {name:10} | {station:10} |") 
       print("+------------------------------------------------+\n" + Style.RESET_ALL)
       app.adminPanel()

def addAdmin():
    print("Add new admin credentials")
    username=input("Username: ")
    password=input("Password: ")
    conn, cursor = sql.get_db_connection()
    try:
        cursor.execute("INSERT INTO admin(username,password) VALUES(?,?)",(username,password))
        conn.commit()
        print("Adding...")
        time.sleep(1)
        print("Successfully added")
        time.sleep(1)
        print()
        app.adminPanel()
    except Exception as e:
        print("Insertion error", e)
        conn.rollback()
    finally:
        conn.close()

def removeAdmin():
    print("Not available right now")
    # username=input("Enter admins's username: ")
    # conn, cursor = get_db_connection()
    # try:
    #     cursor.execute(f"DELETE from admin where username='{username}'")
    #     conn.commit()
    #     print("Deleting...")
    #     time.sleep(1)
    #     print("Successfully Deleted")
    #     print()
    #     adminPanel()
    # except Exception as e:
    #     print("Deletion error", e)
    #     conn.rollback()
    # finally:
    #     conn.close()


def veifyAdmin(username,password):
    print()
    conn, cursor=sql.get_db_connection()
    rows=[]
    try:
        cursor.execute(f"SELECT * from admin where username='{username}'")
        rows=cursor.fetchall()
    except Exception as e:
        print("Error in Admin fetching", e)
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

def adminPanel():
    print("\nAdmin Controls: ")

    while True:
        try:
            showAdminMenu()        
            while True:
                choice=getChoice()
                choice_mapping={
                    "1": addOfficer,
                    "2": removeOfficer,
                    "3": viewOfficer,
                    "4": addAdmin,
                    "5": removeAdmin,
                    "6": logout
                }
                mapped_choice=choice_mapping.get(choice)
                if not mapped_choice:
                    invalidChoice()
                else:
                    con=choice_mapping[choice]()
                    if not con:
                        break
        except Exception as e:
            print("Error Occured", e)

def admins():
    print("\nWelcome to Admin Login Portal")
    print("_____________________________")
    print()
    print("Please enter the Creadentials")
    username=input("Username: ")
    password=input("Password: ")
    if (veifyAdmin(username,password)):
        time.sleep(1)
        print("Welcome to Admin Panel")
        print("______________________")
        adminPanel()
    else:
        print("Wrong Creadentials")
        time.sleep(1)
        ans=input("Are you admin? (yes/no): ")
        if(ans=="yes"):
            admins()
        else:
            main()

def officers():
    print(Fore.GREEN+"\nWelcome to Officer Login Portal"+Style.RESET_ALL)
    print("______________________________")
    print("\nEnter the Credentials")
    username=input("Username: ")
    password=input("Password: ")
    if(officer.varifyOfficer(username,password)):
        officer.OfficerDashboard()
    else:
        print("Wrong Credentials...")
        officers()

def main():
    try:
        sql.create_table()
        print(Fore.GREEN +"---MENU---" + Style.RESET_ALL)
        showMenu()
        while True:
            choice=getChoice()
            choice_mapping={
                "1": admins,
                "2": users,
                "3": officers,
                "4": exitApp
            }
            mapped_choice=choice_mapping.get(choice)
            if not mapped_choice:
                invalidChoice()
            else:
                con=choice_mapping[choice]()
                if not con:
                    break
    except Exception as e:
        print("Error Occured", e)


print("Loading.")
time.sleep(1)
print("Loading...")
time.sleep(1)
print("Loading....")
time.sleep(1)

main()

colorama.deinit()
