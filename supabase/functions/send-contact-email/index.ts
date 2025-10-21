import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Resend API를 사용한 이메일 전송
// 무료 플랜: 월 3,000통, 일 100통
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFICATION_EMAIL = 'carl@flowww.kr'; // Resend 계정 이메일 (테스트용)

interface ContactSubmission {
  id: string;
  company: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  submitted_at: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Webhook payload 파싱
    const payload = await req.json();
    console.log('Webhook received:', payload);

    // INSERT 이벤트만 처리
    if (payload.type !== 'INSERT') {
      return new Response(JSON.stringify({ message: 'Not an INSERT event' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const record: ContactSubmission = payload.record;

    // 이메일 내용 구성
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: bold; color: #555; margin-bottom: 5px; }
          .field-value { background-color: #fff; padding: 10px; border-left: 3px solid #000; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>STONFILM.</h1>
            <p>New Contact Form Submission</p>
          </div>

          <div class="content">
            <h2>Contact Details</h2>

            ${record.company ? `
            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value">${record.company}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${record.full_name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${record.email}">${record.email}</a></div>
            </div>

            ${record.phone ? `
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value">${record.phone}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${record.message.replace(/\n/g, '<br>')}</div>
            </div>

            <div class="footer">
              <p>Submitted at: ${new Date(record.submitted_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
              <p>Submission ID: ${record.id}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Resend API로 이메일 전송
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'STONFILM Contact <onboarding@resend.dev>', // Resend 무료 플랜 발신자
        to: [NOTIFICATION_EMAIL],
        subject: `[STONFILM] New Contact: ${record.full_name}`,
        html: emailHtml,
        reply_to: record.email
      })
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error('Resend API error:', error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const emailData = await emailResponse.json();
    console.log('Email sent successfully:', emailData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notification sent',
        emailId: emailData.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
