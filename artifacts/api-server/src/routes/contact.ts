import { Router } from "express";
import { Resend } from "resend";

const router = Router();
const STUDIO_EMAIL = "gilda.samani@gmail.com";
const FROM = "Gilda Studio <onboarding@resend.dev>";

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f0c0a;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c0a;">
  <tr><td align="center" style="padding:48px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:linear-gradient(145deg,#1e1612 0%,#1a1512 100%);border:1px solid rgba(183,123,87,0.22);border-radius:16px;overflow:hidden;">

      <!-- Header -->
      <tr><td style="padding:36px 40px 28px;background:linear-gradient(180deg,rgba(42,33,29,0.7) 0%,transparent 100%);border-bottom:1px solid rgba(183,123,87,0.13);">
        <p style="margin:0;font-size:20px;letter-spacing:0.22em;color:#f6f0e8;font-weight:500;font-family:Georgia,serif;">GILDA<span style="color:#b77b57;">.</span></p>
        <p style="margin:5px 0 0;font-size:9px;letter-spacing:0.3em;color:rgba(216,197,174,0.42);text-transform:uppercase;font-family:Arial,sans-serif;">Creative Digital Experience</p>
      </td></tr>

      <!-- Copper accent line -->
      <tr><td style="height:2px;background:linear-gradient(90deg,rgba(183,123,87,0.7) 0%,rgba(183,123,87,0.15) 60%,transparent 100%);"></td></tr>

      <!-- Body -->
      <tr><td style="padding:40px 40px 36px;">
        <p style="margin:0 0 10px;font-size:9px;letter-spacing:0.3em;color:rgba(183,123,87,0.62);text-transform:uppercase;font-family:Arial,sans-serif;">Submission Confirmed</p>
        <h1 style="margin:0 0 22px;font-size:30px;color:rgba(246,240,232,0.95);line-height:1.15;letter-spacing:-0.01em;font-family:Georgia,serif;">Thank you, ${name}.</h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:rgba(216,197,174,0.72);font-family:Arial,sans-serif;">We have received your request and will review it shortly. After reviewing your request, we will contact you by email or phone.</p>
        <p style="margin:0 0 36px;font-size:13px;line-height:1.7;color:rgba(216,197,174,0.48);font-family:Arial,sans-serif;">Every project we take on receives our full attention. Expect something thoughtful.</p>

        <div style="height:1px;background:linear-gradient(90deg,rgba(183,123,87,0.28),transparent);margin-bottom:32px;"></div>

        <p style="margin:0 0 18px;font-size:9px;letter-spacing:0.28em;color:rgba(183,123,87,0.58);text-transform:uppercase;font-family:Arial,sans-serif;">What happens next</p>

        <table cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:14px;vertical-align:top;"><div style="width:5px;height:5px;border-radius:50%;background:#b77b57;margin-top:7px;box-shadow:0 0 8px rgba(183,123,87,0.6);"></div></td>
              <td><p style="margin:0;font-size:13px;color:rgba(216,197,174,0.72);line-height:1.65;font-family:Arial,sans-serif;">Your submission is being reviewed by our studio team</p></td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:14px;vertical-align:top;"><div style="width:5px;height:5px;border-radius:50%;background:rgba(183,123,87,0.55);margin-top:7px;"></div></td>
              <td><p style="margin:0;font-size:13px;color:rgba(216,197,174,0.72);line-height:1.65;font-family:Arial,sans-serif;">We'll reach out by email or phone to discuss your project</p></td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:12px 0;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:14px;vertical-align:top;"><div style="width:5px;height:5px;border-radius:50%;background:rgba(183,123,87,0.3);margin-top:7px;"></div></td>
              <td><p style="margin:0;font-size:13px;color:rgba(216,197,174,0.72);line-height:1.65;font-family:Arial,sans-serif;">We'll craft a proposal tailored to your vision and goals</p></td>
            </tr></table>
          </td></tr>
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:22px 40px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(10,8,6,0.6);">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td><p style="margin:0;font-size:9px;letter-spacing:0.2em;color:rgba(216,197,174,0.28);text-transform:uppercase;font-family:Arial,sans-serif;">Gilda Studio &mdash; Creative Digital Experience</p></td>
          <td align="right"><p style="margin:0;font-size:9px;letter-spacing:0.14em;color:rgba(183,123,87,0.4);text-transform:uppercase;font-family:Arial,sans-serif;">gildastudio.com</p></td>
        </tr></table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

function notificationHtml(data: {
  name: string; email: string; website: string;
  projectType: string; budget: string; message: string;
}): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(183,123,87,0.55);font-family:Arial,sans-serif;width:140px;vertical-align:top;">${label}</td><td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:rgba(216,197,174,0.8);line-height:1.6;font-family:Arial,sans-serif;">${value || "—"}</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f0c0a;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c0a;">
  <tr><td align="center" style="padding:40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#1a1512;border:1px solid rgba(183,123,87,0.22);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px 40px 24px;background:rgba(42,33,29,0.5);border-bottom:1px solid rgba(183,123,87,0.13);">
        <p style="margin:0;font-size:20px;letter-spacing:0.22em;color:#f6f0e8;font-weight:500;font-family:Georgia,serif;">GILDA<span style="color:#b77b57;">.</span></p>
        <p style="margin:5px 0 0;font-size:9px;letter-spacing:0.28em;color:rgba(183,123,87,0.55);text-transform:uppercase;font-family:Arial,sans-serif;">New Project Enquiry</p>
      </td></tr>
      <tr><td style="height:2px;background:linear-gradient(90deg,rgba(183,123,87,0.7),transparent);"></td></tr>
      <tr><td style="padding:36px 40px 32px;">
        <h2 style="margin:0 0 24px;font-size:22px;color:rgba(246,240,232,0.92);font-family:Georgia,serif;">New enquiry from ${data.name}</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row("Name", data.name)}
          ${row("Email", `<a href="mailto:${data.email}" style="color:#b77b57;text-decoration:none;">${data.email}</a>`)}
          ${row("Website", data.website ? `<a href="${data.website}" style="color:#b77b57;text-decoration:none;">${data.website}</a>` : "—")}
          ${row("Project Type", data.projectType)}
          ${row("Budget", data.budget)}
          ${row("Message", data.message.replace(/\n/g, "<br>"))}
        </table>
      </td></tr>
      <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(10,8,6,0.5);">
        <p style="margin:0;font-size:9px;letter-spacing:0.2em;color:rgba(216,197,174,0.28);text-transform:uppercase;font-family:Arial,sans-serif;">Gilda Studio &mdash; Internal Notification</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

router.post("/contact", async (req, res) => {
  const { name, email, website = "", projectType, budget, message } = req.body as {
    name?: string; email?: string; website?: string;
    projectType?: string; budget?: string; message?: string;
  };

  if (!name || !email || !projectType || !budget || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.warn("RESEND_API_KEY not configured");
    res.status(503).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: STUDIO_EMAIL,
        subject: `New enquiry from ${name} — Gilda Studio`,
        html: notificationHtml({ name, email, website, projectType, budget, message }),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: "We've received your request — Gilda Studio",
        html: confirmationHtml(name),
      }),
    ]);

    res.status(200).json({ success: true });
  } catch (err) {
    req.log.error(err, "Failed to send contact emails");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
