import time

import colorama
from colorama import Fore, Back, Style

import mongo_init




#=================================================================================




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
    try:
        mongo_init.uploadComplaint(username,name,model,chassis,engine,color,place,description,status)
        print("Successfully Complaint Registerd")
        print()
        userPanel(username)
    except Exception as e:
        print("Insertion error", e)


def viewComplaint(username):
    try:
        df=mongo_init.viewComplaints(username)
        if df.empty:
            print("No comaplaints Exists")
            userPanel(username)
        else:
            print(df)
            userPanel(username)
    except Exception as e:
        print("Error in data fetching", e)

def userRegister():
    username=input("Username:")
    password=input("Password: ")
    name=input("Name: ")
    phone=input("Phone: ")
    address=input("Address: ")
    try:
        mongo_init.userRegister(username,password,name,phone,address)
        print("Successfully Registerd")
        print()
        userLogin()
    except Exception as e:
        print("error", e)

def verifyUser(username,password):
    try:
        print()
        query={'username':username}
        uname, passw=mongo_init.getUserData(query)
        if(uname==username and passw==password):
            return True
        else:
            return False
    except Exception as e:
        print("Your details not Exists...\nTry Again")

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
            choice=getChoice()
            choice_mapping={
                "1": lambda: uploadComplaint(username),
                "2": lambda: viewComplaint(username),
                "3": logout
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
    try:
        mongo_init.addOfficer(username, password, name, station)
        print("Adding...")
        time.sleep(1)
        print("Successfully added")
        time.sleep(1)
        print()
        viewOfficer()
        adminPanel()
    except Exception as e:
        print("Insertion error", e)


def removeOfficer():
    print()
    username=input("Enter Officer's username: ")
    try:
        print("Deleting...")
        time.sleep(1)
        if(mongo_init.deleteOfficer(username)):
            #time.sleep(1)
            print("Successfully Deleted")
        print()
        viewOfficer()
        adminPanel()
    except Exception as e:
        print("Deletion error", e)


def viewOfficer():
    df=mongo_init.viewOfficer()
    if df.empty:
        print("No officers Exists")
        adminPanel()
    else:
        print(df)
        adminPanel()

def addAdmin():
    print("Add new admin credentials")
    username=input("Username: ")
    password=input("Password: ")
    try:
        print("Adding...")
        time.sleep(1)
        mongo_init.addAdmin(username,password)
        print("Successfully added")
        time.sleep(1)
 
        print()
        adminPanel()
    except Exception as e:
        print("Insertion error", e)

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



def veifyAdmin(username,password):
    print()
    query={'username':username}
    uname, passw=mongo_init.getData(query)

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


def varifyOfficer(username,password):
    try:
        data={"username":username}
        uname, passw=mongo_init.verifyOfficer(data)
        if(uname==username and passw == password):
            return True
        else:
            return False
    except Exception as e:
        print("Error in Officer fetching", e)

def showOfficerMenu():
    menu={
        "1": "View Compalints",
        "2": "Upload Found Vehicle details",
        "3": "Logout",
    }

    for key, value in menu.items():
        print(Fore.GREEN+ f"{key} . {value}"+Style.RESET_ALL)

def viewAllComplaint():
    try:
        df=mongo_init.viewAllComplaints()
        if df.empty:
            print("No complainst Exists")
        else:
            print(df)
        print()
        OfficerDashboard()
    except Exception as e:
        print("Error in Complaints fetching", e)


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
    if(mongo_init.uploadComplaints(username,name,model,chassis,engine,color,place,description,status)):
        print("Successfully Vehicle data uploaded")
    else:
        print("Vehicle exists in Database, Updating it\n")
        time.sleep(2)
        print("Status Updated")
        print()
        OfficerDashboard()



def OfficerDashboard():
    print(Fore.GREEN+"Welcome to Officer Dashboard"+Style.RESET_ALL)
    try:
        showOfficerMenu()
        while True:
            choice=getChoice()
            choice_mapping={
                "1": viewAllComplaint,
                "2": OfficerUpload,
                "3": logout
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

def officers():
    print(Fore.GREEN+"\nWelcome to Officer Login Portal"+Style.RESET_ALL)
    print("______________________________")
    print("\nEnter the Credentials")
    username=input("Username: ")
    password=input("Password: ")
    if(varifyOfficer(username,password)):
        OfficerDashboard()
    else:
        print("Wrong Credentials...")
        officers()

def main():
    try:
        
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


# print("Loading.")
# time.sleep(1)
# print("Loading...")
# time.sleep(1)
# print("Loading....")
# time.sleep(1)

mongo_init.load()
main()

colorama.deinit()
