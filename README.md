# Deuterium Panel

Admin panel for Deuterium which simplifies the files management.

# Features

- Information about the current versions, uptime, number of files uploaded, and storage used.
- Search uploaded files by filename / hashsum / IP / date.
- Blacklist or delete files.
- Blacklisted files can not be uploaded, and can be downloaded only using the panel.


# Configuration

Just pull the repo with 
``` 
https://github.com/StingrayFG/deuterium-panel
```
Now, theres two options:
1. Specify NEXT_PUBLIC_BACKEND_URL variable in the Dockerfile and build the image, then run it with
   
   ```docker run -p 3413:3000 --name panel deuterium-panel-image``` 
3. Create a .env file and specify NEXT_PUBLIC_BACKEND_URL variable there, then run it using
   
   ```npm run build```

#

Backend repository can be found here: https://github.com/StingrayFG/deuterium

# Screenshots

### Mobile 
<img src="https://github.com/StingrayFG/deuterium-panel/assets/54187585/eed472ad-e745-4647-9219-15761a8d9f01" width="400" />

### 

<img src="https://github.com/StingrayFG/deuterium-panel/assets/54187585/7f94470d-4b04-4cb2-8b09-444d4c457ef7" width="400" />

### Desktop 
<img src="https://github.com/StingrayFG/deuterium-panel/assets/54187585/21475ac5-f649-48d3-8eeb-b9577c7513b7" />

### 

<img src="https://github.com/StingrayFG/deuterium-panel/assets/54187585/25a27086-56f8-49eb-9434-41f9aa7293e3" />
