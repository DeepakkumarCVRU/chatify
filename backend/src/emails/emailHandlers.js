import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    console.log(email, name, clientURL);

    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Messenger!",
        html: createWelcomeEmailTemplate(name, clientURL),
    })

    if (error) {
        console.log("error sending email", error);
        throw new Error("field to send welcome email");
    }

    console.log("email sent successfully", data);
};