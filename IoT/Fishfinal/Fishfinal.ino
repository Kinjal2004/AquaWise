#include <ThingSpeak.h>
#include <SPI.h>
#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define SECRET_SSID "Galaxy A23 53D4"    
#define SECRET_PASS "biqf7934"           
#define ONE_WIRE_BUS 23
#define potPin 35
#define SECRET_CH_ID1 2480934
#define SECRET_CH_ID2 2503529              
#define SECRET_WRITE_APIKEY1 "J4MAFLF0GDFBR6OP" 
#define SECRET_WRITE_APIKEY2 "IWZH7EDGV664MGTU"
char ssid[] = SECRET_SSID; 
char pass[] = SECRET_PASS; 

WiFiClient client;
unsigned long myChannelNumber1 = SECRET_CH_ID1;
unsigned long myChannelNumber2 = SECRET_CH_ID2;
const char *myWriteAPIKey1 = SECRET_WRITE_APIKEY1;
const char *myWriteAPIKey2 = SECRET_WRITE_APIKEY2;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
float ph;
float Value;

void setup() {
  Serial.begin(115200); // Initialize serial
  sensors.begin();
  pinMode(potPin, INPUT);
  delay(1000);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);
}

void loop() {
  // Connect or reconnect to WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(SECRET_SSID);
    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin(ssid, pass); 
      //Serial.print(".");
      delay(5000);
    }
   //Serial.println("\nConnected.");
  }

  // Read temperature
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println("ºC");

  // Read pH value
  float pHValue =  analogRead(potPin); // Function to read pH, implement this according to your sensor
  float voltage = pHValue * (3.7 / 4095.0); // Check if this conversion is correct
     ph = (3.7 * voltage);
  Serial.print("pH: ");
  Serial.println(ph);

  // Check WiFi connection before sending data
  if (WiFi.status() == WL_CONNECTED) {
    // Send data to ThingSpeak
    int x = ThingSpeak.writeField(myChannelNumber1, 1, temperatureC, myWriteAPIKey1);
    //Serial.print("Temperature Write Status: ");
    //Serial.println(x);
    int y = ThingSpeak.writeField(myChannelNumber2, 1, ph, myWriteAPIKey2);
    //Serial.print("pH Write Status: ");
    //Serial.println(y);
  } else {
    Serial.println("WiFi not connected.");
    // Reconnect to WiFi if disconnected
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED) 
      delay(20000);
  }

  delay(20000); // Wait 20 seconds to update the channel again
}

float analogRead() {
  // Function to read pH, implement this according to your sensor
  // Placeholder implementation
  return 7.0; // Return a dummy pH value for testing
}

