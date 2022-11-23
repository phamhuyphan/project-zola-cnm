import {
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
function ForgotPage({ setShow }) {

  const handleSubmit = async () => {
    const data = await axios.post("/api/user/forgot-password/:userId/reset")
    console.log(data)
  }

  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-7">
          Forgot Password
        </h1>
        <form
          onClick={handleSubmit}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
        >
          <Input label="New Password" placeholder="Enter your new password" name="password" type="password" />
          <Input
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
          />
          <Button
            textColor="text-ct-blue-600"
          >
            Reset Password
          </Button>
        </form>

      </div>
    </section>
  );
}

export default ForgotPage;
