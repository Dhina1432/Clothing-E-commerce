import nodemailer from "nodemailer";

export const sendOrderEmail = async (order, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Thank you for your order!</h1>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(
              order.orderDate
            ).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3>Items Ordered:</h3>
            ${order.items
              .map(
                (item) => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong> (Size: ${item.size})</p>
                <p>Quantity: ${item.quantity} × $${item.price} = $${(
                  item.quantity * item.price
                ).toFixed(2)}</p>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="background: #333; color: white; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h2 style="margin: 0; text-align: center;">Total: $${order.totalPrice.toFixed(
              2
            )}</h2>
          </div>
          <p style="text-align: center; margin-top: 20px; color: #666;">
            We'll send you a shipping confirmation email when your order ships!
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
