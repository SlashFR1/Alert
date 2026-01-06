import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertEmail(
    to: string,
    matches: { title: string; url: string; price?: string }[]
) {
    if (!process.env.RESEND_API_KEY) {
        console.log("⚠️ No RESEND_API_KEY. Simalating email to", to);
        console.log("Matches:", matches);
        return;
    }

    const emailContent = matches
        .map(
            (m) =>
                `<div>
          <h3><a href="${m.url}">${m.title}</a></h3>
          <p>${m.price || "N/A"}</p>
        </div>`
        )
        .join("<hr/>");

    await resend.emails.send({
        from: "Alerts <onboarding@resend.dev>", // Update with your domain
        to,
        subject: `🚨 ${matches.length} New Opportunities Found`,
        html: `
      <h2>New matches for your keywords</h2>
      ${emailContent}
      <br/>
      <a href="${process.env.BETTER_AUTH_URL}/dashboard">Manage Alerts</a>
    `,
    });
}
