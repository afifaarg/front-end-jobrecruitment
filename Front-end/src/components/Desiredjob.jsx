import React from "react";
import FormField from "./FormField"; // Reusing the same FormField component for consistency
import SectionHeading from "./SectionHeading";

export default function DesiredJob({
  jobDetails,
  onChangeJobDetails,
  isJobEmpty,
}) {
  return (
    <div>
      <SectionHeading
        title="Desired Job Information"
        desc="Please fill in the details about your desired job."
      />
      <form className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="job_title"
            label="Job Title"
            placeholder="e.g. Software Developer"
            value={jobDetails.job_title} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="text"
          />
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="job_location"
            label="Job Location"
            placeholder="e.g. New York, Remote"
            value={jobDetails.job_location} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="salary_expectation"
            label="Salary Expectation"
            placeholder="e.g. 50000"
            value={jobDetails.salary_expectation} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="number"
          />
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="contract_type"
            label="Contract Type"
            value={jobDetails.contract_type} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="select"
            options={[
              { value: "internship", label: "Internship" },
              { value: "cdd", label: "CDD" },
              { value: "cdi", label: "CDI" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="job_type"
            label="Job Type"
            value={jobDetails.job_type} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="select"
            options={[
              { value: "fulltime", label: "Full-time" },
              { value: "parttime", label: "Part-time" },
            ]}
          />
          <FormField
            onChangeYourInfo={onChangeJobDetails}
            name="work_preference"
            label="Work Preference"
            value={jobDetails.work_preference} // Use jobDetails directly
            isEmpty={isJobEmpty}
            type="select"
            options={[
              { value: "remote", label: "Remote" },
              { value: "on_site", label: "On-site" },
              { value: "hybrid", label: "Hybrid" },
            ]}
          />
        </div>

        <FormField
          onChangeYourInfo={onChangeJobDetails}
          name="description"
          label="Description"
          placeholder="Briefly describe your ideal job role and responsibilities"
          value={jobDetails.description} // Use jobDetails directly
          isEmpty={isJobEmpty}
          type="long"
        />
      </form>
    </div>
  );
}
