import * as SendGrid from "@sendgrid/mail"
import { Fire } from './firebase'
import { sc } from './fireConfig'


export const sendEmailOnReply = (perant, reply) => {

  Fire().then(firebase => {
    firebase.auth().listUsers()
  
    const mail = {
      to: perant.email,
      from: 'stageyourvoice@gmail.com',
      subject: `${reply.auther.displayName} replied to your comment`,
      text: `${reply.auther.displayName} replied to your comment ${perant.comment}`,
    }
    emailService(mail)
  })
}

 /**
 * Calling sendgrid SDK to send emails
 */

const emailService = (msg) => {
    SendGrid.setApiKey(sc)
    SendGrid.send(msg)
    .then(() => console.log("email sent"))
    .catch(err=> console.log("there was an error sending email", err))
}