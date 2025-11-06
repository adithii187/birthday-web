import imaplib
import email
import os
from datetime import datetime, timedelta, timezone

# --- Login credentials ---
USERNAME = "adithisamudrala9@gmail.com"
PASSWORD = "klvasabtsalezfva"  # your Google app password

# --- Connect to Gmail ---
mail = imaplib.IMAP4_SSL("imap.gmail.com")
mail.login(USERNAME, PASSWORD)
mail.select("inbox")

# --- Get date string for today (IMAP only supports date-level filtering) ---
today = datetime.now().strftime("%d-%b-%Y")

# --- Search only today's emails ---
status, data = mail.search(None, f'(SENTSINCE {today})')
mail_ids = data[0].split()

save_folder = "home/birthday-web"
os.makedirs(save_folder, exist_ok=True)

print(f"📬 Checking {len(mail_ids)} emails received today...")

# --- Calculate the cutoff time ---
one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)
count = 0

for num in reversed(mail_ids):  # newest first
    status, data = mail.fetch(num, '(RFC822)')
    if status != "OK":
        continue

    raw_email = data[0][1]
    msg = email.message_from_bytes(raw_email)

    # --- Parse the email date ---
    date_tuple = email.utils.parsedate_tz(msg["Date"])
    if date_tuple:
        email_time = datetime.fromtimestamp(email.utils.mktime_tz(date_tuple), timezone.utc)

        # --- Skip if older than 1 hour ---
        if email_time < one_hour_ago:
            continue

    # --- Loop through attachments ---
    for part in msg.walk():
        if part.get_content_maintype() == 'multipart':
            continue
        if part.get('Content-Disposition') is None:
            continue

        filename = part.get_filename()
        if filename and filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(save_folder, filename)
            with open(filepath, 'wb') as f:
                f.write(part.get_payload(decode=True))
            print(f"✅ Saved {filename} from {email_time}")
            count += 1

mail.logout()
print(f"\n🎉 Done! {count} images downloaded from the last hour.")
print("📂 Saved in:", os.path.abspath(save_folder))
