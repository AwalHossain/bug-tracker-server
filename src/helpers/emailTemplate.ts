import ejs from 'ejs';

export const generateInviteTemplate = (email: string, name: string): string => {
  const template = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ClickUp Invite</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: #ffffff;
              padding: 24px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              width: 100%;
            }
            .invite-header {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 16px;
            }
            .invite-body {
              background-color: #f3f3f3;
              padding: 16px;
              border-radius: 4px;
              margin-bottom: 16px;
            }
            .invite-details {
              display: flex;
              align-items: center;
            }
            .invite-initials {
              background-color: #8b5cf6;
              color: #ffffff;
              font-weight: bold;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 8px;
            }
            .invite-text {
              font-size: 14px;
            }
            .invite-text b {
              font-weight: bold;
            }
            .invite-button {
              background-color: #8b5cf6;
              color: #ffffff;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
            }
            .invite-footer {
              font-size: 12px;
              color: #666666;
              margin-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="invite-header">Join the mai ClickUp team?</div>
            <div class="invite-body">
              <div class="invite-details">
                <div class="invite-initials">${name
                  .charAt(0)
                  .toUpperCase()}</div>
                <div class="invite-text">
                  <b>${name}</b> (${email}) invited you<br />
                  With ClickUp, you can work on anything with anyone: tasks, docs, goals, and chat.
                </div>
              </div>
            </div>
            <button class="invite-button">Accept Invite</button>
            <a href="#" class="invite-footer">or decline</a>
            <div class="invite-footer">
              Questions? 24/7 Support: (888) 625-4258 | help@clickup.com | Get a demo
            </div>
          </div>
        </body>
      </html>
    `;

  return template;
};

// Usage example
const email = 'foortiawal@gmail.com';
const name = 'Awal Hossain';
ejs.render(generateInviteTemplate(email, name));

generateInviteTemplate(email, name);
