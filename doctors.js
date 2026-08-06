export const specialtyOptions = [
  {
    name: "General physician",
    iconUrl: "/images/specialties/General_physician.svg",
  },
  {
    name: "Gynecologist",
    iconUrl: "/images/specialties/Gynecologist.svg",
  },
  {
    name: "Dermatologist",
    iconUrl: "/images/specialties/Dermatologist.svg",
  },
  {
    name: "Pediatricians",
    iconUrl: "/images/specialties/Pediatricians.svg",
  },
  {
    name: "Neurologist",
    iconUrl: "/images/specialties/Neurologist.svg",
  },
  {
    name: "Gastroenterologist",
    iconUrl: "/images/specialties/Gastroenterologist.svg",
  },
];

export const doctorRecords = [
  {
    id: "doc1",
    name: "Dr. Richard James",
    imageUrl: "/images/doctors/doc1.png",
    specialty: "General physician",
    degree: "MBBS",
    experienceText: "4 Years",
    about:
      "Comprehensive primary care focused on prevention, chronic care, and long-term health planning.",
    consultationFee: 50,
    address: { line1: "17th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc2",
    name: "Dr. Emily Larson",
    imageUrl: "/images/doctors/doc2.png",
    specialty: "Gynecologist",
    degree: "MBBS",
    experienceText: "3 Years",
    about:
      "Women's health specialist with a calm approach to preventive care and follow-up visits.",
    consultationFee: 60,
    address: { line1: "27th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc3",
    name: "Dr. Sarah Patel",
    imageUrl: "/images/doctors/doc3.png",
    specialty: "Dermatologist",
    degree: "MBBS",
    experienceText: "1 Year",
    about:
      "Dermatology care for skin concerns, treatments, and ongoing skin-health guidance.",
    consultationFee: 30,
    address: { line1: "37th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc4",
    name: "Dr. Christopher Lee",
    imageUrl: "/images/doctors/doc4.png",
    specialty: "Pediatricians",
    degree: "MBBS",
    experienceText: "2 Years",
    about:
      "Child-focused care covering wellness visits, growth, and everyday pediatric needs.",
    consultationFee: 40,
    address: { line1: "47th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc5",
    name: "Dr. Jennifer Garcia",
    imageUrl: "/images/doctors/doc5.png",
    specialty: "Neurologist",
    degree: "MBBS",
    experienceText: "4 Years",
    about:
      "Neurology specialist helping patients understand and manage complex brain-health needs.",
    consultationFee: 80,
    address: { line1: "57th Cross", line2: "Richmond" },
    isAvailableToday: false,
  },
  {
    id: "doc6",
    name: "Dr. Andrew Williams",
    imageUrl: "/images/doctors/doc6.png",
    specialty: "Neurologist",
    degree: "MBBS",
    experienceText: "4 Years",
    about:
      "Focused on neurological assessment, treatment planning, and clear patient follow-up.",
    consultationFee: 75,
    address: { line1: "67th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc7",
    name: "Dr. Christopher Davis",
    imageUrl: "/images/doctors/doc7.png",
    specialty: "General physician",
    degree: "MBBS",
    experienceText: "3 Years",
    about:
      "General medicine with an emphasis on prevention, education, and accessible care.",
    consultationFee: 45,
    address: { line1: "77th Cross", line2: "Richmond" },
    isAvailableToday: true,
  },
  {
    id: "doc8",
    name: "Dr. Timothy White",
    imageUrl: "/images/doctors/doc8.png",
    specialty: "Gynecologist",
    degree: "MBBS",
    experienceText: "3 Years",
    about:
      "Women's health and reproductive care with clear communication and reliable follow-up.",
    consultationFee: 65,
    address: { line1: "87th Cross", line2: "Richmond" },
    isAvailableToday: false,
  },
];

export function getDoctorById(doctorId) {
  return doctorRecords.find((doctor) => doctor.id === doctorId) ?? null;
}

export function getRelatedDoctors(doctor, limit = 4) {
  if (!doctor) return [];
  return doctorRecords
    .filter(
      (item) => item.id !== doctor.id && item.specialty === doctor.specialty,
    )
    .concat(
      doctorRecords.filter(
        (item) => item.id !== doctor.id && item.specialty !== doctor.specialty,
      ),
    )
    .slice(0, limit);
}

export function filterDoctorsBySpecialty(specialty) {
  if (!specialty) return doctorRecords;
  return doctorRecords.filter((doctor) => doctor.specialty === specialty);
}
