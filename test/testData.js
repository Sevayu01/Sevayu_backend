const HospitalData = {
  name: "Josdfhn Doe",
  email: "johndosdddddddfdddsdffe@example.com",
  password: "123yogesh@kU",
  postalcode: "123454",
  contact: "1236547890",
  country: "United States",
  street: "123 Main Street",
  city: "New York",
  state: "NY",

  images: [
    {
      id: "1",
      url: "https://example.com/image1.jpg",
    },
    {
      id: "2",
      url: "https://example.com/image2.jpg",
    },
  ],
};
const Doctors = {
  id: "doc1",
  name: "Doctor 1",
  experience: "5 years",
  speciality: "Specialty 1",
  contact: "Doctor 1 Contact",
  department: "Department 1",
  Intime: "9:00 AM",
  Outtime: "5:00 PM",
  days: ["Monday", "Wednesday", "Friday"],
};
const Test = [
  {
    id: "test1",
    name: "Test 1",
    price: "100",
    description: "Test 1 Description",
  },
  {
    id: "test2",
    name: "Test 2",
    price: "150",
    description: "Test 2 Description",
  },
];
const BloodBank = [
  {
    type: "A+",
    available: true,
    contact: "Blood Bank Contact A+",
  },
  {
    type: "B+",
    available: false,
    contact: "Blood Bank Contact B+",
  },
];
const userData = {
  username: "JohnDoe",
  email: "john.doe@example.com",
  password: "password123",
  confirmPassword: "password123",
  city: "New York",
  street: "123 Main Street",
  state: "NY",
  deviceToken: "someRandomToken",
};
module.exports = { HospitalData, Doctors, Test, BloodBank, userData };
