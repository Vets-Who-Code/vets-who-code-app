import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# Dictionary of URLs with their corresponding military service
urls = {
    'Air Force': 'https://mosdb.com/air-force',
    'Army': 'https://mosdb.com/army',
    'Coast Guard': 'https://mosdb.com/coast-guard',
    'Marine Corps': 'https://mosdb.com/marine-corps',
    'Navy': 'https://mosdb.com/navy'
}

def scrape_job_codes_and_descriptions(service, url):
    """Scrape job codes and their descriptions from the given MOSDB URL."""
    try:
        # Send a GET request to the URL
        print(f"Requesting {url} for {service}")
        start_time = time.time()
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP errors
        print(f"Received response for {url} in {time.time() - start_time:.2f} seconds")

        # Parse the content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the table or container holding the job codes
        job_codes = []

        # Assuming job codes are in a table, find all rows
        table = soup.find('table')
        if table:
            rows = table.find_all('tr')  # Find all rows in the table
            for row in rows[1:]:  # Skip the header row
                columns = row.find_all('td')
                if columns and len(columns) > 0:
                    job_code = columns[0].text.strip()
                    job_link = columns[0].find('a')['href'] if columns[0].find('a') else None

                    # If there is a link, get the description
                    if job_link:
                        job_link = 'https://mosdb.com' + job_link  # Full URL
                        print(f"Fetching description for {job_code} at {job_link}")
                        description = get_job_description(job_link)
                    else:
                        description = 'No description available'

                    job_codes.append((job_code, description))
        else:
            print(f"Could not find table in {url}")
        
        return job_codes
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return []

def get_job_description(job_url):
    """Scrape the job description from the job code page."""
    try:
        start_time = time.time()
        response = requests.get(job_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        # Assuming the description is in a <p> tag or some main content
        description_div = soup.find('div', class_='content')
        description = description_div.get_text(strip=True) if description_div else 'No description available'
        print(f"Fetched description from {job_url} in {time.time() - start_time:.2f} seconds")
        return description
    except Exception as e:
        print(f"Error fetching description from {job_url}: {e}")
        return 'No description available'

def save_to_excel(service, job_codes):
    """Save job codes and descriptions to Excel in a directory for each service."""
    # Create a directory for the service if it doesn't exist
    if not os.path.exists(service):
        os.makedirs(service)

    for job_code, description in job_codes:
        # Create a DataFrame for each job code and description
        df = pd.DataFrame({'Job Code': [job_code], 'Description': [description]})

        # Save as Excel file in the service directory
        file_name = os.path.join(service, f"{job_code}.xlsx")
        df.to_excel(file_name, index=False)

# Scrape all URLs and collect the job codes and descriptions by service
for service, url in urls.items():
    print(f"Scraping job codes and descriptions for {service} from {url}")
    job_codes = scrape_job_codes_and_descriptions(service, url)

    # Save the job codes and descriptions to Excel files
    save_to_excel(service, job_codes)

print("Scraping and saving complete.")
