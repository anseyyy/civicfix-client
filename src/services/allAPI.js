import { commonAPI } from "./commonAPI.js";

// Authentication APIs
export const authAPI = {
  // User registration
  register: async (userData) => {
    const { name, email, password, phone, address } = userData;
    return await commonAPI.post("/register", {
      name,
      email,
      password,
      phone,
      address,
    });
  },

  // User login
  login: async (credentials) => {
    const { email, password } = credentials;
    return await commonAPI.post("/login", {
      email,
      password,
    });
  },

  // Request Worker Role
  requestWorker: async (userId) => {
    return await commonAPI.patch(`/user/${userId}/request-worker`);
  },
};

// Admin APIs
export const adminAPI = {
  getUsers: async () => await commonAPI.get('/allusers'),
  archive: {
    // Future archive endpoints
  },
  updateUserType: async (userId, userType) => {
    return await commonAPI.patch(`/user/${userId}/usertype`, { userType });
  },
};

// Contact APIs
export const contactAPI = {
  sendMessage: async (data) => await commonAPI.post('/contact', data),
  getMessages: async () => await commonAPI.get('/messages')
};

// Issue/Report APIs
export const issueAPI = {
  // Submit a new issue report
  submitReport: async (reportData) => {
    const { title, description, category, location, pincode, images, urgency, userId } =
      reportData;

    // Create FormData for file uploads
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("pincode", pincode || ""); // Add pincode
    formData.append("urgency", urgency);
    formData.append("userId", userId);

    // Append image if it exists (single file as per backend upload.single('image'))
    if (images) {
      // If images is passed as a single file object (which it is from ReportIssue.jsx)
      formData.append("image", images);
    }

    return await commonAPI.upload("/report", formData);
  },

  // Get all reports
  getAllReports: async () => {
    return await commonAPI.get("/allreport");
  },

  // Get reports by user ID
  getUserReports: async (userId) => {
    return await commonAPI.get(`/allreport?userId=${userId}`);
  },

  // Get report by ID
  getReportById: async (reportId) => {
    return await commonAPI.get(`/allreport/${reportId}`);
  },

  // Update report status
  updateReportStatus: async (reportId, status) => {
    return await commonAPI.put(`/allreport/${reportId}`, { status });
  },

  // Delete report
  deleteReport: async (reportId) => {
    return await commonAPI.delete(`/allreport/${reportId}`);
  },
};

// Combined API object for easy import
export const allAPI = {
  auth: authAPI,
  issue: issueAPI,
  admin: adminAPI,
  contact: contactAPI,
};

// Default export for convenience
export default allAPI;
