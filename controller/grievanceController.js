const Grievance = require('../model/Grievance');

exports.Grievance = async (req, res) => {
    const { name, email,department,subject, body, attachment, userId } = req.body;

    try {
        const user = new Grievance({ name, email,department, subject, body, attachment,userId });
        await user.save();
        res.status(201).json({ message: "Grievance Filed successful", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateGrievance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, feedback } = req.body;

        const updatedGrievance = await Grievance.findByIdAndUpdate(
            id,
            { $set: { status, feedback } },
            { new: true }
        );

        if (!updatedGrievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        res.status(200).json(updatedGrievance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};