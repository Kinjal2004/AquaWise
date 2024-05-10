#include <ThingSpeak.h>
#include <SPI.h>
#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define SECRET_SSID "Galaxy A23 53D4"    
#define SECRET_PASS "biqf7934"           
#define ONE_WIRE_BUS 23
#define potPin 35
#define SECRET_CH_ID 2480934             
#define SECRET_WRITE_APIKEY "J4MAFLF0GDFBR6OP" 
char ssid[] = SECRET_SSID; 
char pass[] = SECRET_PASS; 
float ph;
float Value;
int keyIndex = 0;          
WiFiClient client;
unsigned long myChannelNumber = SECRET_CH_ID;
const char *myWriteAPIKey = SECRET_WRITE_APIKEY;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup()
{
  Serial.begin(115200); // Initialize serial
  sensors.begin();
  pinMode(potPin, INPUT);
  delay(1000);
  WiFi.mode(WIFI_STA);
  ThingSpeak.begin(client);
   // Initialize ThingSpeak
}

void loop()
{
  // Connect or reconnect to WiFi
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(SECRET_SSID);
    while (WiFi.status() != WL_CONNECTED)
    {
      WiFi.begin(ssid, pass); 
      Serial.print(".");
      delay(5000);
    }
    Serial.println("\nConnected.");
  }

  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println("ºC");
  if (WiFi.status() == WL_CONNECTED) {
    Value = analogRead(potPin);
    Serial.print("Raw Analog Value: ");
    Serial.print(Value);
     Serial.print(" | ");
     float voltage = Value * (3.9 / 4095.0); // Check if this conversion is correct
     ph = (3.9 * voltage); // Check if this conversion is correct
     Serial.print("Voltage: ");
     Serial.print(voltage);
     Serial.print(" | pH: ");
     Serial.println(ph);
    delay(1000);
  } else {
    Serial.println("WiFi not connected.");
    // Reconnect to WiFi if disconnected
    WiFi.begin(ssid, pass);
    while (WiFi.status() != WL_CONNECTED) 
      delay(20000);
    }

  // Send temperature data to ThingSpeak
  int x = ThingSpeak.writeField(myChannelNumber, 1, temperatureC, myWriteAPIKey);

  Serial.println(x);
  int y = ThingSpeak.writeField(myChannelNumber, 2, ph, myWriteAPIKey);
 Serial.println(y);
 

  delay(20000); 
  // Wait 20 seconds to update the channel again
}
