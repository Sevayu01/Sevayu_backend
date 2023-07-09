const firebaseAdmin = require('../config/firebase');
const Consultation = require('../models/Consultation');

const scheduleConsultation = async (req, res) => {
  try {
    const {
      patientName,
      fromUser,
      department,
      hospital,
      date,
      time,
    } = req.body;
    const consultation = new Consultation({
      patientName,
      fromUser,
      department,
      hospital,
      date,
      time,
      status: 'pending',
      prescription: '',
      report: '',
      payment: '',
    });
    await consultation.save(); 
    return res.status(200).json({ message: 'Consultation scheduled successfully' });

  } catch (error) {
    console.error('Error scheduling consultation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateConsultationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { consultationId } = req.params;

    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    consultation.status = status;
    await consultation.save();

    const user = await User.findById(consultation.fromUser);
    if (user && user.deviceToken) {
      const message = {
        notification: {
          title: 'Your Consultation Status Update',
          body: `Your consultation has been ${status}.`,
        },
        token: user.deviceToken,
      };

      await firebaseAdmin.messaging().send(message);
    }

    res.status(200).json({ message: 'Consultation status updated successfully' });
  } catch (error) {
    console.error('Error updating consultation status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {updateConsultationStatus,scheduleConsultation}
