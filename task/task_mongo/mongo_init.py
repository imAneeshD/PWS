from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import pandas as pd

uri = "mongodb+srv://imaneesh:Aneesh@cluster0.j4pwkzi.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Connected to MongoDB!")
    print()
except Exception as e:
    print(e)

#database
db= client['my-db']

#collections
coll_admin=db['admin']
coll_users=db['users']
coll_complaints=db['complainsts']
coll_officers=db['officers']


def create(data,coll):
    try:
        coll.insert_one(data)
    except Exception as e:
        print()
    #print("Document created") #result.inserted_id
    

admin={'_id':1, 'username':"admin",'password':"admin"}

def load():
    create(admin,coll_admin)

def getData(query):
    data = coll_admin.find_one(query)
    return data["username"], data["password"]

def viewOfficer():
    data= list(coll_officers.find({},{"_id":0}))
    df=pd.DataFrame(data)
    return df

def viewComplaints(uname):
    data= list(coll_complaints.find({"username":uname},{"_id":0}))
    df=pd.DataFrame(data)
    return df

def viewAllComplaints():
    data= list(coll_complaints.find({},{"_id":0}))
    df=pd.DataFrame(data)
    return df

def deleteOfficer(username):
    query={"username":username}
    result=coll_officers.delete_one(query)
    if result.deleted_count>0:
        return True
    else:
        return False

def userRegister(username, password, name, phone, address):
    data={"username":username,"password":password,"name":name,"phone":phone,"address":address}
    create(data,coll_users)

def addOfficer(username, password, name, station):
    data={"username":username, "password":password, "name": name, "station":station}
    create(data, coll_officers)

def addAdmin(username, password):
    data={"username":username, "password":password}
    if(create(data, coll_admin)):
        return True
    else:
        return False
    
def getUserData(query):
    data=coll_users.find_one(query)
    return data["username"],data["password"]

def uploadComplaint(username,name,model,chassis,engine,color,place,description,status):
    data={"username":username,"name":name,"model":model,"Chassis Number":chassis,"Engine Number":engine,"color":color,"place":place,"description":description,"status":status}
    create(data,coll_complaints)


def verifyOfficer(query):
    data=coll_officers.find_one(query)
    return data["username"], data["password"]

def uploadComplaints(username,name,model,chassis,engine,color,place,description,status):
    data={"name":name,"model":model,"Chassis Number":chassis,"Engine Number":engine,"color":color,"place":place,"description":description,"status":status}
    try:
        coll_complaints.insert_one(data)
        return True
    except Exception as e: 
        coll_complaints.update_one({"Chassis Number":chassis},{"$set": {"status": "FOUND","place":place,"description":description}})
        return False


