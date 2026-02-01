export const generatePartnershipConfirmationEmail = (data: {
  firstName: string;
  lastName: string;
  childFirstName: string;
  childYearGroup: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Partnership Application Confirmation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #048664;
          margin-bottom: 10px;
        }
        .tagline {
          color: #6b7280;
          font-size: 16px;
        }
        .content {
          margin-bottom: 30px;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1f2937;
        }
        .message {
          font-size: 16px;
          margin-bottom: 20px;
          color: #4b5563;
        }
        .details {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
        }
        .detail-value {
          color: #6b7280;
        }
        .next-steps {
          background-color: #f0f9f6;
          border: 1px solid #b8e6d9;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .next-steps h3 {
          color: #048664;
          margin-top: 0;
          margin-bottom: 15px;
        }
        .next-steps ul {
          margin: 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin-bottom: 8px;
          color: #048664;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .contact-info {
          margin-top: 15px;
        }
        .contact-info a {
          color: #048664;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Limit Breakers</div>
          <div class="tagline">Empowering children to reach their full potential</div>
        </div>
        
        <div class="content">
          <div class="greeting">Hello ${data.firstName} ${data.lastName},</div>
          
          <div class="message">
            Thank you for submitting your partnership application with Limit Breakers! We're excited to have you join our community of dedicated parents and learners.
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Application Status:</span>
              <span class="detail-value">Received & Under Review</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Child's Name:</span>
              <span class="detail-value">${data.childFirstName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Year Group:</span>
              <span class="detail-value">${data.childYearGroup}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submission Date:</span>
              <span class="detail-value">${new Date().toLocaleDateString(
                "en-GB"
              )}</span>
            </div>
          </div>
          
          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ul>
              <li>Our team will review your application within 2-3 business days</li>
              <li>You'll receive a follow-up email with next steps</li>
              <li>We may schedule a brief consultation call to discuss your child's needs</li>
              <li>Once approved, you'll receive access to our partnership resources</li>
            </ul>
          </div>
          
          <div class="message">
            We're committed to providing personalised support for your child's educational journey. If you have any questions in the meantime, please don't hesitate to reach out.
          </div>
        </div>
        
        <div class="footer">
          <div>Best regards,</div>
          <div>The Limit Breakers Team</div>
          <div class="contact-info">
            <div>📧 <a href="mailto:info@limitbreakers.co.uk">info@limitbreakers.co.uk</a></div>
            <div>📱 <a href="tel:+447832314114">+44 783 231 4114</a></div>
            <div>🌐 <a href="https://limitbreakers.co.uk">limitbreakers.co.uk</a></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateAssessmentConfirmationEmail = (data: {
  firstName: string;
  lastName: string;
  selectedDate: string;
  children: {
    firstName: string;
    lastName: string;
    hasReceivedTutoringBefore: string;
    tutoringCompanyName?: string;
  }[];
}) => {
  const childDetails = data.children
    .map(
      (child, index) => `
        <div class="child-block">
          <h4>Child ${index + 1}</h4>
          <div class="detail-row">
            <span class="detail-label">First Name:</span>
            <span class="detail-value">${child.firstName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Last Name:</span>
            <span class="detail-value">${child.lastName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Has Received Tutoring Before:</span>
            <span class="detail-value">${child.hasReceivedTutoringBefore}</span>
          </div>
          ${
            child.tutoringCompanyName
              ? `<div class="detail-row">
                  <span class="detail-label">Tutoring Company Name:</span>
                  <span class="detail-value">${child.tutoringCompanyName}</span>
                </div>`
              : ""
          }
        </div>
      `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Assessment Booking Confirmation</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #048664;
          margin-bottom: 10px;
        }
        .tagline {
          color: #6b7280;
          font-size: 16px;
        }
        .content {
          margin-bottom: 30px;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1f2937;
        }
        .message {
          font-size: 16px;
          margin-bottom: 20px;
          color: #4b5563;
        }
        .details {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .child-block {
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
          background-color: #ffffff;
        }
        .child-block h4 {
          margin: 0 0 10px 0;
          color: #048664;
          font-size: 16px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 6px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
        }
        .detail-value {
          color: #6b7280;
        }
        .next-steps {
          background-color: #f0f9f6;
          border: 1px solid #b8e6d9;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .next-steps h3 {
          color: #048664;
          margin-top: 0;
          margin-bottom: 15px;
        }
        .next-steps ul {
          margin: 0;
          padding-left: 20px;
        }
        .next-steps li {
          margin-bottom: 8px;
          color: #048664;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .contact-info {
          margin-top: 15px;
        }
        .contact-info a {
          color: #048664;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Limit Breakers</div>
          <div class="tagline">Empowering children to reach their full potential</div>
        </div>

        <div class="content">
          <div class="greeting">Hello ${data.firstName} ${data.lastName},</div>

          <div class="message">
            Thank you for booking an assessment with <strong>Limit Breakers</strong>! We’re thrilled to have you and your child(ren) take this important step in their learning journey.
          </div>

          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Assessment Date:</span>
              <span class="detail-value">${data.selectedDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Submission Date:</span>
              <span class="detail-value">${new Date().toLocaleDateString(
                "en-GB"
              )}</span>
            </div>
          </div>

          <h3 style="color:#048664;">Child Information</h3>
          ${childDetails}

          <div class="next-steps">
            <h3>Next Steps</h3>
            <ul>
              <li>Our team will confirm your assessment time via email shortly</li>
              <li>Please ensure your child is available on the selected date</li>
              <li>We'll share details on how to prepare for the assessment</li>
              <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
            </ul>
          </div>

          <div class="message">
            We’re excited to meet your child and support them in achieving academic excellence.  
            Thank you for choosing Limit Breakers!
          </div>
        </div>

        <div class="footer">
          <div>Warm regards,</div>
          <div>The Limit Breakers Team</div>
          <div class="contact-info">
            <div>📧 <a href="mailto:info@limitbreakers.co.uk">info@limitbreakers.co.uk</a></div>
            <div>📱 <a href="tel:+447832314114">+44 783 231 4114</a></div>
            <div>🌐 <a href="https://limitbreakers.co.uk">limitbreakers.co.uk</a></div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateAssessmentReminderOct25 = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Initial Assessment Reminder - 25th October</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .message { margin-bottom: 16px; }
          strong, em { font-style: normal; }
          ul { margin: 12px 0; padding-left: 20px; }
          .highlight { color: #048664; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="message">🌟 <strong>Welcome to the Limit Breakers & WCI 11+ Prep Community!</strong> 🌟</div>

          <div class="message">We're thrilled to have you and your child on this exciting journey toward 11+ success!</div>

          <div class="message">Here are the key details for your <strong>Initial Assessment & Parent Induction</strong> this weekend:</div>

          <div class="message">
            📅 <strong>Date:</strong> Saturday, 25th October 2025<br>
            🕚 <strong>Start Time:</strong> 11:00 AM (please arrive by <strong>10:45 AM</strong> for registration)
          </div>

          <div class="message">
            🧒 <strong>Children's Assessment</strong><br>
            📍 <strong>Location:</strong> 10–12 Classroom<br>
            Your child will complete the 11+ Initial Assessment to help us understand their current strengths and guide their learning plan.<br>
            Please bring: ✏️ 2 pencils • 🩶 eraser • sharpener • 📏 ruler • 💧 water bottle
          </div>

          <div class="message">
            👨‍👩‍👧 <strong>Parent Induction Session</strong><br>
            📍 <strong>Location:</strong> Teens Church<br>
            While the children are taking their assessment, parents will attend an important session covering:
          </div>

          <ul>
            <li>The 11+ programme structure and online lesson process</li>
            <li>A short demo video showing how lessons and assessments work</li>
            <li>How we'll track progress and provide feedback</li>
            <li>How you can best support your child's learning at home</li>
            <li>A printed Parent Quick Guide for future reference</li>
          </ul>

          <div class="message">
            🔗 <strong>Join our Parent Community Chat:</strong> 
            <a href="https://chat.whatsapp.com/GB9Bj9a0eEy3DUAxa59E66?mode=wwt" class="highlight">Join WhatsApp Group</a><br>
            Stay connected for reminders, updates, and learning resources.
          </div>

          <div class="message">
            We can't wait to meet you all and begin this incredible journey together — helping every child grow in 
            <em>confidence, skill, and success</em>.
          </div>

          <div class="message"><strong>✨ Let's keep breaking limits—together! ✨</strong></div>
        </div>
      </body>
    </html>
  `;
};

export const generateAssessmentReminderOct26 = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Initial Assessment Reminder - 26th October</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .message { margin-bottom: 16px; }
          strong, em { font-style: normal; }
          ul { margin: 12px 0; padding-left: 20px; }
          .highlight { color: #048664; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="message">🌟 <strong>Welcome to the Limit Breakers & WCI 11+ Prep Community!</strong> 🌟</div>

          <div class="message">We're so excited to have you and your child joining us on the journey to 11+ success!</div>

          <div class="message">Here are the details for your <strong>Initial Assessment & Parent Induction</strong> this Sunday:</div>

          <div class="message">
            📅 <strong>Date:</strong> Sunday, 26th October 2025<br>
            🕑 <strong>Start Time:</strong> 2:00 PM (please arrive by <strong>1:45 PM</strong> for registration)
          </div>

          <div class="message">
            🧒 <strong>Children's Assessment</strong><br>
            📍 <strong>Location:</strong> 10–12 Classroom<br>
            Your child will complete their 11+ Initial Assessment — the first step in shaping their personalised learning journey.<br>
            Please bring: ✏️ 2 pencils • 🩶 eraser • sharpener • 📏 ruler • 💧 water bottle
          </div>

          <div class="message">
            👨‍👩‍👧 <strong>Parent Induction Session</strong><br>
            📍 <strong>Location:</strong> Teens Church<br>
            While the children are taking their assessment, parents will attend an engaging induction session covering:
          </div>

          <ul>
            <li>How the Limit Breakers x WCI 11+ Programme works</li>
            <li>A demo of the online lessons and assessment process</li>
            <li>How we measure and share progress reports</li>
            <li>Parent involvement and home support tips</li>
            <li>A printed Parent Quick Guide to take home</li>
          </ul>

          <div class="message">
            🔗 <strong>Join our Parent Community Chat:</strong> 
            <a href="https://chat.whatsapp.com/GB9Bj9a0eEy3DUAxa59E66?mode=wwt" class="highlight">Join WhatsApp Group</a><br>
            Stay connected for updates, resources, and announcements.
          </div>

          <div class="message">Thank you for being part of this inspiring mission to equip every child for success.</div>

          <div class="message"><strong>✨ Let's keep breaking limits—together! ✨</strong></div>
        </div>
      </body>
    </html>
  `;
};

export const generateTeamNotificationEmail = (data: {
  firstName: string;
  lastName: string;
  email: string;
  childFirstName: string;
  childYearGroup: string;
  typeOfSchool: string;
  hasReceivedTutoringBefore: string;
  hasChildCentAccess: string;
  postcode: string;
  primaryLanguage: string;
}) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Partnership Application - Team Notification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          background-color: #048664;
          color: white;
          padding: 20px;
          border-radius: 8px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .tagline {
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          margin-bottom: 30px;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1f2937;
        }
        .message {
          font-size: 16px;
          margin-bottom: 20px;
          color: #4b5563;
        }
        .details {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 6px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #374151;
        }
        .detail-value {
          color: #6b7280;
        }
        .action-required {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 6px;
          padding: 20px;
          margin: 20px 0;
        }
        .action-required h3 {
          color: #92400e;
          margin-top: 0;
          margin-bottom: 15px;
        }
        .action-required p {
          color: #92400e;
          margin: 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .sheets-link {
          color: #048664;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-bottom 0.2s ease;
        }
        .sheets-link:hover {
          border-bottom: 1px solid #048664;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Limit Breakers</div>
          <div class="tagline">New Partnership Application Received</div>
        </div>
        
        <div class="content">
          <div class="greeting">Hi Team,</div>
          
          <div class="message">
            A new family has applied for partnership with Limit Breakers! Please review their application and follow up within 24-48 hours.
          </div>
          
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">Parent Name:</span>
              <span class="detail-value">${data.firstName} ${
    data.lastName
  }</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${data.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Child's Name:</span>
              <span class="detail-value">${data.childFirstName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Year Group:</span>
              <span class="detail-value">${data.childYearGroup}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">School Type:</span>
              <span class="detail-value">${data.typeOfSchool}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Previous Tutoring:</span>
              <span class="detail-value">${
                data.hasReceivedTutoringBefore
              }</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Device Access:</span>
              <span class="detail-value">${data.hasChildCentAccess}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span>
              <span class="detail-value">${data.postcode}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Primary Language:</span>
              <span class="detail-value">${data.primaryLanguage}</span>
            </div>
          </div>
          
          <div class="action-required">
            <h3>Action Required</h3>
            <p>Please review the complete application details in your <a href="https://docs.google.com/spreadsheets/d/14jcishoRzb-MnrA6Qb_WIfSBpivpLUxpHejuhAxW594/edit?pli=1&gid=0#gid=0" target="_blank" class="sheets-link">Google Sheets</a> and reach out to the family within 24-48 hours to discuss next steps.</p>
          </div>
          
          <div class="message">
            This notification was sent automatically when the partnership application was submitted. All detailed information is available in your <a href="https://docs.google.com/spreadsheets/d/14jcishoRzb-MnrA6Qb_WIfSBpivpLUxpHejuhAxW594/edit?pli=1&gid=0#gid=0" target="_blank" class="sheets-link">Google Sheets</a>.
          </div>
        </div>
        
        <div class="footer">
          <div>Best regards,</div>
          <div>Limit Breakers System</div>
          <div>Generated on ${new Date().toLocaleDateString(
            "en-GB"
          )} at ${new Date().toLocaleTimeString("en-GB")}</div>
        </div>
      </div>
    </body>
    </html>
  `;
};
