<div align="center">

# NimbleMerchant POS System
![Nimble Merchant Logo](assets/images/nimble.jpg)

</div>

### Table of Contents

---
---
- [Software Features](#features)
- [Getting Started](#getting-started)  
   - [Download the Software](#download)
- [Server Setup](#server-setup)
   - [Running SSH](#running-ssh)  
- [Start Up](#start-up)
- [Documentation](#documentation)
- [Contact Us](#contact)

---
---


## 🎨 Software Features <a id="features"></a>

- 🛡️ **Secure login** with JWT authentication for safe access
- 📃 **Comprehensive order management system** to streamline workflow
- 🪑 **Track tabs** for efficient order handling and payment processing
- ➕ **Multiple orders per tab** for added flexibility in managing customer orders
- 🍴 **Kitchen view** displaying incoming orders in real-time
- ⚠️ **Staff alerts** when an order is ready to be sent to the customer
- ⚙️ **Meal configuration**: Set up meals, assign courses
- 📊 **Daily Revenue Tracking** view & print daily totals
- 👩‍🍳 **Employee management**: Create new user accounts with customizable access roles
- 🖥️ **Self-hosted** on a local server for enhanced control and security

## 🚀 Getting Started <a id="getting-started"></a>

This POS system is optimised for Android tablets, but can also be used on mobile devices or through a web browser. For web access, please contact the Nimble Merchant team. 

### Requirements:
- **Android device or emulator**: Ensure you have an Android tablet or emulator set up before downloading the app.
- **Best performance**: For the best experience, use the system on an Android tablet.
- **Styling considerations**: While the system can be used on Android mobile devices or through a web browser, some styling inconsistencies may occur when not run on an Android tablet.
- **Node.js**: needs to be installed on your computer. It can be downloaded from [Node.js](https://nodejs.org/en)

### Downloading the Software <a id="download"></a>
The software can be downloaded from the [NimbleMerchant website](https://example.com/download).


## 🖧 Server Setup <a id="server-setup"></a>
Follow the steps below to log in and start the backend server:
   1. Open your command terminal and log in to the backend server using the following command:
      ```bash
      ssh [your-credentials]@[serveraddress]
      ```
      * Replace `[your-credentials]` with the credentials provided by the Nimble Merchant team.
        
   2. Navigate into the api directory
      ```bash
      cd api
      ```
   3. Install dependencies
      ```bash
      npm install
      ```
   4. Start the server 
      ```bash
      npm run start
      ```
   On successful start up, you should see `Server listening on port: 4000` in your terminal window

   #### Troubleshooting Server Boot up
   + Ensure the presence of a .env file:  
   Verify that your project directory contains a `.env` file configured with the local or remote database credentials provided during installation.
      + Verify that the `.env` file contains the following structure:
      ```env
      MONGO_URI=your-database-host
      MONGO_LOCAL=your-database-port
      JWT_SECRET=serialised-string
   + If you have lost your server login credentials, are missing the .env file or are experiencing issues starting up the server, please [contact the Nimble Merchant team](#contact) at for assistance.

   #### Running SSH
   For a step-by-step guide on enabling SSH in Windows, visit this link: [How to enable SSH in Windows 10](https://www.supportyourtech.com/articles/how-to-enable-ssh-in-windows-10-a-step-by-step-guide-for-beginners/).  
   *SSH should come installed on Mac and Linux devices by default. To check your version, type the following command in your terminal:*

   ```bash
   ssh -v
   ```

## 🏁 Start Up <a id="start-up"></a>
After succesfully [downloading & installing the software](#download) and [starting the server](#server-setup), open the application.  

Pre-configured login credentials have been made available. To add more login users, please [contact Nimble Merchant](#contact), allowing for a two day turn around.


## 📗 Documentation <a id="documentation"></a>

API documentation can be found in the [BeanAPI github repository](https://github.com/Gelos-Bean/bean-api.git)


## 📞 Contact Us<a id="contact"></a>

   - ### **General Enquiries**: [info@nimblemerchant.com.au](mailto:info@nimblemerchant.com.au)
   - #### **Urgent Support**: Include "Urgent" in the email subject line for a response within 30 minutes.