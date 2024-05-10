#include <WiFi.h>
#include <ThingSpeak.h>
#include <SPI.h>

#define SECRET_SSID "Galaxy A23 53D4"    
#define SECRET_PASS "biqf7934"           
#define SECRET_CH_ID 2480934             
#define SECRET_WRITE_APIKEY "J4MAFLF0GDFBR6OP" 
#define potPin 35

char ssid[] = SECRET_SSID; 
char pass[] = SECRET_PASS; 

float ph;
float Value;

WiFiClient client;

void setup() {
  Serial.begin(115200);
  pinMode(potPin, INPUT);
  delay(1000);
 
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
  }
}

void loop() {
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
    while (WiFi.status() != WL_CONNECTED) {
      delay(20000);
    }
  }
}



