import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentList from '../components/AppointmentList';
import AppointmentDetail from '../components/AppointmentDetail';
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments from backend (replace with your API endpoint)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('authToken');
        
        // If token is not available, you may handle redirection or show an error.
        if (!token) {
          console.log('No token found, please log in');
          return;
        }

        // Send the token in the Authorization header for the request
        const response = await axios.get('http://localhost:5000/api/appointment/all', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to Authorization header
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleStatusUpdate = (id, status) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin CMS - Appointments</h1>
      <div className="dashboard-content">
        <AppointmentList
          appointments={appointments}
          onSelect={handleSelectAppointment}
        />
        {selectedAppointment && (
          <AppointmentDetail
            appointment={selectedAppointment}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;