## **Code Samurai 2024 Phase 2**

## **EcoSync: Revolutionizing Waste Management in Dhaka North City Corporation**

**Problem Statement:**

In the bustling city of Dhaka, the Dhaka North City Corporation (DNCC) has been grappling with the ever-growing challenges of solid waste management. The stakes are high in a city that is not just the heart of Bangladesh's economic activities but also home to millions of dreams. Amidst this, a visionary team at the DNCC has embarked on a mission to redefine the city's approach to waste management. From the inefficiencies in domestic waste collection to the pioneering initiatives with international partners for waste-to-energy conversions, DNCC has taken multi-pronged initiatives to improve the situation.

**Current Municipal Solid Waste Management Practices:**

* **Domestic Waste Collection:** Domestic wastes are collected from housing societies and transported to one of 54 Secondary Transfer Stations (STS) owned by DNCC.  
* **Waste Transfer:** Waste is then transported from STS to landfills using dump trucks and compactor trucks, with compactor trucks having the capacity to carry 5x more volume due to compression. Aminbazar landfill serves Dhaka North City Corporation (DNCC), while Matuail landfill caters to the Dhaka South City Corporation (DSCC).  
* **STS and Open Bins:** Each ward has one STS. The wards that do not have any STS utilize open bins. DNCC operations begin in the post-STS stage.  
* **Resource Allocation:** DNCC manages oil allocation based on vehicle trips to ensure efficient operation.

With the vision to create a sustainable and efficient waste management ecosystem, the DNCC is now poised to introduce EcoSync. This comprehensive web application will serve as the nerve center for all waste management activities within the jurisdiction of the Dhaka North City Corporation. EcoSync aims to bridge the gaps, streamline processes, and enhance accountability through technological innovation.

**The Challenge:**

Participants are invited to design and develop EcoSync, a web application that functions as an administrative panel for various stakeholders involved in the solid waste management process of DNCC. The application should cater to the specific needs of the System Admin, Landfill Manager, and STS Managers, providing a unified platform to manage the complexities of waste collection, transportation, and processing efficiently.

**Key Features:**

1. **User and role management:** 

   **User Roles:** The system will have 4 major user roles as defined below:

   * **System Admin** \- The system admin user must be created during the application startup (if not already created). This should be part of the database creation step. System Admin will have access to restricted features such as creating new users, creating roles, assigning roles to users, creating facilities, etc. One or more system admin accounts can be created.  
   * **STS Manager** \- The user type will initially be created by a system admin. Upon login, the users should be able to change their passwords. STS Manager will be responsible for operating functionalities that are related to managing the STS facilities. Further augmenting can be done by creating one manager user for each STS facility.  
   * **Landfill Manager** \- Similar to STS Manager role, a system admin will create the landfill manager users. The Landfill manager users will be responsible for operating functionalities that are related to managing a landfill facility. Further augmenting can be done by creating one manager for each landfill.  
   * **Unassigned** \- Default role. When a new user is created by the system admin without specifying a role, that user will have an unassigned user role.

   **Authentication Endpoints**

* /auth/login \- For user login.  
* /auth/logout \- For logging out users and terminating sessions.  
* /auth/reset-password/initiate \- For initiating the password reset process.  
* /auth/reset-password/confirm \- For confirming password reset with a token or code.  
* /auth/change-password \- For allowing users to change their password after logging in.  
  **Authentication Views**  
* **Login View**: Users should be able to see a page for sending credentials, e.g. username, password, captcha, etc. Login should be supported for all user types except for the “unassigned”.  
* **Change Password View**: A page should be presented when the user initiates a change password process. This view should be able to receive old password, new password, and a captcha. The page should also support an expiry time of 5 minutes since the initiation of the change password process.  
* **Logout Control**: Once logged in, users should be able to see a Logout button. A successful logout should kill the user session and take the user back to the public welcome page.  
    
  **User Management Endpoints**  
* /users \- GET method for listing all users (System Admin access).  
* /users/{userId} \- GET method for retrieving a specific user's details.  
* /users \- POST method for creating a new user (System Admin access).  
* /users/{userId} \- PUT method for updating a user's details (restricted to own details or System Admin access).  
* /users/{userId} \- DELETE method for deleting a user (System Admin access).  
* /users/roles \- GET method for listing all available roles.  
* /users/{userId}/roles \- PUT method for updating a user's roles (System Admin access).  
  **User Management Views**  
* **User Create/Update View**: System admin users will be able to use this page to create a new user or update information for an existing user. Admin users can assign or modify already existing roles to the user being created or edited. If no role is specified when creating or updating a user, “unassigned” should be set.  
* **User List View**: System admin users will be able to use this page to list down all existing users, search and sort users based on various fields, etc.  
* **Update and Delete User Controls:** From the list page, the system admin users will be able to initiate a user update or delete process. Deletion process must present the user with a confirmation warning dialog.  
  **Role-Based Access Control (RBAC) Endpoints**  
* /rbac/roles \- For defining and managing roles.  
* /rbac/permissions \- For defining and managing permissions.  
* /rbac/roles/{roleId}/permissions \- For assigning permissions to a role.

	**Role Management Views**

* **Create Roles and Permissions** \- System admin users will be able to create new roles and permission levels. After creating a role, admin users can assign permissions to that role. For simplicity, the roles and permissions can pre-exist in Database from initial application startup. This view is optional.  
  **Profile Management Endpoints**  
* /profile \- GET method for retrieving the logged-in user's profile.  
* /profile \- PUT method for updating the logged-in user's profile.  
  **Profile Management Views**  
