from flask import Flask
import requests
import schedule
import time
import joblib
import firebase_admin
from firebase_admin import credentials, firestore
from email.message import EmailMessage
import ssl
import smtplib

app = Flask(__name__)

pH_API_URL = "https://api.thingspeak.com/channels/2503529/feeds.json?api_key=8NW8DGDMNQWI121A&results=1"
temp_API_URL = "https://api.thingspeak.com/channels/2480934/feeds.json?api_key=AZKOWW8EYEE19E7J&results=1"
model1 = joblib.load('rf_DO_model.pkl')
model2 = joblib.load('gbm_DO_model.pkl')
model3 = joblib.load('rf_NH3_model.pkl')
model4 = joblib.load('gbm_NH3_model.pkl')
FETCH_INTERVAL_SECONDS = 30  # Fetch data every 10 seconds

# Initialize Firebase Admin SDK
cred = credentials.Certificate("aquawisebackend-firebase-adminsdk-d3f1r-322a731e5e.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def fetch_data_from_api(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch data from API:", response.status_code)
        return None


def process_data(pH_data, temp_data):
    if pH_data and temp_data:
        temp = temp_data['feeds'][0]['field1']
        pH = pH_data['feeds'][0]['field1']
        created_at = pH_data['feeds'][0]['created_at']
        return pH, temp, created_at
    else:
        return None, None


def predict_values(pH, temp):
    if pH is not None and temp is not None:
        data = [[pH, temp]]
        res1_DO = model1.predict(data)
        res2_DO = model2.predict(data)
        res3_NH3 = model3.predict(data)
        res4_NH3 = model4.predict(data)
        res_DO = 0.5 * (res1_DO[0] + res2_DO[0])
        res_NH3 = 0.5 * (res3_NH3[0] + res4_NH3[0])
        return res_DO, res_NH3
    else:
        return None, None

def send_alert(message):
    email_sender = 'bkinjal0428@gmail.com'
    email_password = 'kcyb ittr hrjo lupb'
    email_receiver = 'bkinjal2004@gmail.com'
    subject = "Alert From AquaWise"
    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(message)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com',465,context=context) as smtp:
        smtp.login(email_sender,email_password)
        smtp.sendmail(email_sender,email_receiver,em.as_string())

    print("ALERT:", message)

def push_to_firestore(pH, temp, res_DO, res_NH3, created_at):
    if pH is not None and temp is not None and res_DO is not None and res_NH3 is not None:
        
        alert_message = ""
        if float(pH) < 6.5 or float(pH) > 7.5:
            alert_message += f"pH level ({pH}) is not within the recommended range (6.5 - 7.5). "
        if float(temp) < 25 or float(temp) > 35:
            alert_message += f"Temperature ({temp}) is not within the recommended range (25 - 35). "
        if float(res_DO) < 5:
            alert_message += f"Dissolved Oxygen level ({res_DO}) is below 5. "
        if float(res_NH3) > 0.5:
            alert_message += f"Ammonia level ({res_NH3}) is above 0.5. "

        if alert_message:
            send_alert(alert_message)
        
        # doc_ref = db.collection('parameter_db').document()
        # doc_ref.set({
        #     'pH': pH,
        #     'temperature': temp,
        #     'DO': res_DO,
        #     'NH3': res_NH3,
        #     'created_at' : created_at
        # })
    else:
        print("Failed to push data to Firestore. Some data is missing.")


def fetch_and_process_data():
    pH_data = fetch_data_from_api(pH_API_URL)
    temp_data = fetch_data_from_api(temp_API_URL)
    pH, temp,created_at = process_data(pH_data, temp_data)
    res_DO, res_NH3 = predict_values(pH, temp)
    push_to_firestore(pH, temp, res_DO, res_NH3,created_at)


def schedule_data_fetch():
    schedule.every(FETCH_INTERVAL_SECONDS).seconds.do(fetch_and_process_data)


@app.route('/')
def home():
    return "Flask app for fetching data from API periodically"


if __name__ == '__main__':
    schedule_data_fetch()
    while True:
        schedule.run_pending()
        time.sleep(1)
