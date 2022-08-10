const express = require("express");
const router = express.Router();
const generateRandomGreetings = require("../helpers/randGreetings");
const wikipedia = require("../helpers/wikipedia");

const WhatsappCloudAPI = require("whatsappcloudapi_wrapper");

const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_businessId,
});

let sessions;

router.get("/webhook", async (req, res) => {
  try {
    console.log("GET: Someone is pinging me!");

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (
      mode &&
      token &&
      mode === "subscribe" &&
      process.env.Meta_WA_VerifyToken === token
    ) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});

router.post("/webhook", async (req, res) => {
  sessions = req.session;
  try {
    console.log("POST: Someone is pinging me!");
    let data = Whatsapp.parseMessage(req.body);

    if (data?.isMessage) {
      let incomingMessage = data.message;
      let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
      let recipientName = incomingMessage.from.name;
      let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
      let message_id = incomingMessage.message_id; // extract the message id

      if (typeOfMsg === "text_message") {
        if (sessions.lastpick === undefined) {
          await Whatsapp.sendSimpleButtons({
            message: `${generateRandomGreetings()} ${recipientName}, \nYou are speaking to  swifty.\nWhat do you want to do next?`,
            recipientPhone: recipientPhone,
            listOfButtons: [
              {
                title: "swift dictionary",
                id: "swift_dictionary",
              },
              {
                title: "Swift summary",
                id: "swift_summary",
              },
              {
                title: "Swift Urban",
                id: "swift_urban",
              },
            ],
          });
        } else {
          await Whatsapp.sendText({
            recipientPhone,
            message: `your last pick was ${sessions.lastpick}`,
          });
          sessions.lastpick = undefined;
        }
      }

      if (typeOfMsg === "simple_button_message") {
        let button_id = incomingMessage.button_reply.id;
        if (button_id === "swift_dictionary") {
          sessions.lastpick = "swift_dictionary";
          await Whatsapp.sendText({
            recipientPhone,
            message: "what do you need meaning to ? e.g swift,book",
          });
        }
        if (button_id === "swift_summary") {
          sessions.lastpick = "swift_summary";
          await Whatsapp.sendText({
            recipientPhone,
            message: "what do you need summary to ? e.g swift,book",
          });
        }
        if (button_id === "swift_urban") {
          sessions.lastpick = "swift_urban";
          await Whatsapp.sendText({
            recipientPhone,
            message: "which slang do you want defined ? lmao",
          });
        }

        //add other dictionaries , urban dict and regular dict
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error({ error });
    return res.sendStatus(500);
  }
});

module.exports = router;
