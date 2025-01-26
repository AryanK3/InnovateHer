import requests
from bs4 import BeautifulSoup

# URL of the webpage to scrape
url = "https://boilerlink.purdue.edu/organization/dpr"  # Replace with the actual URL

# Send GET request to the page
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the image source (logo)
    image_tag = soup.find('img', alt=True)
    image_url = image_tag['src'] if image_tag else None

    # Extract about section
    about_section = soup.find('div', class_='bodyText-large')
    about_text = about_section.text.strip() if about_section else None

    # Extract contact details (Address, Email)
    contact_section = soup.find('div', class_='contact-info')  # Adjust based on actual HTML structure
    address = None
    email = None
    if contact_section:
        address_tag = contact_section.find('div', class_='address')
        address = address_tag.text.strip() if address_tag else None

        email_tag = contact_section.find('strong', text='E:')
        email = email_tag.find_next('div').text.strip() if email_tag else None

    # Output the extracted information
    print("Image URL:", image_url)
    print("About:", about_text)
    print("Address:", address)
    print("Email:", email)
else:
    print("Failed to retrieve the page")
