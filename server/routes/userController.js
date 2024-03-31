const express = require('express');
const router = express.Router();
const { loginModel, userModel, messageModel } = require("../models/userModel");
const authToken = require("../middleware/jwttokenauth");
const cookie = require('cookie');
const refreshdata = require('../middleware/Refresh')



module.exports = function (io) {
  // let isRefreshing = false;

  router.get("/userdata", authToken, async (req, res) => {
    try {
      // console.log("qq", req.user);

      loginid = req.user.userId;
      // console.log("ddddddddddd", loginid);
      const userData = await userModel.findOne({ loginid: loginid });
      res.status(201).json({ userData });
    } catch (error) {
      console.error();
      res.status(500).json({ error: "Internal server error" });
    }
  });



  router.post("/profileupdate", authToken, async (req, res) => {
    try {
      loginid = req.user.userId;
      // console.log(req.body);
      const { name, about, profile } = req.body;
      const updatevalue = {
        name,
        about,
        profile
      }
      const userData = await userModel.findOneAndUpdate({ loginid: loginid }, { $set: updatevalue });
      res.status(201).json({ message: "update successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.get("/alluserdata", authToken, async (req, res) => {
    try {
      // if (!isRefreshing) {
      //   isRefreshing = true;
      //   const newServer = await refreshdata();
      //   server = newServer;
      // }
      loginid = req.user.userId;
      const allUserData = await userModel.find().collation({ locale: 'en' }).sort({ name: 1 });
      res.status(201).json({ allUserData });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/searchuser", authToken, async (req, res) => {
    try {
      const { search } = req.body;
      const searchTerm = search;
      const allUserData = await userModel.find({ name: { $regex: new RegExp(searchTerm, 'i') } }).collation({ locale: 'en' }).sort({ name: 1 });
      // console.log(allUserData);
      if (allUserData) {
        res.status(201).json({ allUserData });
      } else {
        res.status(404).json({ error: ' data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });


  // router.post("/sendmsg", authToken, async (req, res) => {
  //   try {
  //     console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  //     loginid = req.user.userId;
  //     console.log(loginid);
  //     console.log(req.body);

  //     // const userData = await userModel.findOneAndUpdate({ loginid: loginid }, { $set: updatevalue });
  //     res.status(201).json({ message:"update successfully" });
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // });
  router.post("/prevMsg", authToken, async (req, res) => {
    try {
      sid = req.user.userId;
      rid = req.body.rid
      console.log(rid, sid);
      const prevmessages = await messageModel.find({
        $or: [
          {
            sender_id: sid,
            receiver_id: rid
          },
          {
            sender_id: rid,
            receiver_id: sid
          }
        ]
      })
      res.status(201).json(prevmessages);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.get("/connectedcontact", authToken, async (req, res) => {
    try {
      loginid = req.user.userId;
      console.log(loginid);

      // const connections = await userModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "messages",
      //       localField: "loginid",
      //       foreignField: "receiver_id",
      //       as: "users"
      //     }
      //   },
      //   {
      //     $match: {
      //       $or: [
      //         // { "users.receiver_id": loginid }, 
      //         { "users.sender_id": loginid }
      //       ]
      //     }
      //   }, 
      //   {
      //     $sort: {
      //       "users.cdate": -1
      //     }
      //   }
      // ]);
      const connections = await userModel.aggregate([
        {
          $lookup: {
            from: "messages",
            let: { loginid: "$loginid" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $eq: ["$receiver_id", "$$loginid"] },
                      { $eq: ["$sender_id", "$$loginid"] }
                    ]
                  }
                }
              },
              {
                $sort: { "cdate": -1 }
              },
              {
                $limit: 1 // Assuming you want to get the latest message for each connection
              }
            ],
            as: "users"
          }
        },
        // {
        //   $match: {
        //     "users": { $ne: [] } // Filter out users with no messages
        //   }
        // }
        {
          $match: {
            $or: [
              { "users.receiver_id": loginid },
              { "users.sender_id": loginid }
            ]
          }
        }, {
          $sort: { "users.cdate": -1 }
        },
      ]);
      // console.log("connections", connections,);
      res.status(201).json({ message: "update successfully", connections, loginid1: loginid });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
























  // // io.use((socket, next) => {
  // //   console.log("soketauth");
  // //   authToken(socket.request, {}, next);
  // // });






















  global.onlineUsers = new Map(); // variable to store data of online user
  io.on("connection", async (socket) => {
    global.chatSoket = socket;

    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id)
    }) //! if user login add the logined user data in a global variable onlineUsers

    socket.on("sendmsg", async (data) => {
      touser = data.senderid
      sendToSocket = onlineUsers.get(data.receiver)
      try {
        const cdate = new Date();
        const ctime = cdate.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        data.ctime = ctime;
        const storemsg = new messageModel({
          cdate,
          sender_id: data.senderid,
          receiver_id: data.receiver,
          message: data.message,
          ctime,
        });
        await storemsg.save();

        sendToSocket && socket.to(sendToSocket).emit("receive_msg", data)  //! emit message to particular user

      } catch (error) {
        console.error("Error saving message to the database:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("User disconnected from userController socket");
    });
  });
  return router;
};