* **Profile View** \- Any logged in user will be able to view this page. Users will be able to see various details about the user profile. Users will be able to update some of the fields that are permitted to update to the specific user.  
* **Role View** \- User will be able to see the roles assigned to him/her and the permissions that are granted via the assigned roles. This should be a read-only view.  
    
2. **Data Entry Views:**   
   * System admin can add vehicles (trucks) with these mandatory attributes. You can store additional attributes as you feel necessary.  
     * Vehicle Registration Number  
     * Type: Open Truck, Dump Truck, Compactor, Container Carrier  
     * Capacity: 3 ton, 5 ton, 7 ton, 15 ton    
     * Fuel cost per kilometer \- fully loaded,  
     * Fuel cost per kilometer \- unloaded.  
   * System admin can create STS with ward number, capacity in Tonnes and GPS coordinates.   
   * System admin can assign one or more STS managers for each STS.  
   * System admin can assign one or more trucks to each STS, A truck can only be used by one STS. A single STS can have many trucks.  
   * STS managers can add entry of vehicles leaving the STS with STS ID, vehicle number, weight of waste, time of arrival and time of departure.  
   * System admin can create Landfill sites, with capacity, operational timespan, GPS coordinates, etc.  
   * System admin can assign one or more Landfill Managers for each Landfill site.  
   * Landfill managers can add entry of truck dumping with weight of waste, time of arrival and time of departure.  
       
3. **Billing View:** Landfill Manager can generate a slip at the end of each transport from STS to the landfill. The slip will contain the timestamps, weight of waste, truck details, and a fuel allocation stamp. The program must calculate the fuel allocation based on automated handling of weight bill data for accountability. Consider the following constraints and formulas:  
   * A vehicle goes to the landfill from STS at most three times every day.  
   * If the vehicle takes less volume than capacity, he’ll get a lower fuel bill.   
   * We assume the cost scales linearly between the unloaded and fully loaded states. This is a broad assumption and might not reflect reality perfectly, but it gives a basis for estimation.  
       
     **Calculate the cost per kilometer based on load:** Interpolate the fuel cost per kilometer based on the actual load relative to the truck's capacity.   
     If C\_unloaded is the cost per kilometer unloaded, and C\_loaded is the cost per kilometer fully loaded (at 5 tons), and the truck is loaded with 3 tons, the cost per kilometer for the journey could be approximated as:  
     ![][image1]  
   * **Download Slip:** Additional option to export/download the slip in a PDF format.

4. **Route Optimization View:** The STS manager can view and select optimized routes from his or her STS to the designated Landfill site. Following parameters can be taken into consideration:  
   * Efficient use of resources, such as trucks, based on fuel consumption cost.  
   * Traffic load and congestion during the transfer. The routes and times should be selected that leads to a time with less traffic congestion to ensure quickest waste delivery to landfill.  
   * You can use Google Map or any other map API for this section.

5. **Fleet Optimization View**: The STS manager can generate the fleet of trucks he or she needs to deploy for the day to ensure fastest waste transfer from STS to landfill site. A number of trucks with varying load capacity are attached to each landfill. The system should assist finding the required number of trucks to transfer maximum possible waste from the STS to the Landfill. The following parameters can be taken into consideration:  
   * Each truck can have at most 3 trips.  
   * Trucks should be chosen to first ensure minimum fuel consumption cost, second to ensure minimum number of trucks.  
   * The distance from STS to Landfill should be considered constant as the paths are pre-selected.

6. **Dashboard Statistics View:** Real-time monitoring of waste collection and transportation activities, waste collection statistics at each STS and Landfill site, Daily fuel cost statistics for the trucks, etc.

   In real world, this process can involve automatic input from IOT sensors, and a wide range of manual input. But for this problem, we are following a simpler approach. The data can be manually input by the STS and Landfill managers periodically. Reports are to be generated based on the available data at any given time.

**Deliverables: (100 points)**

| Deliverable | Points |
| :---- | :---- |
| API documentation in an excel file. Columns should be Title, Path, Method, Headers, Request Body, Response Code, Response Body, Response Header, Description | 5 |
| Entity Relationship Diagram | 5 |
| End to End Activity Diagram | 5 |
| Backend Workflow Diagram | 5 |
| UI Prototype \[ Figma / Adobe XD or similar \] | 10 |
| Powerpoint presentation file with screenshots of each screen of the app along with title of the page | 10 |
| A 5 minute video recording of your project with voiceover.  | 20 |
| URL of Github repo with working source code and setup instructions in README. | 40  |

**Github Repo:** 

1. Each team needs to create a private github repo and push all their changes there. Team leaders will be responsible to assign the services to team members and he/she will help team members to do requirements analysis and project planning.  
   2. The github repo name should be of the format: **cs24-p2-\<team\_name\>**  
   3. There needs to be a **docker compose** script which will ensure both backend and frontend servers are accessible. Any additional instruction should be clearly described step by step in a README file. Make sure the steps work for a clean installation.   
   4. All the changes should be pushed to “main” branch and the main branch shouldn’t be modified after April 1, 2024 11:59AM.  
   5. Add a LICENSE file at the root of the repository.  
   6. **Add the following github accounts as collaborators in the private Github Repo for judgment:**  
* fahim-csedu  
* Zobayer1  
* SarwarMiralBJIT  
* Habibalsaki  
* mhktushar

As this round involves subjective judgment, all decisions by the organizer and the judges will be deemed final and scores and rankings won't be released publicly.

[image1]: <data:image/png;base64,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>