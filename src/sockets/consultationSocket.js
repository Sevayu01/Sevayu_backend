const Consultation = require("../models/Consultation");
const firebaseAdmin = require("../config/firebase");
const User = require("../models/Users");
const logger = require("../utils/logger");
const hospitalSockets = new Map();
module.exports = (io) => {
  io.on("connection", (socket) => {
    logger.info("Socket connected:", socket.id);
    socket.on("joinHospitalRoom", (hospitalId) => {
      hospitalSockets.set(hospitalId.toString(), socket.id);
    });

    socket.on("scheduleConsultation", async (requestData) => {
      try {
        logger.info("Consultation scheduled:", requestData);
        const consultation = new Consultation({
          patientName: requestData.patientName,
          fromUser: requestData.fromUser,
          department: requestData.department,
          hospital: requestData.hospital,
          date: requestData.date,
          time: requestData.time,
          status: "pending",
          prescription: "",
          report: "",
          payment: "",
        });
        await consultation.save();
        io.emit("newConsultation", consultation);
        const hospitalSocketId = hospitalSockets.get(
          consultation.hospital.toString(),
        );
        if (hospitalSocketId) {
          io.to(hospitalSocketId).emit("consultationRequest", consultation);
          logger.info("Consultation scheduled:", consultation);
        } else {
          logger.info("Consultation scheduled:", consultation);
        }

        logger.info("Consultation scheduled:", consultation);
      } catch (error) {
        logger.error("Error scheduling consultation:", error.message);
      }
    });

    socket.on("updateConsultationStatus", async (data) => {
      try {
        const consultation = await Consultation.findById(data.consultationId);
        if (!consultation) {
          logger.error("Consultation not found");
          return;
        }

        consultation.status = data.status;
        await consultation.save();
        const user = await User.findById(consultation.fromUser);
        if (user && user.deviceToken) {
          const message = {
            notification: {
              title: "Your Consultation Status Update",
              body: `Your consultation has been ${data.status}.`,
            },
            token: user.deviceToken,
          };

          await firebaseAdmin.messaging().send(message);
        }
        logger.info("Consultation status updated:", consultation);

        io.to(consultation.hospital.toString()).emit(
          "consultationStatusUpdate",
          consultation,
        );
        logger.info("Consultation status updated:", consultation);
      } catch (error) {
        logger.error("Error updating consultation status:", error.message);
      }
    });

    socket.on("disconnect", () => {
      logger.info("Socket disconnected:", socket.id);
    });
  });
};
