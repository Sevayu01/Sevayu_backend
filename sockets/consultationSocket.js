const Consultation = require('../models/Consultation');
const firebaseAdmin = require('../config/firebase');
const User = require('../models/Users');
const Hospital = require('../models/Hospital');
const hospitalSockets = new Map();
module.exports = (io) => {
  io.on('connection', (socket) => {

    console.log('New connection established:', socket.id);

    socket.on('joinHospitalRoom', (hospitalId) => {
      hospitalSockets.set(hospitalId.toString(), socket.id);
      console.log(`Hospital ${hospitalId} joined the room.`);
    });
  
    socket.on('scheduleConsultation', async (requestData) => {
      try {
        console.log(JSON.parse(requestData.body))
        const consultation = new Consultation({
          patientName: requestData.patientName,
          fromUser: requestData.fromUser,
          department: requestData.department,
          hospital: requestData.hospital,
          date: requestData.date,
          time: requestData.time,
          status: 'pending',
          prescription: '',
          report: '',
          payment: '',
        });
        await consultation.save();
        io.emit('newConsultation', consultation);
        const hospitalSocketId = hospitalSockets.get(consultation.hospital.toString());
        if (hospitalSocketId) {
          io.to(hospitalSocketId).emit('consultationRequest', consultation);
          console.log(`Consultation request sent to Hospital ${consultation.hospital}`);
        } else {
          console.log(`Hospital ${consultation.hospital} is not connected.`);
        }
  

        console.log('Consultation scheduled:');
      } catch (error) {
        console.error('Error scheduling consultation:');
      }
    });

    socket.on('updateConsultationStatus', async (data) => {
      try {
        const consultation = await Consultation.findById(data.consultationId);
        if (!consultation) {
          console.error('Consultation not found');
          return;
        }

        consultation.status = data.status;
        await consultation.save();
        const user = await User.findById(consultation.fromUser);
        if (user && user.deviceToken) {
          const message = {
            notification: {
              title: 'Your Consultation Status Update',
              body: `Your consultation has been ${data.status}.`,
            },
            token: user.deviceToken,
          };
    
          await firebaseAdmin.messaging().send(message);
        }
        res.status(200).json({ message: 'Consultation status updated successfully' });

        io.to(consultation.hospital.toString()).emit('consultationStatusUpdate', consultation);
        console.log('Consultation status updated:', consultation);
      } catch (error) {
        console.error('Error updating consultation status:', error);
      }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
        }
    );
  });
};
