# Sevayu Backend
<img src="https://github.com/Sevayu01/Sevayu_backend/assets/97088265/349dc8a1-4a0b-411c-b21e-489c99560bf6" alt="Sevayu Logo" width="60" height="60" style = "position: absolute;">

## Sevayu
Sevayu Backend is a powerful and innovative platform that aims to solve the problem of hospitals lacking individual websites. Our platform provides a uniform and centralized solution for all hospitals, enabling them to register and showcase their facilities, information, and appointment services in one place – the Sevayu website. Additionally, users can take advantage of the Sevayu Android app to search for nearby hospitals, make inquiries, access hospital details, and book appointments seamlessly.
## Key Features

- **Hospital Registration**: Hospitals can easily register on the Sevayu platform and create their profiles, showcasing all the essential information.

- **Facilities and Services**: Hospitals can list all the facilities, services, and departments they offer, making it convenient for users to find relevant information.

- **Real-time Consultation**: We integrate Firebase and socket.io to enable real-time consultations, enhancing communication between doctors and patients.

- **Search Functionality**: The Sevayu app provides a robust search feature that allows users to find nearby hospitals based on their preferences.

- **Appointment Booking**: Users can book appointments with their desired doctors or departments through the app, ensuring a seamless experience.

- **Blood Bank Information**: Hospitals can update and manage their blood bank information through the platform, facilitating efficient blood donations.

- **Lab Test Details**: Hospitals can showcase the lab tests they offer, helping users understand available medical services better.

## Technologies Used In API

- Node.js
- Express.js
- MongoDB
- socket.io
- Firebase (Real-time Consultation)
- Redis (Caching for Faster Data Retrieval)
- dotenv (Environment Configuration)
- Mocha and Chai (API Unit Testing)

## Getting Started
Link of Deployed api : `www.sevayu.live`

Follow these steps to get the Sevayu Backend up and running on your local machine:

1. Clone the repository: `git clone https://github.com/your-username/sevayu-backend.git`

2. Navigate to the project directory: `cd sevayu-backend`

3. Install dependencies: `npm install`

4. Set up the environment variables by creating a `config.env` file in config folder (refer to `.env.example`).

5. Run the ESLint test to ensure code quality: `npm run lint-check`

6. Execute the API unit tests: `npm test`

7. Start the server: `npm start`

8. Access the API at `http://localhost:5000`.

## API Endpoints
The complete api endpoints and documentation can be found at : `Url of postman`
- **Hospital**: `/api/hospital`
- **Hospital Authentication**: `/api/auth/hospital`
- **Doctor**: `/api/doctor`
- **Blood Bank**: `/api/bloodbank`
- **Lab Test**: `/api/labtest`
- **User Authentication**: `/api/auth/user`
- **Search Hospitals**: `/api/search` (Pass the search text as a query parameter)

## Contributing

We welcome contributions from the community to improve Sevayu Backend. If you find any issues or have suggestions, please feel free to create a pull request or raise an issue in the repository.

## Author of API
Yogesh Saini

