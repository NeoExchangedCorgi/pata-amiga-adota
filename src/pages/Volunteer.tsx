
import { VolunteerHeader } from "@/components/volunteer/VolunteerHeader";
import { VolunteerBenefits } from "@/components/volunteer/VolunteerBenefits";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";

const Volunteer = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <VolunteerHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <VolunteerBenefits />
          </div>
          
          <div>
            <VolunteerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
