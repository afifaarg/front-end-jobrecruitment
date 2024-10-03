import React, { useState, useEffect } from "react";
import FormField from "./FormField"; // Reusing the same FormField component for consistency
import SectionHeading from "./SectionHeading";

export default function LoginInformations({
  loginDetails,
  onChangeLoginDetails,
  isLoginEmpty,
}) {
  return (
    <div>
      <SectionHeading
        title="Login Information"
        desc="Please provide your login credentials."
      />
      <form className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField
            onChangeYourInfo={onChangeLoginDetails}
            name="username"
            label="Username"
            placeholder="e.g. john_doe"
            value={loginDetails.username}
            isEmpty={isLoginEmpty}
            type="text"
          />

          <FormField
            onChangeYourInfo={onChangeLoginDetails}
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={loginDetails.password}
            isEmpty={isLoginEmpty}
            type="password"
          />
          <FormField
            onChangeYourInfo={onChangeLoginDetails}
            name="confirm_password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={loginDetails.confirm_password}
            isEmpty={isLoginEmpty}
            type="password"
          />
        </div>
      </form>
    </div>
  );
}
