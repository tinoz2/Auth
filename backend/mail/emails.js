import { mailTrapClient, sender } from './mailtrap.js'
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailsTemplate.js'

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })
    } catch (error) {
        console.log(error)
    }
}

export const welcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "fb66e72c-a322-448a-84d8-75f576f54df6",
            template_variables: {
                name: name,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const sendResetPassword = async (email, resetURL) => {

    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset"
        })
    } catch (error) {
        console.log(error)
    }
}

export const successEmail = async (email) => {
    const recipient = [{ email }]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Success password Change",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        })
    } catch (error) {
        console.log(error)
    }
}