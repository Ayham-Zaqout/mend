import { Users, Stethoscope, Grid3x3, TrendingUp } from "lucide-react";

export const stats = [
  {
    label: "Satisfied Patients",
    value: "50k+",
    helper: "Active users",
    icon: Users,
    iconClasses: "bg-[#0D9488]/[0.08] border-[#0D9488]/20 text-[#0D9488]",
    gradientClasses: "from-[#0D9488] to-[#0D9488]/70",
  },
  {
    label: "Verified Doctors",
    value: "1.2k",
    helper: "Trusted network",
    icon: Stethoscope,
    iconClasses: "bg-[#0B1F3F]/[0.08] border-[#0B1F3F]/20 text-[#0B1F3F]",
    gradientClasses: "from-[#0B1F3F] to-[#0B1F3F]/70",
  },
  {
    label: "Specialties",
    value: "45",
    helper: "Multi-discipline",
    icon: Grid3x3,
    iconClasses: "bg-[#d97706]/[0.08] border-[#d97706]/20 text-[#d97706]",
    gradientClasses: "from-[#d97706] to-[#d97706]/70",
  },
  {
    label: "Successful Visits",
    value: "99%",
    helper: "Positive outcomes",
    icon: TrendingUp,
    iconClasses: "bg-[#059669]/[0.08] border-[#059669]/20 text-[#059669]",
    gradientClasses: "from-[#059669] to-[#059669]/70",
  },
];
