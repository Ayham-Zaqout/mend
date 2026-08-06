const STORAGE_KEY = "clinivo-appointments";

function readAppointments() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAppointments(appointments) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

function createId() {
  return `appt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const appointmentService = {
  async bookAppointment(payload) {
    const appointments = readAppointments();
    const next = {
      id: createId(),
      ...payload,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    appointments.unshift(next);
    writeAppointments(appointments);
    return next;
  },

  async getAppointments() {
    return readAppointments();
  },

  async getAppointmentsByDoctor(doctorId) {
    return readAppointments().filter((item) => item.doctorId === doctorId);
  },

  async getAppointmentsByPatient(patientId) {
    return readAppointments().filter((item) => item.patientId === patientId);
  },

  async updateAppointmentStatus(id, status) {
    const appointments = readAppointments();
    const next = appointments.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    writeAppointments(next);
    return next.find((item) => item.id === id) ?? null;
  },

  async getTodayQueue(doctorId) {
    const today = new Date().toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return (await this.getAppointmentsByDoctor(doctorId)).filter(
      (item) =>
        item.dateLabel?.includes(String(new Date().getDate())) ||
        item.status === "confirmed"
    );
  },

  async getPendingRequests(doctorId) {
    return (await this.getAppointmentsByDoctor(doctorId)).filter(
      (item) => item.status === "pending"
    );
  },
};
