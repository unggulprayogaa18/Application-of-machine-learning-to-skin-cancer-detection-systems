
## Cloud services used
1.  **Cloud storage
2.  **Cloud run
3.  **App engine
4.  **Cloud firestore

### Explanation:
1. **Part 1: Deploy Backend on Cloud Run**: Provides steps to create a Dockerfile, build a Docker image, and deploy an application to Cloud Run.
2. **Part 2: Deploy Frontend on App Engine**: Explains how to set up a frontend application and deploy it to App Engine.
3. **Part 3: Store Model in Cloud Storage**: Explains how to upload ML models to Cloud Storage and access them from Cloud Run.
4. **Part 4: Integration**: Connects the frontend, backend, and models to work together.
5. **Part 5: Permissions and Security**: Provides information on setting permissions for access between services.



## Explanation of the Setup:
In this project, I have used Node.js for running the backend, and WSL (Windows Subsystem for Linux) Ubuntu as the tool to configure and interact with the Google Cloud SDK.

Here is a breakdown of the setup process:

1. **Backend with Node.js:**:
   - The backend of the application is built using Node.js, which allows for efficient handling of requests and provides a powerful runtime for the application. I used Express.js (a popular Node.js framework) to structure the backend API endpoints and connect them to 
     the frontend. The backend handles processing the requests, managing the data, and integrating with external services (like Cloud Storage for the ML model).

2. **WSL Ubuntu for Google Cloud SDK:**:
   - For interacting with Google Cloud Platform (GCP), I set up WSL (Windows Subsystem for Linux) with an Ubuntu environment on my Windows machine. WSL allows me to run a Linux distribution directly on Windows, providing a more native development experience for cloud- 
     related tasks.
   - Google Cloud SDK (gcloud) is installed on WSL Ubuntu, which enables me to interact with GCP services like Cloud Run, App Engine, and Cloud Storage directly from the command line. This setup helps streamline the deployment and management of services in the cloud 
     environment.

3. ** Google Cloud Platform (GCP) **:
   -  I use Google Cloud Platform (GCP) and configure Google ADC (Application Default Credentials) for authentication. First, I install the Google Cloud SDK, then authenticate using the command `gcloud auth application-default login`. Finally, I ensure the active GCP 
      project is set correctly with gcloud config set project `<your-gcp-project-name>`. This allows the application to securely access GCP resources..

## Explanation of the Setup:



