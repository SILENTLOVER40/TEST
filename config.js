// * Project By - um4rxd
// * Author - Umar Rehman
// * Team - UD TEAM
// * Version - V1

// World best and powerfull whatsapp user bot in Pakistan 
//𝐔 𝐌 𝐀 𝐑 🇵🇰 ッ



const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "Put your session id here", //scan or pair SUHAS-MD
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/ff229baf932900c151026.jpg", //add your alive image url here SUHAS-MD
ALIVE_MSG: process.env.ALIVE_IMG || "*Hey...👋 I am Suhas Pathsindu.*\n\n *SUHAS-MD Is Online Now* 👊\n\n*🌀 Owner* - SUHAS-MD\n\n*💫 Owner Number* 94750291885\n\n*Very Simple WhatsApp Bot🤖\n\n_Type To *.menu* Get Commands👾_\n\n*🧬 Don't Forget To Subscibe My YouTube Channel*\n\nwww.youtube.com/@suhasbro\n\n*🧬 Follow Your WhatsApp Channel* https://www.whatsapp.com/channel/0029VagKNUe96H4IdMbr9f2o\n\n\n_🔮MADE BY SUHAS-BRO🔮_",  //Change this you like SUHAS-MD
SUDO_NB: process.env.SUDO_NB || "Type Your Owne Number Here", //Add your number here SUHAS-MD
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false", //true or false as you like SUHAS-MD
MODE: process.env.MODE || "public", //private or public as you like SUHAS-MD
};
