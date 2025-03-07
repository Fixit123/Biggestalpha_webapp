export const emailTemplates = {
  booking: (confirmationCode: string) => `
    <h1>Biggest Alpha Repair Booking Confirmation</h1>
    <p>Thank you for booking a repair with Biggest Alpha.</p>
    <p>Your confirmation code is: <strong>${confirmationCode}</strong></p>
  `,

  statusUpdate: (confirmationCode: string, status: string) => `
    <h1>Repair Status Update</h1>
    <p>Your repair (${confirmationCode}) has been updated:</p>
    <p>New Status: <strong>${status}</strong></p>
  `
} 