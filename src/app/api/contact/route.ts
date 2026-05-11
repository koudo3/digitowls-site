import { NextResponse } from "next/server";

const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, phone, company, job_title, industry } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!accessToken || accessToken === "your_hubspot_private_app_token_here") {
      console.error("HubSpot access token not configured");
      return NextResponse.json({ error: "Service not configured" }, { status: 500 });
    }

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0];
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const contactProperties: Record<string, string> = {
      email,
      firstname,
      lastname,
      phone: phone || "",
      company: company || "",
      jobtitle: job_title || "",
      industry: industry || "",
      hs_lead_status: "NEW",
    };

    // Create contact in HubSpot
    let contactId: string | null = null;
    const createRes = await fetch(HUBSPOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ properties: contactProperties }),
    });

    if (createRes.ok) {
      const created = await createRes.json();
      contactId = created.id;
    } else if (createRes.status === 409) {
      // Contact already exists — search by email and update
      const searchRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  { propertyName: "email", operator: "EQ", value: email },
                ],
              },
            ],
          }),
        }
      );

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.total > 0) {
          contactId = searchData.results[0].id;
          // Update existing contact
          await fetch(`${HUBSPOT_API_URL}/${contactId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ properties: contactProperties }),
          });
        }
      }
    } else {
      const errorBody = await createRes.text();
      console.error("HubSpot create contact error:", createRes.status, errorBody);
      return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }

    // Create a note with the message, associated to the contact
    if (contactId) {
      const noteBody = `[Site Web - ${subject}]\n\n${message}`;
      await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: noteBody,
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 202,
                },
              ],
            },
          ],
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
