const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;

    try {
        const students = await getAllStudents({ name, className, section, roll });
        return res.status(200).send(students);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }
});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        const message = await addNewStudent(req.body);
        return res.status(201).json(message);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = { ...req.body, userId: id };

    try {
        const message = await updateStudent(payload);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const student = await getStudentDetail(id);
        return res.status(200).send(student);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const message = await setStudentStatus({ userId: id, reviewerId: req.user.id, status });
        return res.status(200).json(message);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    try {
        const message = await deleteStudent(id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(error.statusCode || 500).send(error.message);
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
